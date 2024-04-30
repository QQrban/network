package models

import (
	"database/sql"
	"fmt"
	"social-network/pkg/queries"
	"time"
)

type Message struct {
	ID         int64     `json:"ID"`
	SenderID   int64     `json:"senderID"`
	ReceiverID int64     `json:"receiverID"`
	Content    string    `json:"content"`
	Created    time.Time `json:"created"`

	IsGroup    bool         `json:"isGroup"`
	SenderData *UserLimited `json:"senderData"`
}

func (x *Message) pointerSlice() []interface{} {
	return []interface{}{
		&x.ID,
		&x.SenderID,
		&x.ReceiverID,
		&x.Content,
		&x.Created,
	}
}

type MessageModel struct {
	queries queries.QueryProvider
	db      *sql.DB
}

func MakeMessageModel(db *sql.DB) MessageModel {
	return MessageModel{
		queries: queries.NewQueryProvider(db, "message"),
		db:      db,
	}
}

func (model *MessageModel) SendMessage(message Message) (int64, error) {
	var stmt *sql.Stmt
	if message.IsGroup {
		stmt = model.queries.Prepare("groupSendMessage")
	} else {
		stmt = model.queries.Prepare("userSendMessage")
	}

	res, err := stmt.Exec(
		message.pointerSlice()[:4]...,
	)

	if err != nil {
		return 0, fmt.Errorf("Message/SendMessage: %w", err)
	}

	return res.LastInsertId()
}

func (model *MessageModel) GetMessages(messageOld Message) ([]*Message, error) {
	var stmt *sql.Stmt
	if messageOld.IsGroup {
		stmt = model.queries.Prepare("groupGetMessages")
	} else {
		stmt = model.queries.Prepare("userGetMessages")
	}

	rows, err := stmt.Query(messageOld.SenderID, messageOld.ReceiverID, messageOld.ID)
	if err != nil {
		return nil, fmt.Errorf("Message/GetMessages: %w", err)
	}
	defer rows.Close()

	messages := make([]*Message, 0)

	for rows.Next() {
		message := &Message{}
		pointers := message.pointerSlice()
		if messageOld.IsGroup {
			user := &UserLimited{}
			message.SenderData = user
			pointers = append(pointers, &user.ID, &user.FirstName, &user.LastName, &user.Nickname, &user.Image)
		}
		err = rows.Scan(pointers...)

		if err != nil {
			return nil, fmt.Errorf("Message/GetMessages: %w", err)
		}

		messages = append(messages, message)
	}

	return messages, nil
}