package notify

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net/http"
	"os"
	database "social-network/pkg/db"
	"social-network/pkg/models"
	"time"

	"github.com/gorilla/websocket"
)

var frontend_host = getFrontendHost()

type Notification interface {
	Targets() []int64
	Message() string
	Links() []Link
}

type Link struct {
	name   string
	url    string
	method string
}

func (l Link) String() string {
	return fmt.Sprintf(
		//"\n<button type=\"submit\" formmethod=\"%v\" formaction=\"%v\">%v</button>",
		"%v;%v;%v",
		html.EscapeString(l.method),
		html.EscapeString(l.url),
		html.EscapeString(l.name),
	)
}

type Notifier struct {
	channel  <-chan Notification
	upgrader websocket.Upgrader
	database *database.Database
}

func NewNotifier(db *database.Database) *Notifier {
	channel := make(chan Notification, 10)
	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}

	return &Notifier{
		channel:  channel,
		upgrader: upgrader,
		database: db,
	}
}

type MessageContent struct {
	Type        string `json:"type"`
	Action      string `json:"action"`
	UserName    string `json:"userName"`
	UserID      int64  `json:"userID"`
	GroupTitle  string `json:"groupTitle"`
	GroupID     int64  `json:"groupID"`
	EventTitle  string `json:"eventTitle"`
	EventID     int64  `json:"eventID"`
	Endpoint    string `json:"endpoint"`
	PostID      int64  `json:"postID"`
	PostContent string `json:"postContent"`
}

func (m *MessageContent) JSON() string {
	b := new(bytes.Buffer)
	err := json.NewEncoder(b).Encode(*m)
	if err != nil {
		log.Println(err)
	}
	return b.String()
}

func (n Notifier) notify(msg Notification) {
	content := fmt.Sprintf("%v", msg.Message())
	//content += "\n<form style='display: flex; flex-direction: column; gap: 2px; margin-top: 3px'>"
	/*for _, link := range msg.Links() {
		content += "|" + link.String()
	}*/
	//content += "\n</form>"

	message := &models.Message{
		SenderID:   0,
		ReceiverID: 0,
		Content:    content,
		Created:    time.Now(),
	}

	targets := msg.Targets()

	for _, t := range targets {
		message.ReceiverID = t
		_, err := n.database.Message.SendMessage(*message)
		if err != nil {
			log.Printf("could not insert notification message for %v: %v\n", t, err)
		}
	}

	payload := struct {
		Targets []int64         `json:"targets"`
		Message *models.Message `json:"message"`
	}{
		Targets: targets,
		Message: message,
	}

	b := new(bytes.Buffer)
	err := json.NewEncoder(b).Encode(payload)
	if err != nil {
		log.Println(err)
	}

	_, err = http.Post(fmt.Sprintf("http://%v:8888/notify", frontend_host), "", b) //8080
	if err != nil {
		log.Printf("could not notify notification: %v\n", err)
	}
}

func userGetName(u *models.User) string {
	if len(u.Nickname) > 0 {
		return u.Nickname
	}
	return fmt.Sprintf("%v %v", u.FirstName, u.LastName)
}

/*func conditionalString(b bool, s string) string {
	if b {
		return s
	}

	return ""
}*/

func getFrontendHost() string {
	v := os.Getenv("FRONTEND_ADDRESS")
	if v == "" {
		v = "localhost"
	}
	return v
}
