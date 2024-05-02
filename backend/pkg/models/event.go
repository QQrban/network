package models

import (
	"database/sql"
	"fmt"
	"regexp"
	"social-network/pkg/queries"
	"strconv"
	"time"
)

type Event struct {
	ID          int64     `json:"ID"`
	GroupID     int64     `json:"groupID"`
	AuthorID    int64     `json:"authorID"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Time        time.Time `json:"time"`
	Options     string    `json:"options,omitempty"`
	Created     time.Time `json:"created"`
	MyStatus    *string   `json:"myStatus,omitempty"`
}

type EventMembers struct {
	Going    []*UserLimited `json:"going"`
	NotGoing []*UserLimited `json:"notGoing"`
}

type EventMembers2 map[string][]*UserLimited

func (x *Event) pointerSlice() []interface{} {
	return []interface{}{
		&x.ID,
		&x.GroupID,
		&x.AuthorID,
		&x.Title,
		&x.Description,
		&x.Time,
		&x.Options,
		&x.Created,
	}
}

type EventModel struct {
	queries queries.QueryProvider
	db      *sql.DB
}

func MakeEventModel(db *sql.DB) EventModel {
	return EventModel{
		queries: queries.NewQueryProvider(db, "event"),
		db:      db,
	}
}

func (model EventModel) GetByID(eventID, myID int64) (*Event, error) {
	stmt := model.queries.Prepare("getByID")

	row := stmt.QueryRow(eventID, myID)

	event := &Event{}

	err := row.Scan(append(event.pointerSlice(), &event.MyStatus)...)

	if err != nil {
		return nil, fmt.Errorf("Event/GetByID: %w", err)
	}

	myStatus, _ := strconv.Atoi(*event.MyStatus)
	event.MyStatus = getStatus(event.Options, myStatus-1)
	return event, nil
}

// Extract the status from the options string
func getStatus(options string, index int) *string {
	matches := getOptions(options)
	return &matches[index]
}

func getOptions(options string) []string {
	re := regexp.MustCompile(`[\w\s]+`)
	return re.FindAllString(options, -1)
}

func (model EventModel) GetByGroup(groupID, myID int64) ([]*Event, error) {
	stmt := model.queries.Prepare("getByGroup")

	rows, err := stmt.Query(groupID, myID)
	if err != nil {
		return nil, fmt.Errorf("Event/GetByGroup: %w", err)
	}
	defer rows.Close()

	events := make([]*Event, 0)

	for rows.Next() {
		event := &Event{}

		err = rows.Scan(append(event.pointerSlice(), &event.MyStatus)...)
		if err != nil {
			return nil, fmt.Errorf("Event/GetByGroup: %w", err)
		}
		myStatus, _ := strconv.Atoi(*event.MyStatus)
		event.MyStatus = getStatus(event.Options, myStatus-1)
		events = append(events, event)
	}

	return events, nil
}

func (model EventModel) GetByUser(userID int64) ([]*Event, error) {
	stmt := model.queries.Prepare("getByUser")

	rows, err := stmt.Query(userID)
	if err != nil {
		return nil, fmt.Errorf("Event/GetByUser: %w", err)
	}
	defer rows.Close()

	events := make([]*Event, 0)

	for rows.Next() {
		event := &Event{}
		var status string

		err = rows.Scan(append(event.pointerSlice(), &status)...)
		if err != nil {
			return nil, fmt.Errorf("Event/GetByUser: %w", err)
		}
		statusInt, _ := strconv.Atoi(status)
		event.MyStatus = getStatus(event.Options, statusInt-1)

		events = append(events, event)
	}

	return events, nil
}

func (model EventModel) GetMembers(eventID int64) (*EventMembers2, error) {
	stmt := model.queries.Prepare("getMembers")

	rows, err := stmt.Query(eventID)
	if err != nil {
		return nil, fmt.Errorf("Event/GetMembers: %w", err)
	}
	defer rows.Close()

	/*members0 := &EventMembers{
		Going:    make([]*UserLimited, 0),
		NotGoing: make([]*UserLimited, 0),
	}*/
	members := make(EventMembers2)

	for rows.Next() {
		member := &User{}
		var status string
		var options string

		err = rows.Scan(append(member.pointerSlice(), &options, &status)...)
		if err != nil {
			return nil, fmt.Errorf("Event/GetMembers: %w", err)
		}
		statusInt, _ := strconv.Atoi(status)
		statusStr := getStatus(options, statusInt-1)
		members[*statusStr] = append(members[*statusStr], member.Limited())
		/*switch status {
		case "GOING":
			members.Going = append(members.Going, member.Limited())
		case "NOT_GOING":
			members.NotGoing = append(members.NotGoing, member.Limited())
		default:
			log.Panicf("Event/GetMembers: Invalid going status: %v\n", status)
		}*/
	}

	return &members, nil
}

func (model EventModel) Insert(group Event) (int64, error) {
	stmt := model.queries.Prepare("insert")

	res, err := stmt.Exec(
		group.pointerSlice()[:7]...,
	)

	if err != nil {
		return 0, fmt.Errorf("Event/Insert: %w", err)
	}

	return res.LastInsertId()
}

func (model EventModel) Going(eventID, userID int64) error {
	stmt := model.queries.Prepare("going")

	_, err := stmt.Exec(eventID, userID)

	if err != nil {
		return fmt.Errorf("Event/Going: %w", err)
	}

	return nil
}

func (model EventModel) NotGoing(eventID, userID int64) error {
	stmt := model.queries.Prepare("notGoing")

	_, err := stmt.Exec(eventID, userID)

	if err != nil {
		return fmt.Errorf("Event/NotGoing: %w", err)
	}

	return nil
}

func (model EventModel) Unset(eventID, userID int64) error {
	stmt := model.queries.Prepare("unset")

	_, err := stmt.Exec(eventID, userID)

	if err != nil {
		return fmt.Errorf("Event/Unset: %w", err)
	}

	return nil
}

func (model EventModel) HasAccess(eventID, userID int64) (bool, error) {
	stmt := model.queries.Prepare("hasAccess")

	row := stmt.QueryRow(eventID, userID)

	var result bool
	err := row.Scan(&result)

	if err != nil {
		return false, fmt.Errorf("Event/HasAccess: %w", err)
	}

	return result, nil
}

func (model EventModel) CanJoin(eventID, userID int64) (bool, error) {
	stmt := model.queries.Prepare("canJoin")

	row := stmt.QueryRow(eventID, userID)

	var result bool
	err := row.Scan(&result)

	if err != nil {
		return false, fmt.Errorf("Event/CanJoin: %w", err)
	}

	return result, nil
}

func (model EventModel) Respond(eventID, userID, choice int64) error {
	stmt := model.queries.Prepare("respond")

	_, err := stmt.Exec(eventID, userID, choice)

	if err != nil {
		return fmt.Errorf("Event/Respond: %w", err)
	}

	return nil
}
