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

// rtr.Post("/event/create", api.EnsureAuth(api.CreateEvent))
func CreateEvent(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	event := &models.Event{}

	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	event.AuthorID = session.UserID

	group, err := Database.Group.GetByID(event.GroupID, session.UserID)
	panicIfErr(err)
	if !group.IncludesMe {
		log.Printf("CreateEvent: User %v does not have access to group %v\n", session.UserID, event.GroupID)
		writeStatusError(w, http.StatusForbidden)
		return
	}

	if event.Options == "" {
		event.Options = "Going,Not Going"
	}
	id, err := Database.Event.Insert(*event)
	panicIfErr(err)

	event.ID = id
	event.Created = time.Now()

	writeJSON(w, event)

	done := make(chan bool)
	go func() {
		defer close(done)
		creator, err := Database.User.GetByID(session.UserID)
		if err != nil {
			log.Println(err)
		}

		members, err := Database.Group.GetMembers(group.ID)
		if err != nil {
			log.Println(err)
		}

		message, targets := Notify.EventCreated(group.Group, event, creator, members)
		event := ChatEvent{
			Type:    "notification",
			Payload: message,
		}
		ChatManager.broadcast(event, targets)
	}()
	<-done
}

// rtr.Post("/event/([0-9]+)/unset", api.EnsureAuth(api.EventUnset))
func EventUnset(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	eventID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	err := Database.Event.Unset(eventID, session.UserID)
	panicIfErr(err)
}

// rtr.Get("/event/([0-9]+)", api.EventAccessCheck(api.GetEvent))
func GetEvent(w http.ResponseWriter, r *http.Request) {
	myID := getPossibleUserID(r)
	eventID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	members, err := Database.Event.GetByID(eventID, myID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, members)
}

// rtr.Get("/group/([0-9]+)/events", api.GroupAccessCheck(api.GetGroupEvents))
func GetGroupEvents(w http.ResponseWriter, r *http.Request) {
	myID := getPossibleUserID(r)
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	events, err := Database.Event.GetByGroup(groupID, myID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, events)
}

// rtr.Get("/event/([0-9]+)/members", api.EventAccessCheck(api.GetEventMembers))
func GetEventMembers(w http.ResponseWriter, r *http.Request) {
	eventID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	members, err := Database.Event.GetMembers(eventID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, members)
}

// rtr.Get("/events", api.EnsureAuth(api.GetMyEvents))
func GetMyEvents(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	events, err := Database.Event.GetByUser(session.UserID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, events)
}

func RespondEvent(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	eventID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	choice, _ := strconv.ParseInt(router.GetSlug(r, 1), 10, 64)

	access, err := Database.Event.CanJoin(eventID, session.UserID)
	panicIfErr(err)
	if !access {
		log.Printf("RespondEvent: User %v is not part of event %v's group\n", session.UserID, eventID)
		writeStatusError(w, http.StatusForbidden)
		return
	}

	err = Database.Event.Respond(eventID, session.UserID, choice)
	panicIfErr(err)
}
