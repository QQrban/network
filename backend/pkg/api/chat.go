package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

var (
	websocketUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     checkOrigin,
	}
	ErrEventNotSupported = errors.New("this event type is not supported")
	ChatManager          *Manager
)

func checkOrigin(r *http.Request) bool {
	//origin := r.Header.Get("Origin")
	//fmt.Println("origin", origin)

	/*switch origin {
	case "http://localhost:3000":
		return true
	default:
		return false
	}*/
	return true
}

type Manager struct {
	clients ClientList
	sync.RWMutex
	handlers map[string]EventHandler
}

func NewManager() *Manager {
	m := &Manager{
		clients:  make(ClientList),
		handlers: make(map[string]EventHandler),
	}
	m.setupEventHandlers()
	return m
}

const (
	EventSendMessage = "send_message"
	EventNewMessage  = "new_message"
)

func (m *Manager) setupEventHandlers() {
	m.handlers[EventSendMessage] = SendMessageHandler
}

func (m *Manager) WSHandler(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	log.Printf("New connection for userID %v\n", session.UserID)
	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := NewClient(conn, m, session.Token, session.UserID)
	m.addClient(client)

	go client.readMessages()
	go client.writeMessages()
}

func (m *Manager) addClient(client *Client) {
	m.Lock()
	defer m.Unlock()
	m.clients[client] = true
}

func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()
	if _, ok := m.clients[client]; ok {
		client.connection.Close()
		delete(m.clients, client)
	}
}

func (m *Manager) broadcast(event ChatEvent, targets []int64) {
	m.RLock()
	defer m.RUnlock()
	for client := range m.clients {
		// If no ids are provided, broadcast to all clients
		if len(targets) == 0 {
			client.egress <- event
			continue
		}
		for _, id := range targets {
			if client.userID == id {
				client.egress <- event
			}
		}
	}
}

func BroadcastToAll(message string, from string) {
	payload, err := json.Marshal(NewMessageEvent{
		SendMessageEvent: SendMessageEvent{
			Message: message,
			From:    from,
		},
		Sent: time.Now(),
	})
	if err != nil {
		log.Printf("failed to marshal broadcast message: %v", err)
		return
	}

	event := ChatEvent{
		Type:    EventNewMessage,
		Payload: payload,
	}

	ChatManager.broadcast(event, nil)
}

func (m *Manager) OnlineUsers() []int64 {
	// Return a list of unique user ids
	m.RLock()
	defer m.RUnlock()
	users := []int64{}
	umap := map[int64]bool{}
	for client := range m.clients {
		id := client.userID
		if _, ok := umap[id]; !ok {
			umap[id] = true
			users = append(users, id)
		}
	}
	return users
}

func (m *Manager) routeEvent(event ChatEvent, c *Client) error {
	if handler, ok := m.handlers[event.Type]; ok {
		if err := handler(event, c); err != nil {
			return err
		}
		return nil
	}
	return ErrEventNotSupported
}

// SendMessageHandler will send out a message to all other participants in the chat
func SendMessageHandler(event ChatEvent, c *Client) error {
	// Marshal Payload into wanted format
	var chatevent SendMessageEvent
	if err := json.Unmarshal(event.Payload, &chatevent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	// Prepare an Outgoing Message to others
	var broadMessage NewMessageEvent

	broadMessage.Sent = time.Now()
	broadMessage.Message = chatevent.Message
	broadMessage.From = chatevent.From

	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	// Place payload into an ChatEvent
	var outgoingEvent ChatEvent
	outgoingEvent.Payload = data
	outgoingEvent.Type = EventNewMessage
	// Broadcast to all other Clients
	for client := range c.manager.clients {
		client.egress <- outgoingEvent
	}

	return nil

}
