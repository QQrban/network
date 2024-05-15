package models

import (
	"database/sql"
	"fmt"
	"social-network/pkg/queries"
	"time"
)

type User struct {
	ID        int64     `json:"ID"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Nickname  string    `json:"nickname"`
	Created   time.Time `json:"created"`
	Image     *string   `json:"image"`
	About     string    `json:"about"`
	Birthday  time.Time `json:"birthday"`
	Private   bool      `json:"private"`
	Country   string    `json:"country"`

	FollowInfo *FollowInfo `json:"followInfo"`
}

type UserIncoming struct {
	Email     *string    `json:"email"`
	Password  *string    `json:"password"`
	FirstName *string    `json:"firstName"`
	LastName  *string    `json:"lastName"`
	Nickname  *string    `json:"nickname"`
	Image     *string    `json:"image"`
	About     *string    `json:"about"`
	Birthday  *time.Time `json:"birthday"`
	Private   bool       `json:"private"`
	Country   *string    `json:"country"`
}

type UserLimited struct {
	ID         int64       `json:"ID"`
	FirstName  string      `json:"firstName"`
	LastName   string      `json:"lastName"`
	Nickname   string      `json:"nickname"`
	Image      *string     `json:"image"`
	FollowInfo *FollowInfo `json:"followInfo"` //,omitempty"`
}

type FollowInfo struct {
	MeToYou        bool `json:"meToYou"`
	MeToYouPending bool `json:"meToYouPending"`
	YouToMePending bool `json:"youToMePending"`
}

func (x *User) pointerSlice() []interface{} {
	return []interface{}{
		&x.ID,
		&x.Email,
		&x.Password,
		&x.FirstName,
		&x.LastName,
		&x.Nickname,
		&x.About,
		&x.Image,
		&x.Birthday,
		&x.Private,
		&x.Country,
		&x.Created,
	}
}

func (x *User) Limited() *UserLimited {
	return &UserLimited{
		ID:         x.ID,
		FirstName:  x.FirstName,
		LastName:   x.LastName,
		Nickname:   x.Nickname,
		Image:      x.Image,
		FollowInfo: x.FollowInfo,
	}
}

func (x *UserIncoming) pointerSlice() []interface{} {
	return []interface{}{
		x.Email,
		x.Password,
		x.FirstName,
		x.LastName,
		x.Nickname,
		x.Image,
		x.About,
		x.Birthday,
		x.Private,
		x.Country,
	}
}

