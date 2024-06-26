package api

import (
	"encoding/json"
	"log"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/router"
	"strconv"
	"time"
)

func SendMessage(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	message := &models.Message{}

	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	message.SenderID = session.UserID
	message.Created = time.Now()
	messageType := "message_personal"

	if message.SenderID == 0 {
		messageType = "notification"
	} else {
		u, err := Database.User.GetByID(message.SenderID)
		panicIfErr(err)
		message.SenderData = u.Limited()
	}
	if message.IsGroup {
		messageType = "message_group"
	}

	done := make(chan bool)
	go func() {
		defer close(done)
		message, targets := Notify.SendMessage(message, session.UserID, Database)
		event := ChatEvent{
			Type:    messageType,
			Payload: message,
		}
		ChatManager.broadcast(event, targets)
	}()
	<-done
	//
	writeJSON(w, *message)
}

func GetMessages(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	message := models.Message{}

	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	message.SenderID = session.UserID

	messages, err := Database.Message.GetMessages(message)
	panicIfErr(err)

	writeJSON(w, messages)
}

func GetLatestMessages(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	type LatestMessages struct {
		UserMessages  []*models.Message `json:"userMessages"`
		GroupMessages []*models.Message `json:"groupMessages"`
	}

	userMessages, err := Database.Message.GetLatestUserMessages(session.UserID)
	panicIfErr(err)
	groupMessages, err := Database.Message.GetLatestGroupMessages(session.UserID)
	panicIfErr(err)


	writeJSON(w, LatestMessages{UserMessages: userMessages, GroupMessages: groupMessages})
}

func GetMessageContacts(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	contacts, err := Database.Message.GetMessageContacts(session.UserID)
	panicIfErr(err)

	writeJSON(w, contacts)
}

func GetMessageGroups(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	groups, err := Database.Group.GetMyGroups(session.UserID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, groups)
}

func GetNotifications(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	notifications, err := Database.Message.GetNotifications(session.UserID)
	panicIfErr(err)

	writeJSON(w, notifications)
}

func GetAllNotifications(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	notifications, err := Database.Message.GetAllNotifications(session.UserID)
	panicIfErr(err)

	writeJSON(w, notifications)
}

func DeleteNotification(w http.ResponseWriter, r *http.Request) {
	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	err := Database.Message.DeleteNotification(targetID)
	panicIfErr(err)

	writeStatus(w, http.StatusOK)
}
