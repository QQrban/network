package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type PostLiked struct {
	liker  *models.User
	target int64
}

func (n Notifier) PostLiked(liker *models.User, target int64) {
	n.notify(PostLiked{
		liker:  liker,
		target: target,
	})
}

func (f PostLiked) Targets() []int64 {
	return []int64{f.target}
}

func (f PostLiked) Message() string {
	msg := MessageContent{
		Type:     "post",
		Action:   "like",
		UserName: html.EscapeString(userGetName(f.liker)),
		UserID:   f.liker.ID,
		Endpoint: fmt.Sprintf("/user/%v", f.liker.ID),
	}
	//return fmt.Sprintf("You are now following <strong>%v</strong>!", html.EscapeString(userGetName(f.accepter)))
	return fmt.Sprintf("%v", msg.JSON())
}

func (f PostLiked) Links() []Link {
	return []Link{
		{
			name:   "See their profile",
			url:    fmt.Sprintf("/user/%v", f.liker.ID),
			method: "GET",
		},
	}
}
