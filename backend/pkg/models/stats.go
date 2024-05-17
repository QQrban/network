package models

import (
	"database/sql"
	"fmt"
	"social-network/pkg/queries"
)

type StatsModel struct {
	queries queries.QueryProvider
	db      *sql.DB
}

func MakeStatsModel(db *sql.DB) StatsModel {
	return StatsModel{
		queries: queries.NewQueryProvider(db, "stats"),
		db:      db,
	}
}

func (model StatsModel) GetStats() (interface{}, error) {
	stmt := model.queries.Prepare("all")

	row := stmt.QueryRow()

	var stats struct {
		Users    int `json:"users"`
		Posts    int `json:"posts"`
		Comments int `json:"comments"`
		Groups   int `json:"groups"`
		Events   int `json:"events"`
	}
	err := row.Scan(&stats.Users, &stats.Posts, &stats.Comments, &stats.Groups, &stats.Events)

	if err != nil {
		return nil, err
	}

	return stats, nil
}

func (model StatsModel) GetStatsByUser(userID int64) (interface{}, error) {
	stmt := model.queries.Prepare("user")

	row := stmt.QueryRow(userID)

	var stats struct {
		Posts     int `json:"posts"`
		Comments  int `json:"comments"`
		Commented int `json:"commented"`
		Likes     int `json:"likes"`
		Liked     int `json:"liked"`
		Groups    int `json:"groups"`
		Followers int `json:"followers"`
		Following int `json:"following"`
		Events    int `json:"events"`
	}

	err := row.Scan(&stats.Posts, &stats.Comments, &stats.Commented, &stats.Likes, &stats.Liked, &stats.Groups, &stats.Followers, &stats.Following, &stats.Events)
	if err != nil {
		return nil, err
	}

	return stats, nil
}

func (model StatsModel) GetStatsByGroup(groupID int64) (interface{}, error) {
	stmt := model.queries.Prepare("group")

	row := stmt.QueryRow(groupID)

	var stats struct {
		Members      int `json:"members"`
		Posts        int `json:"posts"`
		Comments     int `json:"comments"`
		Events       int `json:"events"`
		EventMembers int `json:"eventMembers"`
	}
	err := row.Scan(&stats.Members, &stats.Posts, &stats.Comments, &stats.Events, &stats.EventMembers)
	if err != nil {
		return nil, err
	}

	return stats, nil
}

func (model StatsModel) GetStatsByEvent(eventID int64, options []string) (map[string]int, error) {
	stmt := model.queries.Prepare("event")

	rows, err := stmt.Query(eventID)

	if err != nil {
		return nil, err
	}

	stats := map[string]int{}
	for rows.Next() {
		var key int
		var value int
		fmt.Println(key, value)
		err = rows.Scan(&key, &value)
		if err != nil {
			return nil, err
		}
		stats[options[key-1]] = value
	}

	return stats, nil
}
