package notify

import (
	"log"
	database "social-network/pkg/db"
	"social-network/pkg/models"
)

type SendMessage struct {
	message *models.Message
	me      int64
	db      *database.Database
}

func (n Notifier) SendMessage(
	message *models.Message,
	me int64,
	db *database.Database,
) ([]byte, []int64) {
	return n.notify(SendMessage{
		message: message,
		me:      me,
		db:      n.database,
	})
}

func (sm SendMessage) Targets() ([]int64, int64) {
	if sm.message.IsGroup {
		members, err := sm.db.Group.GetMembers(sm.message.ReceiverID)
		if err != nil {
			log.Println(err)
			return nil, -1
		}
		ids := make([]int64, 0, len(members)-1)
		for _, member := range members {
			if member.ID != sm.me {
				ids = append(ids, member.ID)
			}
		}

		return ids, sm.message.ReceiverID
	}
	return []int64{sm.message.ReceiverID}, sm.message.ReceiverID
}

func (sm SendMessage) Sender() int64 {
	return sm.me
}

func (sm SendMessage) Message() string {
	return sm.message.Content
}

func (sm SendMessage) isGroup() bool {
	return sm.message.IsGroup
}

func (sm SendMessage) Links() []Link {
	return nil
}
