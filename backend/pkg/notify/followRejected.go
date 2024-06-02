package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type FollowRejected struct {
	rejecter *models.User
	target   int64
}

func (n Notifier) FollowRejected(rejecter *models.User, target int64) {
	n.notify(FollowRejected{
		rejecter: rejecter,
		target:   target,
	})
}

func (f FollowRejected) Targets() ([]int64, int64) {
	return []int64{f.target}, f.target
}

func (f FollowRejected) Sender() int64 {
	return 0 //f.rejecter.ID
}

func (f FollowRejected) Message() string {
	return fmt.Sprintf("Your request to follow <strong>%v</strong> got rejected!", html.EscapeString(userGetName(f.rejecter)))
}

func (f FollowRejected) IsGroup() bool {
	return false
}


func (f FollowRejected) Links() []Link {
	return []Link{
		{
			name:   "See their profile",
			url:    fmt.Sprintf("/user/%v", f.rejecter.ID),
			method: "GET",
		},
	}
}
