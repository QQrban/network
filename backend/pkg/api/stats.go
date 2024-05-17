package api

import (
	"net/http"
	"social-network/pkg/router"
	"strconv"
)

func GetStats(w http.ResponseWriter, r *http.Request) {
	stats, err := Database.Stats.GetStats()
	if err != nil {
		panic(err)
	}

	writeJSON(w, stats)
}

func GetUserStats(w http.ResponseWriter, r *http.Request) {
	slug := router.GetSlug(r, 0)

	userID, _ := strconv.ParseInt(slug, 10, 64)
	stats, err := Database.Stats.GetStatsByUser(userID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, stats)
}

func GetGroupStats(w http.ResponseWriter, r *http.Request) {
	slug := router.GetSlug(r, 0)
	groupID, _ := strconv.ParseInt(slug, 10, 64)
	stats, err := Database.Stats.GetStatsByGroup(groupID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, stats)
}

func GetEventStats(w http.ResponseWriter, r *http.Request) {
	slug := router.GetSlug(r, 0)
	eventID, _ := strconv.ParseInt(slug, 10, 64)
	options, _ := Database.Event.GetOptions(eventID)
	stats, err := Database.Stats.GetStatsByEvent(eventID, options)
	if err != nil {
		panic(err)
	}

	writeJSON(w, stats)
}
