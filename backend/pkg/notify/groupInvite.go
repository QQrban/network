package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type Invite struct {
	group  *models.Group
	target int64
}

func (n Notifier) Invite(group *models.Group, target int64) {
	n.notify(Invite{
		group:  group,
		target: target,
	})
}

func (n Invite) Targets() ([]int64, int64) {
	return []int64{n.target}, n.target
}

func (n Invite) Sender() int64 {
	return 0 //n.requester
}

func (n Invite) Message() string {
	msg := MessageContent{
		Type:     "group",
		Action:   "invite",
		GroupID:  n.group.ID,
		GroupTitle: html.EscapeString(n.group.Title),
		Endpoint: fmt.Sprintf("/group/%v/join", n.group.ID),
	}
	return fmt.Sprintf(
		//"You have been invited to the group <strong>%v</strong>.",
		//html.EscapeString(n.group.Title),
		"%v", msg.JSON(),
	)
}

func (n Invite) isGroup() bool {
	return false
}

func (n Invite) Links() []Link {
	return []Link{
		{
			name: "Join group",
			url:    fmt.Sprintf("/api/group/%v/join", n.group.ID),//n.requester),
			//url:    fmt.Sprintf("/submit/group/%v/join", n.group.GroupID),
			method: "POST",
		},
	}
}
