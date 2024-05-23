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

/*func (f FollowRequest) Source() int64 {
	return f.requester.ID
}*/

func (f FollowRequest) Targets() []int64 {
	return []int64{f.target}
}

func (f FollowRequest) Message() string {
	return fmt.Sprintf("<strong>%v</strong> has sent you a follow request", html.EscapeString(userGetName(f.requester)))
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
