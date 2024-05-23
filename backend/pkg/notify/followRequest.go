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
	/*fmt.Println("FollowRequest:",
		"requester:", *requester,
		"target:", target,
	)*/
	n.notify(FollowRequest{
		requester: requester,
		target:    target,
	})
}

func (f FollowRequest) Targets() []int64 {
	return []int64{f.target}
}

func (f FollowRequest) Message() string {
	return fmt.Sprintf("{'type':'Follow','action':'request','userName': '%v','userID':%v}", html.EscapeString(userGetName(f.requester)), f.requester.ID)
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
