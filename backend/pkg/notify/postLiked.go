package notify

import (
	"fmt"
	"html"
	"social-network/pkg/models"
)

type PostLiked struct {
	liker *models.User
	post  *models.Post
}

func (n Notifier) PostLiked(liker *models.User, post *models.Post) ([]byte, []int64) {
	return n.notify(PostLiked{
		liker: liker,
		post:  post,
	})
}

func (f PostLiked) Targets() ([]int64, int64) {
	return []int64{f.post.AuthorID}, f.post.AuthorID
}

func (f PostLiked) Sender() int64 {
	return 0 //f.liker.ID
}

func (f PostLiked) SenderData() *models.UserLimited {
	return f.liker.Limited()
}

func (f PostLiked) Message() string {
	msg := MessageContent{
		Type:        "post",
		Action:      "like",
		UserName:    html.EscapeString(userGetName(f.liker)),
		UserID:      f.liker.ID,
		PostID:      f.post.ID,
		PostContent: getContent(f.post),
		Endpoint:    fmt.Sprintf("/profile/%v", f.liker.ID),
	}
	return fmt.Sprintf("%v", msg.JSON())
}

func (f PostLiked) IsGroup() bool {
	return false
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

func getContent(post *models.Post) string {
	if len(post.Content) > 30 {
		return html.EscapeString(post.Content[:27]) + "..."
	}
	return html.EscapeString(post.Content)
}
