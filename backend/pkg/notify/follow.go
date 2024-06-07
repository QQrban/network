package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type Follow struct {
	follower  *models.User
	following int64
}

func (n Notifier) Follow(follower *models.User, following int64) ([]byte, []int64) {
	return n.notify(Follow{
		follower:  follower,
		following: following,
	})
}

func (f Follow) Targets() ([]int64, int64) {
	return []int64{f.following}, f.following
}

func (f Follow) Sender() int64 {
	return 0 //f.follower.ID
}

func (f Follow) SenderData() *models.UserLimited {
	return f.follower.Limited()
}

func (f Follow) Message() string {
	msg := MessageContent{
		Type:     "follow",
		Action:   "follow",
		UserName: html.EscapeString(userGetName(f.follower)),
		UserID:   f.follower.ID,
		Endpoint: fmt.Sprintf("/profile/%v", f.follower.ID),
	}

	//return fmt.Sprintf("<strong>%v</strong> is now your follower!", html.EscapeString(userGetName(f.follower)))
	return fmt.Sprintf("%v", msg.JSON())
}

func (f Follow) IsGroup() bool {
	return false
}

func (f Follow) Links() []Link {
	return []Link{
		{
			name:   "See their profile",
			url:    fmt.Sprintf("/user/%v", f.follower.ID),
			method: "GET",
		},
	}
}
