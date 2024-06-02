package api

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/router"
	"strconv"
)

func GetUserBySession(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	user, err := Database.User.GetByID(session.UserID)
	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	writeJSON(w, user)
}

func GetUserByID(w http.ResponseWriter, r *http.Request) {
	// GET /api/user/([0-9]+)
	myID := getPossibleUserID(r)
	slug := router.GetSlug(r, 0)

	id, _ := strconv.ParseInt(slug, 10, 64)

	user, err := Database.User.GetByIDPlusFollowInfo(id, myID)
	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	if myID != id && (user.Private && !user.FollowInfo.MeToYou) {
		payload := struct {
			*models.UserLimited
			Access bool `json:"access"`
		}{
			UserLimited: user.Limited(),
			Access:      false,
		}

		writeJSON(w, payload)
		return
	}

	payload := struct {
		*models.User
		Access bool `json:"access"`
	}{
		User:   user,
		Access: true,
	}

	writeJSON(w, payload)
}

func GetUserByEmail(w http.ResponseWriter, r *http.Request) {
	// GET /api/user/([^/]+)
	email := router.GetSlug(r, 0)

	user, err := Database.User.GetByEmail(email)

	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		writeStatusError(w, http.StatusNotFound)
		return
	}

	writeJSON(w, user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	user := models.UserIncoming{}

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	err = Database.User.Update(session.UserID, user)
	log.Printf("%T\n", errors.Unwrap(err))
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}
}

func UserFollow(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	target, err := Database.User.GetByID(targetID)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	if target.Private {
		// Sending follow request to private user
		err = Database.User.RequestFollow(session.UserID, target.ID)
		if err != nil {
			panic(err)
		}

		done := make(chan bool)
		go func() {
			defer close(done)
			me, err := Database.User.GetByID(session.UserID)
			if err != nil {
				log.Println(err)
			}

			message, targets := Notify.FollowRequest(me, targetID)
			event := ChatEvent{
				Type:    "notification",
				Payload: message,
			}
			ChatManager.broadcast(event, targets)
		}()
		<-done
	} else {
		// Following a public user*/
		err = Database.User.Follow(session.UserID, target.ID)
		if err != nil {
			panic(err)
		}

		done := make(chan bool)
		go func() {
			defer close(done)
			me, err := Database.User.GetByID(session.UserID)
			if err != nil {
				log.Println(err)
			}
			/*if target.Private {
				message, targets = Notify.FollowRequest(me, targetID)
			} else {*/
			message, targets := Notify.Follow(me, targetID)
			event := ChatEvent{
				Type:    "notification",
				Payload: message,
			}
			ChatManager.broadcast(event, targets)
			//}
		}()
		<-done
	}
}

func UserAcceptFollow(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	err := Database.User.FollowAccept(session.UserID, targetID)
	if err != nil {
		panic(err)
	}

	done := make(chan bool)
	go func() {
		defer close(done)
		me, err := Database.User.GetByID(session.UserID)
		if err != nil {
			log.Println(err)
		}

		message, targets := Notify.FollowAccepted(me, targetID)
		event := ChatEvent{
			Type:    "notification",
			Payload: message,
		}
		ChatManager.broadcast(event, targets)
	}()
	<-done
}

func UserRejectFollow(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	err := Database.User.FollowReject(session.UserID, targetID)
	if err != nil {
		panic(err)
	}

	/*go func() {
		me, err := Database.User.GetByID(session.UserID)
		if err != nil {
			log.Println(err)
		}

		Notify.FollowRejected(me, targetID)
	}()*/
}

func UserUnfollow(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	err := Database.User.Unfollow(session.UserID, targetID)
	if err != nil {
		panic(err)
	}
}

func UserFollowers(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	users, err := Database.User.ListFollowers(session.UserID, targetID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, users)
}

func UserFollowing(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	slug := router.GetSlug(r, 0)
	targetID, _ := strconv.ParseInt(slug, 10, 64)

	users, err := Database.User.ListFollowing(session.UserID, targetID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, users)
}

func GetKnownUsers(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	users, err := Database.User.Known(session.UserID)
	panicIfErr(err)

	writeJSON(w, users)
}

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	users, err := Database.User.All(session.UserID)
	panicIfErr(err)

	writeJSON(w, users)
}

func GetFollowStats(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	stats, err := Database.User.FollowStats(session.UserID)
	panicIfErr(err)

	writeJSON(w, stats)
}

func GetSuggestions(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	suggestions, err := Database.User.Suggestions(session.UserID)
	panicIfErr(err)

	writeJSON(w, suggestions)
}

func UpdateStatus(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	status, err := Database.User.UpdateStatus(session.UserID)
	panicIfErr(err)

	writeJSON(w, status)
}

func UpdateAvatar(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	// Get new avatar from request
	err := r.ParseMultipartForm(32 << 10)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	// Save images
	var token string
	if len(r.MultipartForm.File["avatar"]) > 0 {
		// Enforce the limit on the number of files.
		if len(r.MultipartForm.File["avatar"]) > 1 {
			writeStatusError(w, http.StatusBadRequest)
			return
		}
		token, err = FileUpload(w, r, "avatar")
		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
	}
	err = Database.User.UpdateAvatar(session.UserID, token)
	panicIfErr(err)

	writeJSON(w, token)
}
