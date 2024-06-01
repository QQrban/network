package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type EventCreated struct {
	group   *models.Group
	event   *models.Event
	creator *models.User
	members []*models.User
}

func (n Notifier) EventCreated(
	group *models.Group,
	event *models.Event,
	creator *models.User,
	members []*models.User,
) ([]byte, []int64) {
	return n.notify(EventCreated{
		group:   group,
		event:   event,
		creator: creator,
		members: members,
	})
}

func (n EventCreated) Targets() ([]int64, int64) {
	ids := make([]int64, 0, len(n.members)-1)
	for _, member := range n.members {
		if member.ID != n.creator.ID {
			ids = append(ids, member.ID)
		}
	}
	return ids, n.group.ID
}

func (n EventCreated) Sender() int64 {
	return 0 //n.creator.ID
}

func (n EventCreated) Message() string {
	msg := MessageContent{
		Type:     "event",
		Action:   "create",
		EventID:  n.event.ID,
		EventTitle: html.EscapeString(n.event.Title),
		GroupID:  n.group.ID,
		GroupTitle: html.EscapeString(n.group.Title),
		UserName: html.EscapeString(userGetName(n.creator)),
		UserID:   n.creator.ID,
		Endpoint: fmt.Sprintf("/group/%v", n.group.ID),
	}

	return fmt.Sprintf(
		// "Event <strong>%v</strong> has been created in <strong>%v</strong> by %v",
		// html.EscapeString(n.event.Title),
		// html.EscapeString(n.group.Title),
		// html.EscapeString(userGetName(n.creator)),
		"%v", msg.JSON(),
	)
}

func (n EventCreated) isGroup() bool {
	return true
}

func (n EventCreated) Links() []Link {
	return []Link{
		{
			name:   "Show event",
			url:    fmt.Sprintf("/event/%v", n.event.ID),
			method: "GET",
		},
	}
}