func (x *User) Censor(doIt bool) interface{} {
	if !doIt {
		return x
	}

	return &struct {
		ID        int64  `json:"ID"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Nickname  string `json:"nickname"`
	}{
		ID:        x.ID,
		FirstName: x.FirstName,
		LastName:  x.LastName,
		Nickname:  x.Nickname,
	}
}

type UserModel struct {
	queries queries.QueryProvider
	db      *sql.DB
}

func MakeUserModel(db *sql.DB) UserModel {
	return UserModel{
		queries: queries.NewQueryProvider(db, "user"),
		db:      db,
	}
}

func (model *UserModel) GetByID(id int64) (*User, error) {
	stmt := model.queries.Prepare("getByID")
	row := stmt.QueryRow(id)

	user := &User{}
	err := row.Scan(user.pointerSlice()...)

	if err != nil {
		return nil, fmt.Errorf("User/GetByID: %w", err)
	}

	return user, nil
}

func (model *UserModel) GetByIDPlusFollowInfo(id int64, myID int64) (*User, error) {
	stmt := model.queries.Prepare("getByIDPlusFollowInfo")

	row := stmt.QueryRow(id, myID)

	user := &User{}
	followInfo := &FollowInfo{}
	user.FollowInfo = followInfo

	err := row.Scan(append(user.pointerSlice(), &followInfo.MeToYou, &followInfo.MeToYouPending, &followInfo.YouToMePending)...)

	if err != nil {
		return nil, fmt.Errorf("User/GetByIDPlusFollowInfo: %w", err)
	}

	return user, nil
}

func (model *UserModel) GetByEmail(email string) (*User, error) {
	stmt := model.queries.Prepare("getByEmail")

	row := stmt.QueryRow(email)

	user := &User{}
	err := row.Scan(user.pointerSlice()...)

	if err != nil {
		return nil, fmt.Errorf("User/GetByEmail: %w", err)
	}

	return user, nil
}

func (model *UserModel) Insert(user UserIncoming) (int64, error) {
	stmt := model.queries.Prepare("insert")

	res, err := stmt.Exec(
		user.pointerSlice()...,
	)

	if err != nil {
		return 0, fmt.Errorf("User/Insert: %w", err)
	}

	return res.LastInsertId()
}

func (model *UserModel) Update(id int64, user UserIncoming) error {
	stmt := model.queries.Prepare("update")

	_, err := stmt.Exec(
		append(user.pointerSlice(), id)...,
	)

	if err != nil {
		return fmt.Errorf("User/Update: %w", err)
	}

	return nil
}

func (model *UserModel) IsFollowing(followerID, followingID int64) (bool, error) {
	stmt := model.queries.Prepare("isFollowing")

	row := stmt.QueryRow(followerID, followingID)

	var includes bool
	err := row.Scan(&includes)

	if err != nil {
		return false, fmt.Errorf("User/IsFollowing: %w", err)
	}

	return includes, nil
}

func (model *UserModel) Follow(myID, targetID int64) error {
	stmt := model.queries.Prepare("follow")

	_, err := stmt.Exec(myID, targetID, "accept")

	if err != nil {
		return fmt.Errorf("User/Follow: %w", err)
	}

	return nil
}

func (model *UserModel) Unfollow(myID, targetID int64) error {
	stmt := model.queries.Prepare("unfollow")

	_, err := stmt.Exec(myID, targetID)

	if err != nil {
		return fmt.Errorf("User/Unfollow: %w", err)
	}

	return nil
}

func (model *UserModel) RequestFollow(myID, targetID int64) error {
	stmt := model.queries.Prepare("follow")

	_, err := stmt.Exec(myID, targetID, "pending")

	if err != nil {
		return fmt.Errorf("User/RequestFollow: %w", err)
	}

	return nil
}

// TODO: Check if this should return an error if there was no request to accept
func (model *UserModel) FollowAccept(myID, targetID int64) error {
	stmt := model.queries.Prepare("followRespond")

	_, err := stmt.Exec("accept", targetID, myID)

	if err != nil {
		return fmt.Errorf("User/FollowAccept: %w", err)
	}

	return nil
}

func (model *UserModel) FollowReject(myID, targetID int64) error {
	stmt := model.queries.Prepare("followRespond")

	_, err := stmt.Exec("reject", targetID, myID)

	if err != nil {
		return fmt.Errorf("User/FollowReject: %w", err)
	}

	return nil
}

func (model *UserModel) ListFollowers(myID, userID int64) ([]*UserLimited, error) {
	stmt := model.queries.Prepare("listFollowers")

	rows, err := stmt.Query(myID, userID)
	if err != nil {
		return nil, fmt.Errorf("User/ListFollowers1: %w", err)
	}
	defer rows.Close()

	users := make([]*UserLimited, 0)

	for rows.Next() {
		user := &User{}

		followInfo := &FollowInfo{}
		user.FollowInfo = followInfo

		err = rows.Scan(append(user.pointerSlice(), &followInfo.MeToYou, &followInfo.MeToYouPending, &followInfo.YouToMePending)...)
		if err != nil {
			return nil, fmt.Errorf("User/ListFollowers2: %w", err)
		}

		users = append(users, user.Limited())
	}

	return users, nil
}

func (model *UserModel) ListFollowing(myID, userID int64) ([]*UserLimited, error) {
	stmt := model.queries.Prepare("listFollowing")

	rows, err := stmt.Query(myID, userID)
	if err != nil {
		return nil, fmt.Errorf("User/ListFollowing1: %w", err)
	}
	defer rows.Close()

	users := make([]*UserLimited, 0)

	for rows.Next() {
		user := &User{}

		followInfo := &FollowInfo{}
		user.FollowInfo = followInfo

		err = rows.Scan(append(user.pointerSlice(), &followInfo.MeToYou, &followInfo.MeToYouPending, &followInfo.YouToMePending)...)
		if err != nil {
			return nil, fmt.Errorf("User/ListFollowing2: %w", err)
		}

		users = append(users, user.Limited())
	}

	return users, nil
}

func (model *UserModel) Known(myID int64) ([]*UserLimited, error) {
	stmt := model.queries.Prepare("known")

	rows, err := stmt.Query(myID)
	if err != nil {
		return nil, fmt.Errorf("User/Known1: %w", err)
	}
	defer rows.Close()

	users := make([]*UserLimited, 0)

	for rows.Next() {
		user := &User{}

		err = rows.Scan(user.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("User/Known2: %w", err)
		}

		users = append(users, user.Limited())
	}

	return users, nil
}

func (model *UserModel) All(myID int64) ([]*UserLimited, error) {
	stmt := model.queries.Prepare("all")

	rows, err := stmt.Query(myID)
	if err != nil {
		return nil, fmt.Errorf("User/All1: %w", err)
	}
	defer rows.Close()

	users := make([]*UserLimited, 0)

	for rows.Next() {
		user := &User{}

		err = rows.Scan(user.pointerSlice()...)
		if err != nil {
			return nil, fmt.Errorf("User/All2: %w", err)
		}

		users = append(users, user.Limited())
	}

	return users, nil
}

func (model *UserModel) FollowStats(myID int64) (map[string]int, error) {
	stmt := model.queries.Prepare("followStats")

	row := stmt.QueryRow(myID)

	stats := make(map[string]int)

	err := row.Scan(
		stats["followers"],
		stats["following"],
	)

	if err != nil {
		return nil, fmt.Errorf("User/FollowStats: %w", err)
	}

	return stats, nil
}
