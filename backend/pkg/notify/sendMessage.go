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
) {
	n.notify(SendMessage{
		message: message,
		me:      me,
		db:      n.database,
	})
}

func (sm SendMessage) Targets() []int64 {
	if sm.message.IsGroup {
		members, err := sm.db.Group.GetMembers(sm.message.ReceiverID)
		if err != nil {
			log.Println(err)
			return nil
		}
		ids := make([]int64, 0, len(members)-1)
		for _, member := range members {
			if member.ID != sm.me {
				ids = append(ids, member.ID)
			}
		}

		return ids
	}
	return []int64{sm.message.ReceiverID}
}

func (sm SendMessage) Message() string {
	return sm.message.Content
}

func (sm SendMessage) Links() []Link {
	return nil
}
