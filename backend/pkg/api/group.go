package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/router"
	"strconv"
	"time"

	"github.com/mattn/go-sqlite3"
)

func GetAllGroups(w http.ResponseWriter, r *http.Request) {
	userID := getPossibleUserID(r)

	groups, err := Database.Group.GetAll(userID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, groups)
}

func GetMyGroups(w http.ResponseWriter, r *http.Request) {
	userID := getPossibleUserID(r)

	groups, err := Database.Group.GetMyGroups(userID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, groups)
}

func GetGroupByID(w http.ResponseWriter, r *http.Request) {
	userID := getPossibleUserID(r)
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	group, err := Database.Group.GetByID(groupID, userID)
	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	writeJSON(w, group)
}

func CreateGroup(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	group := models.Group{}

	err := json.NewDecoder(r.Body).Decode(&group)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	group.OwnerID = session.UserID

	// MAKE ALL GROUPS PUBLIC
	// group.Type = "public" // There are no private groups
	fmt.Println("here0")
	id, err := Database.Group.Insert(group)
	panicUnlessError(err, sqlite3.ErrConstraintUnique)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	group.ID = id
	group.Created = time.Now()

	// Join creator of the group as member
	err = Database.Group.Request(group.ID, group.OwnerID, group.OwnerID)
	if err != nil {
		panic(err)
	}
	err = Database.Group.Join(group.ID, group.OwnerID, "accepted")
	if err != nil {
		panic(err)
	}

	writeJSON(w, group)
}

func JoinGroup(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	// Check if user is already in group
	group, err := Database.Group.GetByID(groupID, session.UserID)
	panicIfErr(err)
	if group.IncludesMe {
		return
	}

	invited, err := Database.Group.JoinCheck(groupID, session.UserID)
	panicIfErr(err)
	if invited {
		err = Database.Group.Join(groupID, session.UserID, "accepted")
		panicIfErr(err)
	} else {
		err = Database.Group.Request(groupID, group.OwnerID, session.UserID)
		panicIfErr(err)

		go func() {
			user, err := Database.User.GetByID(session.UserID)
			if err != nil {
				log.Println(err)
			}
			Notify.Request(group.Group, user)
		}()
	}
}

func LeaveGroup(_ http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	err := Database.Group.Leave(groupID, session.UserID)
	if err != nil {
		panic(err)
	}
}

func GetGroupMembers(w http.ResponseWriter, r *http.Request) {
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	members, err := Database.Group.GetMembers(groupID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, members)
}

func GroupInvite(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	action := router.GetSlug(r, 1)
	inviteeID, _ := strconv.ParseInt(router.GetSlug(r, 2), 10, 64)

	// Check if I have access to the group I'm sending an invite to
	group, err := Database.Group.GetByID(groupID, session.UserID)
	if err != nil {
		panic(err)
	}
	if !group.IncludesMe {
		writeStatusError(w, http.StatusForbidden)
		return
	}

	// Check if who I'm inviting is already in the group
	member, err := Database.Group.IncludesUser(groupID, inviteeID)
	if err != nil {
		panic(err)
	}
	if member {
		return
	}

	// Check if the person has already tried to join this group
	requested, err := Database.Group.RequestCheck(groupID, inviteeID)
	panicIfErr(err)
	fmt.Println("action:", action, "member:", member, "requested:", requested)
	if requested {
		// Invitee has already requested to join the group, so owner accepts or rejects him/her
		fmt.Println("action1", action)
		if group.OwnerID == session.UserID {
			if action == "invite" {
				action = "accepted"
			}
			fmt.Println("action2", action)
			err = Database.Group.Join(groupID, inviteeID, action)
			panicIfErr(err)
		} else {
			writeStatusError(w, http.StatusForbidden)
		}
	} else {
		// Checks passed, do the invite
		err = Database.Group.Invite(groupID, session.UserID, inviteeID)
		panicIfErr(err)

		go Notify.Invite(group.Group, inviteeID)
	}
}

func TransferOwnership(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	myID := session.UserID
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	newOwnerID, _ := strconv.ParseInt(router.GetSlug(r, 1), 10, 64)

	group, err := Database.Group.GetByID(groupID, myID)
	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		writeStatusError(w, http.StatusNotFound)
		return
	}

	if myID != group.OwnerID {
		writeStatusError(w, http.StatusForbidden)
		return
	}

	newInGroup, err := Database.Group.IncludesUser(groupID, newOwnerID)
	if err != nil {
		panic(err)
	}
	if !newInGroup {
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	err = Database.Group.TransferOwnership(groupID, newOwnerID)
	if err != nil {
		panic(err)
	}
}

func GetPendingInvites(w http.ResponseWriter, r *http.Request) {
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)
	members, err := Database.Group.GetPendingInvites(groupID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, members)
}
