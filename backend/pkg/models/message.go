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
	//fmt.Println("message:", message)
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
			message.IsGroup = true
		}
		user := &UserLimited{}
		message.SenderData = user
		pointers = append(pointers, &user.ID, &user.FirstName, &user.LastName, &user.Nickname, &user.Image)
		err = rows.Scan(pointers...)

		if err != nil {
			return nil, fmt.Errorf("Message/GetMessages: %w", err)
		}

		messages = append(messages, message)
	}

	if len(messages) > 0 {
		latest := len(messages) - 1
		latestID := messages[latest].ID
		userID := messageOld.SenderID
		if messageOld.IsGroup {
			groupID := messages[latest].ReceiverID
			err = model.SetLatestGroupMessage(userID, groupID, latestID)
		} else {
			contactID := messages[latest].SenderID
			if userID == messages[latest].SenderID {
				contactID = messages[latest].ReceiverID
			}
			err = model.SetLatestUserMessage(userID, contactID, latestID)
		}
		if err != nil {
			return nil, fmt.Errorf("Message/GetNotifications3: %w", err)
		}
	}
	return messages, nil
}

func (model *MessageModel) SetLatestUserMessage(userID, contactID, latestID int64) error {
	stmt := model.queries.Prepare("setLatestUserMessage")
	_, err := stmt.Exec(userID, contactID, latestID)
	if err != nil {
		return fmt.Errorf("Message/setLatestUserMessage: %w", err)
	}
	return nil
}

func (model *MessageModel) GetLatestUserMessages(myID int64) ([]*Message, error) {
	stmt := model.queries.Prepare("getLatestUserMessages")

	rows, err := stmt.Query(myID)
	if err != nil {
		return nil, fmt.Errorf("Message/GetLatestUserMessage: %w", err)
	}
	defer rows.Close()

	messages := []*Message{}
	for rows.Next() {
		message := &Message{}
		err = rows.Scan(message.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("Message/GetLatestUserMessage: %w", err)
		}
		messages = append(messages, message)
	}
	return messages, nil
}

func (model *MessageModel) SetLatestGroupMessage(userID, groupID, latestID int64) error {
	stmt := model.queries.Prepare("setLatestGroupMessage")
	_, err := stmt.Exec(userID, groupID, latestID)
	if err != nil {
		return fmt.Errorf("Message/setLatestGroupMessage: %w", err)
	}
	return nil
}

func (model *MessageModel) GetLatestGroupMessages(myID int64) ([]*Message, error) {
	stmt := model.queries.Prepare("getLatestGroupMessages")

	rows, err := stmt.Query(myID)
	if err != nil {
		return nil, fmt.Errorf("Message/GetLatestGroupMessage: %w", err)
	}
	defer rows.Close()

	messages := []*Message{}

	for rows.Next() {
		message := &Message{}
		err = rows.Scan(message.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("Message/GetLatestGroupMessage: %w", err)
		}
		messages = append(messages, message)
	}

	return messages, nil
}

func (model *MessageModel) GetMessageContacts(userID int64) ([]*UserLimited, error) {
	stmt := model.queries.Prepare("getMessageContacts")

	rows, err := stmt.Query(userID)
	if err != nil {
		return nil, fmt.Errorf("Message/GetMessageContacts1: %w", err)
	}
	defer rows.Close()

	contacts := make([]*UserLimited, 0)

	for rows.Next() {
		user := &UserLimited{}
		err = rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Nickname, &user.Image)

		if err != nil {
			return nil, fmt.Errorf("Message/GetMessageContacts2: %w", err)
		}

		contacts = append(contacts, user)
	}

	return contacts, nil
}

//func (model *MessageModel) GetGroupContacts(userID )

func (model *MessageModel) GetNotifications(userID int64) ([]*Message, error) {
	stmt := model.queries.Prepare("getNotifications")

	rows, err := stmt.Query(userID)
	if err != nil {
		return nil, fmt.Errorf("Message/GetNotifications1: %w", err)
	}
	defer rows.Close()

	messages := make([]*Message, 0)

	for rows.Next() {
		message := &Message{}
		err = rows.Scan(message.pointerSlice()...)

		if err != nil {
			return nil, fmt.Errorf("Message/GetNotifications2: %w", err)
		}

		messages = append(messages, message)
	}

	if len(messages) > 0 {
		latestID := messages[0].ID
		userID := messages[0].ReceiverID
		err = model.SetLatestNotification(userID, latestID)
		if err != nil {
			return nil, fmt.Errorf("Message/GetNotifications3: %w", err)
		}
	}

	return messages, nil
}

func (model *MessageModel) SetLatestNotification(userID, latestID int64) error {
	stmt := model.queries.Prepare("setLatestNotification")
	_, err := stmt.Exec(userID, latestID)
	if err != nil {
		return fmt.Errorf("Message/setLatestNotification: %w", err)
	}
	return nil
}

func (model *MessageModel) GetAllNotifications(userID int64) ([]*Message, error) {
	stmt := model.queries.Prepare("getAllNotifications")

	rows, err := stmt.Query(userID)
	if err != nil {
		return nil, fmt.Errorf("Message/GetAllNotifications1: %w", err)
	}
	defer rows.Close()

	messages := make([]*Message, 0)

	for rows.Next() {
		message := &Message{}
		err = rows.Scan(message.pointerSlice()...)

		if err != nil {
			return nil, fmt.Errorf("Message/GetAllNotifications2: %w", err)
		}

		messages = append(messages, message)
	}

	return messages, nil
}

func (model *MessageModel) DeleteNotification(messageID int64) error {
	stmt := model.queries.Prepare("deleteNotification")

	_, err := stmt.Exec(messageID)
	if err != nil {
		return fmt.Errorf("Message/DeleteNotification: %w", err)
	}

	return nil
}
