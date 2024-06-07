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
	Targets() ([]int64, int64)
	Sender() int64
	Message() string
	IsGroup() bool
	SenderData() *models.UserLimited
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

func (n Notifier) notify(msg Notification) ([]byte, []int64) {
	content := fmt.Sprintf("%v", msg.Message())
	message := &models.Message{
		SenderID:   0,
		ReceiverID: 0,
		Content:    content,
		Created:    time.Now(),
		SenderData: msg.SenderData(),
	}

	targets, receiverID := msg.Targets()
	message.SenderID = msg.Sender()
	message.IsGroup = msg.IsGroup()
	message.ReceiverID = receiverID
	links := msg.Links()
	if len(links) > 0 && links[0].name == "Show event" { // Send event notification to group members
		for _, t := range targets {
			message.ReceiverID = t
			id, err := n.database.Message.SendMessage(*message)
			message.ID = id
			if err != nil {
				who := ""
				if message.IsGroup {
					who = "group"
				} else {
					who = "user"
				}
				log.Printf("could not insert %v notification message for %v: %v\n", who, t, err)
			}
		}
	} else {
		id, err := n.database.Message.SendMessage(*message)
		message.ID = id
		if err != nil {
			who := ""
			if message.IsGroup {
				who = "group"
			} else {
				who = "user"
			}
			log.Printf("could not insert %v notification message for %v: %v\n", who, receiverID, err)
		}
	}

	b, err := json.Marshal(message)
	if err != nil {
		log.Println(err)
	}
	return b, targets
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
