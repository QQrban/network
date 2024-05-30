package api

import (
	"encoding/json"
	"log"
	"net/http"
	"social-network/pkg/models"
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

	id, err := Database.Message.SendMessage(*message)
	panicIfErr(err)

	message.ID = id
	message.Created = time.Now()

	if message.IsGroup {
		u, err := Database.User.GetByID(message.SenderID)
		panicIfErr(err)
		message.SenderData = u.Limited()
	}
	//
	done := make(chan bool)
	go func() {
		defer close(done)
		//Notify.SendMessage(message, session.UserID, Database)
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
