package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type Request struct {
	group     *models.Group
	requester *models.User
}

func (n Notifier) Request(group *models.Group, requester *models.User) {
	n.notify(Request{
		group:     group,
		requester: requester,
	})
}

func (n Request) Targets() []int64 {
	return []int64{n.group.OwnerID}
}

func (n Request) Message() string {
	msg := MessageContent{
		Type:     "group",
		Action:   "request",
		GroupID:  n.group.ID,
		GroupTitle: html.EscapeString(n.group.Title),
		UserName: html.EscapeString(userGetName(n.requester)),
		UserID:   n.requester.ID,
		Endpoint: fmt.Sprintf("/profile/%v", n.requester.ID),
	}
	return fmt.Sprintf(
		//"<strong>%v</strong> has requested to join your group <strong>%v</strong>",
		//html.EscapeString(userGetName(n.requester)),
		//html.EscapeString(n.group.Title),
		"%v", msg.JSON(),
	)
}

func (n Request) Links() []Link {
	return []Link{
		{
			name:   "Show profile",
			url:    fmt.Sprintf("/user/%v", n.requester.ID),
			method: "GET",
		},
		{
			name:   "Accept request",
			url:    fmt.Sprintf("/group/%v/accept/%v", n.group.ID, n.requester.ID),
			method: "POST",
		},
		{
			name:   "Reject request",
			url:    fmt.Sprintf("/group/%v/reject/%v", n.group.ID, n.requester.ID),
			method: "POST",
		},
	}
}
