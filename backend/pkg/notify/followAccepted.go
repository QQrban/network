package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type FollowAccepted struct {
	accepter *models.User
	target   int64
}

func (n Notifier) FollowAccepted(accepter *models.User, target int64) ([]byte, []int64) {
	return n.notify(FollowAccepted{
		accepter: accepter,
		target:   target,
	})
}

func (f FollowAccepted) Targets() ([]int64, int64) {
	return []int64{f.target}, f.target
}

func (f FollowAccepted) Sender() int64 {
	return 0 //f.accepter.ID
}

func (f FollowAccepted) SenderData() *models.UserLimited {
	return f.accepter.Limited()
}

func (f FollowAccepted) Message() string {
	msg := MessageContent{
		Type:     "follow",
		Action:   "accept",
		UserName: html.EscapeString(userGetName(f.accepter)),
		UserID:   f.accepter.ID,
		Endpoint: fmt.Sprintf("/profile/%v", f.accepter.ID),
	}
	//return fmt.Sprintf("You are now following <strong>%v</strong>!", html.EscapeString(userGetName(f.accepter)))
	return fmt.Sprintf("%v", msg.JSON())
}

func (f FollowAccepted) IsGroup() bool {
	return false
}

func (f FollowAccepted) Links() []Link {
	return []Link{
		{
			name:   "See their profile",
			url:    fmt.Sprintf("/user/%v", f.accepter.ID),
			method: "GET",
		},
	}
}
