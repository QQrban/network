package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type FollowRequest struct {
	requester *models.User
	target    int64
}

func (n Notifier) FollowRequest(requester *models.User, target int64) {
	n.notify(FollowRequest{
		requester: requester,
		target:    target,
	})
}

func (f FollowRequest) Targets() []int64 {
	return []int64{f.target}
}

func (f FollowRequest) Message() string {
	msg := MessageContent{
		Type:     "follow",
		Action:   "request",
		UserName: html.EscapeString(userGetName(f.requester)),
		UserID:   f.requester.ID,
		Endpoint: fmt.Sprintf("/profile/%v", f.requester.ID),
	}
	return fmt.Sprintf("%v", msg.JSON())
}

func (f FollowRequest) Links() []Link {
	return []Link{
		{
			name:   "See their profile",
			url:    fmt.Sprintf("/user/%v", f.requester.ID),
			method: "GET",
		},
	}
}
