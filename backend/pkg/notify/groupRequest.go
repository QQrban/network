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
	return fmt.Sprintf(
		"%v has requested to join your group <strong>%v</strong>",
		html.EscapeString(userGetName(n.requester)),
		html.EscapeString(n.group.Title),
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
			url:    fmt.Sprintf("/submit/group/%v/accepted/%v", n.group.ID, n.requester.ID),
			method: "POST",
		},
		{
			name:   "Reject request",
			url:    fmt.Sprintf("/submit/group/%v/rejected/%v", n.group.ID, n.requester.ID),
			method: "POST",
		},
	}
}
