package database

import (
	"social-network/pkg/models"
	"social-network/pkg/db/sqlite"
)

type Database struct {
	User    models.UserModel
	Session models.SessionModel
	Post    models.PostModel
	File    models.FileModel
	/*Comment models.CommentModel
	Group   models.GroupModel
	Event   models.EventModel*/
	Message models.MessageModel
}

func NewDatabase(path string) *Database {
	db := sqlite.OpenDB(path)

	database := &Database{
		User:    models.MakeUserModel(db),
		Session: models.MakeSessionModel(db),
		Post:    models.MakePostModel(db),
		File:    models.MakeFileModel(db),
		/*Comment: models.MakeCommentModel(db),
		Group:   models.MakeGroupModel(db),
		Event:   models.MakeEventModel(db),*/
		Message: models.MakeMessageModel(db),
	}

	return database
}
