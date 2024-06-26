package models

import (
	"database/sql"
	"fmt"
	"social-network/pkg/queries"
	"time"
)

type Group struct {
	ID          int64     `json:"ID"`
	OwnerID     int64     `json:"ownerID"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Created     time.Time `json:"created"`
}

//Image       *string `json:"image"`
//Type  string  `json:"type"`

type GroupPlus struct {
	*Group
	IncludesMe     bool `json:"includesMe"`
	PendingRequest bool `json:"pendingRequest"`
	//OwnerName      string        `json:"ownerName"`
	Owner      *UserLimited  `json:"owner"`
	TopMembers []UserLimited `json:"topMembers"`
}

func (x *Group) pointerSlice() []interface{} {
	return []interface{}{
		&x.ID,
		&x.OwnerID,
		&x.Title,
		&x.Description,
		&x.Created,
	}
}

//&x.Image,
//&x.Type,

type GroupModel struct {
	queries queries.QueryProvider
	db      *sql.DB
}

func MakeGroupModel(db *sql.DB) GroupModel {
	return GroupModel{
		queries: queries.NewQueryProvider(db, "group"),
		db:      db,
	}
}

func (model GroupModel) GetByID(groupID, myID int64) (*GroupPlus, error) {
	stmt := model.queries.Prepare("getByID")

	row := stmt.QueryRow(groupID, myID)

	group := &Group{}
	groupPlus := &GroupPlus{Group: group}

	err := row.Scan(append(group.pointerSlice(), &groupPlus.IncludesMe, &groupPlus.PendingRequest)...)

	if err != nil {
		return nil, fmt.Errorf("Group/GetByID1: %w", err)
	}

	owner := MakeUserModel(model.db)
	ownerSlice, err := owner.GetByID(group.OwnerID)
	if err != nil {
		return nil, fmt.Errorf("Group/GetByID2: %w", err)
	}
	//groupPlus.OwnerName = ownerSlice.FirstName + " " + ownerSlice.LastName
	groupPlus.Owner = ownerSlice.Limited()

	topMembers, err1 := model.GetTopMembers(groupID)
	if err1 != nil {
		return nil, fmt.Errorf("Group/GetByID0: %w", err1)
	}
	groupPlus.TopMembers = topMembers

	return groupPlus, nil
}

func (model GroupModel) GetTopMembers(groupID int64) ([]UserLimited, error) {
	stmt := model.queries.Prepare("getTopMembers")

	rows, err := stmt.Query(groupID)
	if err != nil {
		return nil, fmt.Errorf("Group/GetTopMembers1: %w", err)
	}
	defer rows.Close()

	users := make([]UserLimited, 0)

	for rows.Next() {
		user := User{}

		err = rows.Scan(user.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("Group/GetTopMembers2: %w", err)
		}

		users = append(users, *user.Limited())
	}

	return users, nil
}

func (model GroupModel) GetAll(myID int64) ([]*GroupPlus, error) {
	stmt := model.queries.Prepare("getAll")

	rows, err := stmt.Query(myID)
	if err != nil {
		return nil, fmt.Errorf("Group/GetAll1: %w", err)
	}
	defer rows.Close()

	groups := make([]*GroupPlus, 0)

	for rows.Next() {
		group := &Group{}
		groupPlus := &GroupPlus{Group: group}

		err = rows.Scan(append(group.pointerSlice(), &groupPlus.IncludesMe, &groupPlus.PendingRequest)...)
		//err = rows.Scan(group.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("Group/GetAll2: %w", err)
		}

		owner := MakeUserModel(model.db)
		ownerSlice, err := owner.GetByID(group.OwnerID)
		if err != nil {
			return nil, fmt.Errorf("Group/GetAll3: %w", err)
		}
		groupPlus.Owner = ownerSlice.Limited()

		groups = append(groups, groupPlus)
	}

	return groups, nil
}

func (model GroupModel) GetMyGroups(myID int64) ([]*GroupPlus, error) {
	stmt := model.queries.Prepare("getMyGroups")

	rows, err := stmt.Query(myID)
	if err != nil {
		return nil, fmt.Errorf("Group/GetMyGroups1: %w", err)
	}
	defer rows.Close()

	groups := make([]*GroupPlus, 0)

	for rows.Next() {
		group := &Group{}
		groupPlus := &GroupPlus{Group: group}

		err = rows.Scan(append(group.pointerSlice(), &groupPlus.IncludesMe, &groupPlus.PendingRequest)...)
		//err = rows.Scan(group.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("Group/GetMyGroups2: %w", err)
		}

		owner := MakeUserModel(model.db)
		ownerSlice, err := owner.GetByID(group.OwnerID)
		if err != nil {
			return nil, fmt.Errorf("Group/GetMyGroups3: %w", err)
		}
		groupPlus.Owner = ownerSlice.Limited()

		groups = append(groups, groupPlus)
	}

	return groups, nil
}

func (model GroupModel) Insert(group Group) (int64, error) {
	stmt := model.queries.Prepare("insert")

	res, err := stmt.Exec(
		group.pointerSlice()[:4]...,
	)

	if err != nil {
		return 0, err //fmt.Errorf("Group/Insert: %w", err)
	}

	return res.LastInsertId()
}

func (model GroupModel) Join(groupID, userID int64, action string) error {
	stmt := model.queries.Prepare("join")

	_, err := stmt.Exec(groupID, userID, action)

	if err != nil {
		return fmt.Errorf("Group/Join: %w", err)
	}

	return nil
}

func (model GroupModel) JoinCheck(groupID, userID int64) (bool, error) {
	stmt := model.queries.Prepare("joinCheck")

	row := stmt.QueryRow(groupID, userID)

	var result bool
	err := row.Scan(&result)

	if err != nil {
		return false, fmt.Errorf("Group/JoinCheck: %w", err)
	}

	return result, nil
}

func (model GroupModel) Request(groupID, ownerID, userID int64) error {
	stmt := model.queries.Prepare("request")

	_, err := stmt.Exec(groupID, ownerID, userID)

	if err != nil {
		return fmt.Errorf("Group/Request: %w", err)
	}

	return nil
}

func (model GroupModel) Leave(groupID, userID int64) error {
	stmt := model.queries.Prepare("leave")

	_, err := stmt.Exec(groupID, userID)

	if err != nil {
		return fmt.Errorf("Group/Leave: %w", err)
	}

	return nil
}

func (model GroupModel) HasAccess(groupID, userID int64) (bool, error) {
	stmt := model.queries.Prepare("hasAccess")

	row := stmt.QueryRow(groupID, userID)

	var result bool
	err := row.Scan(&result)

	if err != nil {
		return false, fmt.Errorf("Group/HasAccess: %w", err)
	}

	return result, nil
}

func (model GroupModel) GetMembers(groupID int64) ([]*User, error) {
	stmt := model.queries.Prepare("getMembers")

	rows, err := stmt.Query(groupID)
	if err != nil {
		return nil, fmt.Errorf("Group/GetMembers: %w", err)
	}
	defer rows.Close()

	users := make([]*User, 0)

	for rows.Next() {
		user := &User{}

		err = rows.Scan(user.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("Group/GetMembers: %w", err)
		}

		users = append(users, user)
	}

	return users, nil
}

func (model GroupModel) Invite(groupID, myID, userID int64) error {
	stmt := model.queries.Prepare("invite")

	_, err := stmt.Exec(groupID, myID, userID)

	if err != nil {
		return fmt.Errorf("Group/Invite: %w", err)
	}

	return nil
}

func (model GroupModel) RequestCheck(groupID, userID int64) (bool, error) {
	stmt := model.queries.Prepare("requestCheck")

	row := stmt.QueryRow(groupID, userID)

	var result bool
	err := row.Scan(&result)

	if err != nil {
		return false, fmt.Errorf("Group/RequestCheck: %w", err)
	}

	return result, nil
}

func (model GroupModel) IncludesUser(groupID, userID int64) (bool, error) {
	stmt := model.queries.Prepare("includesUser")

	row := stmt.QueryRow(groupID, userID)

	var includes bool
	err := row.Scan(&includes)
	if err != nil {
		return false, fmt.Errorf("Group/IncludesUser: %w", err)
	}

	return includes, nil
}

func (model GroupModel) TransferOwnership(groupID, userID int64) error {
	stmt := model.queries.Prepare("transferOwnership")

	_, err := stmt.Exec(groupID, userID)

	if err != nil {
		return fmt.Errorf("Group/TransferOwnership: %w", err)
	}

	return nil
}

func (model GroupModel) GetPendingInvites(groupID int64) ([]int64, error) {
	stmt := model.queries.Prepare("getPendingInvites")

	rows, err := stmt.Query(groupID)
	if err != nil {
		return nil, fmt.Errorf("Group/GetPendingInvites: %w", err)
	}
	defer rows.Close()

	users := make([]int64, 0)

	for rows.Next() {
		var id int64
		err = rows.Scan(&id)
		if err != nil {
			return nil, fmt.Errorf("Group/GetPendingInvites: %w", err)
		}

		users = append(users, id)
	}

	return users, nil
}
