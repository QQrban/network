package models

import (
	"database/sql"
	"fmt"
	"social-network/pkg/queries"
	"strings"
	"time"
)

type Post struct {
	ID       int64  `json:"postID"`
	AuthorID int64  `json:"authorID"`
	GroupID  *int64 `json:"groupID"`

	Content string `json:"content"`
	Status  string `json:"status"`
	Images  string `json:"images"`
	AboutID *int64 `json:"aboutID"`

	Created time.Time `json:"created"`

	Author   *UserLimited   `json:"author"`
	Group    *Group         `json:"group"`
	Comments []*Comment     `json:"comments"`
	LikedBy  []*UserLimited `json:"likes"`
}

func (x *Post) pointerSlice() []interface{} {
	return []interface{}{
		&x.ID,
		&x.AuthorID,
		&x.GroupID,
		&x.Content,
		&x.Status,
		&x.Images,
		&x.AboutID,
		&x.Created,
	}
}

type PostModel struct {
	queries queries.QueryProvider
	db      *sql.DB
}

func MakePostModel(db *sql.DB) PostModel {
	return PostModel{
		queries: queries.NewQueryProvider(db, "post"),
		db:      db,
	}
}

func (model PostModel) Insert(post Post) (int64, error) {
	stmt := model.queries.Prepare("insert")

	res, err := stmt.Exec(post.pointerSlice()[:6]...) // 6 with images

	if err != nil {
		return 0, fmt.Errorf("Post/Insert: %w", err)
	}

	return res.LastInsertId()
}

func (model PostModel) GetByID(postID int64) (*Post, error) {
	stmt := model.queries.Prepare("getByID")

	row := stmt.QueryRow(postID)

	post := &Post{}
	author := &User{}
	err := row.Scan(append(post.pointerSlice(), author.pointerSlice()...)...)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByID1: %w", err)
	}
	post.Author = author.Limited()

	comments, err := model.GetComments(postID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByID2: %w", err)
	}
	post.Comments = comments

	likedBy, err := model.GetLikedBy(postID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByID3: %w", err)
	}

	post.LikedBy = likedBy

	/*for _, img := range strings.Split(post.Images, ",") {
		if img == "" {
			continue
		}

		_, err = Database.File.Get(img)
		if err != nil {
			log.Printf("Could not find file with token %v\n", img)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
	}*/

	return post, nil
}

func (model PostModel) GetComments(postID int64) ([]*Comment, error) {
	commModel := MakeCommentModel(model.db)
	stmt := commModel.queries.Prepare("getByPost")

	rows, err := stmt.Query(postID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetComments1: %w", err)
	}
	defer rows.Close()

	comments := make([]*Comment, 0)

	for rows.Next() {
		comment := &Comment{}
		user := &User{}

		err = rows.Scan(append(comment.pointerSlice(), user.pointerSlice()...)...)
		if err != nil {
			return nil, fmt.Errorf("Post/GetComments2: %w", err)
		}

		comment.Author = user.Limited()

		comments = append(comments, comment)
	}

	return comments, nil
}

func (model PostModel) GetLikedBy(postID int64) ([]*UserLimited, error) {
	stmt := model.queries.Prepare("likedBy")

	rows, err := stmt.Query(postID)

	if err != nil {
		return nil, fmt.Errorf("Post/GetLikedBy1: %w", err)
	}
	defer rows.Close()

	likedBy := make([]*UserLimited, 0)

	for rows.Next() {
		user := &User{}
		err = rows.Scan(user.pointerSlice()...)

		if err != nil {
			return nil, fmt.Errorf("Post/GetLikedBy2: %w", err)
		}

		likedBy = append(likedBy, user.Limited())
	}

	return likedBy, nil
}

func (model PostModel) GetByUser(myID, targetID, beforeID int64) ([]*Post, error) {
	stmt := model.queries.Prepare("getByUser")

	rows, err := stmt.Query(myID, targetID, beforeID)

	if err != nil && err != sql.ErrNoRows {
		return nil, fmt.Errorf("Post/GetByUser1: %w", err)
	}
	defer rows.Close()

	posts := make([]*Post, 0)

	for rows.Next() {
		post := &Post{}
		author := &User{}
		err = rows.Scan(append(post.pointerSlice(), author.pointerSlice()...)...)
		post.Author = author.Limited()

		if err != nil {
			return nil, fmt.Errorf("Post/GetByUser2: %w", err)
		}

		comments, err := model.GetComments(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByUser3: %w", err)
		}
		post.Comments = comments

		likedBy, err := model.GetLikedBy(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByUser4: %w", err)
		}

		post.LikedBy = likedBy

		posts = append(posts, post)
	}

	return posts, nil
}

func (model PostModel) GetAll(myID, beforeID int64) ([]*Post, error) {
	stmt := model.queries.Prepare("getAll")

	rows, err := stmt.Query(myID, beforeID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetAll1: %w", err)
	}
	defer rows.Close()

	posts := make([]*Post, 0)

	for rows.Next() {
		post := &Post{}
		author := &User{}
		err = rows.Scan(append(post.pointerSlice(), author.pointerSlice()...)...)
		post.Author = author.Limited()

		if err != nil {
			return nil, fmt.Errorf("Post/GetAll2: %w", err)
		}

		comments, err := model.GetComments(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetAll3: %w", err)
		}
		post.Comments = comments

		likedBy, err := model.GetLikedBy(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetAll4: %w", err)
		}

		post.LikedBy = likedBy

		posts = append(posts, post)
	}

	return posts, nil
}

func (model PostModel) GetByFollowing(myID, beforeID int64) ([]*Post, error) {
	stmt := model.queries.Prepare("getLatestPost")
	latest := stmt.QueryRow(myID)

	posts := make([]*Post, 0)
	post := &Post{}
	author := &User{}
	err := latest.Scan(append(post.pointerSlice(), author.pointerSlice()...)...)
	post.Author = author.Limited()

	if err != nil && err != sql.ErrNoRows {
		return nil, fmt.Errorf("Post/GetByFollowing2: %w", err)
	}
	comments, err := model.GetComments(post.ID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByFollowing3: %w", err)
	}
	post.Comments = comments

	likedBy, err := model.GetLikedBy(post.ID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByFollowing4: %w", err)
	}

	post.LikedBy = likedBy

	posts = append(posts, post)

	stmt = model.queries.Prepare("getByFollowing")

	rows, err := stmt.Query(myID, beforeID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByFollowing1: %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		post := &Post{}
		author := &User{}
		err = rows.Scan(append(post.pointerSlice(), author.pointerSlice()...)...)
		post.Author = author.Limited()

		if err != nil {
			return nil, fmt.Errorf("Post/GetByFollowing2: %w", err)
		}

		comments, err := model.GetComments(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByFollowing3: %w", err)
		}
		post.Comments = comments

		likedBy, err := model.GetLikedBy(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByFollowing4: %w", err)
		}

		post.LikedBy = likedBy

		posts = append(posts, post)
	}

	return posts, nil
}

func (model PostModel) GetByGroup(groupID, beforeID int64) ([]*Post, error) {
	stmt := model.queries.Prepare("getByGroup")

	rows, err := stmt.Query(groupID, beforeID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByGroup1: %w", err)
	}
	defer rows.Close()

	posts := make([]*Post, 0)

	for rows.Next() {
		post := &Post{}
		author := &User{}
		err = rows.Scan(append(post.pointerSlice(), author.pointerSlice()...)...)
		post.Author = author.Limited()

		if err != nil {
			return nil, fmt.Errorf("Post/GetByGroup2: %w", err)
		}

		comments, err := model.GetComments(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByGroup3: %w", err)
		}
		post.Comments = comments

		likedBy, err := model.GetLikedBy(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByGroup4: %w", err)
		}

		post.LikedBy = likedBy

		posts = append(posts, post)
	}

	return posts, nil
}

func (model PostModel) GetByMyGroups(myID, beforeID int64) ([]*Post, error) {
	stmt := model.queries.Prepare("getByMyGroups")

	rows, err := stmt.Query(myID, beforeID)
	if err != nil {
		return nil, fmt.Errorf("Post/GetByMyGroups1: %w", err)
	}
	defer rows.Close()

	posts := make([]*Post, 0)

	for rows.Next() {
		post := &Post{}
		author := &User{}
		group := &Group{}

		err = rows.Scan(append(post.pointerSlice(), append(author.pointerSlice(), group.pointerSlice()...)...)...)

		post.Author = author.Limited()
		post.Group = group

		if err != nil {
			return nil, fmt.Errorf("Post/GetByMyGroups2: %w", err)
		}

		comments, err := model.GetComments(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByMyGroups3: %w", err)
		}
		post.Comments = comments

		likedBy, err := model.GetLikedBy(post.ID)
		if err != nil {
			return nil, fmt.Errorf("Post/GetByMyGroups4: %w", err)
		}

		post.LikedBy = likedBy

		posts = append(posts, post)
	}

	return posts, nil
}

func (model PostModel) HasAccess(userID, postID int64) (bool, error) {
	stmt := model.queries.Prepare("hasAccess")

	row := stmt.QueryRow(userID, postID)

	var access bool
	err := row.Scan(&access)

	if err != nil {
		return false, fmt.Errorf("Post/HasAccess: %w", err)
	}

	return access, nil
}

func (model PostModel) InsertAllowedUser(postID, userID int64) error {
	stmt := model.queries.Prepare("insertAllowedUser")

	_, err := stmt.Exec(postID, userID)

	if err != nil {
		return fmt.Errorf("Post/InsertAllowedUser: %w", err)
	}

	return nil
}

func (model PostModel) Like(postID, userID int64) (int, error) {
	stmt := model.queries.Prepare("hasLiked")
	res := stmt.QueryRow(postID, userID)

	var hasLiked bool
	err := res.Scan(&hasLiked)

	if err != nil {
		return -1, fmt.Errorf("Post/Like1: %w", err)
	}
	if hasLiked {
		stmt := model.queries.Prepare("unlike")
		_, err := stmt.Exec(postID, userID)

		if err != nil {
			return -1, fmt.Errorf("Post/Like2: %w", err)
		}
	} else {
		stmt := model.queries.Prepare("like")

		_, err := stmt.Exec(postID, userID)

		if err != nil {
			return -1, fmt.Errorf("Post/Like3: %w", err)
		}
	}

	stmt = model.queries.Prepare("likes")
	res = stmt.QueryRow(postID)

	var likes int
	err = res.Scan(&likes)

	if err != nil {
		return -1, fmt.Errorf("Post/Like4: %w", err)
	}

	return likes, nil
}

func (model PostModel) Delete(postID int64) error {
	post, err := model.GetByID(postID)
	if err != nil {
		return fmt.Errorf("Post/Delete1: %w", err)
	}
	tokens := strings.Split(post.Images, ",")
	fmt.Println("tokens:", tokens)
	fileModel := MakeFileModel(model.db)
	for _, token := range tokens {
		_, err = fileModel.Delete(token)
		if err != nil {
			return fmt.Errorf("Post/Delete2: %w", err)
		}
	}

	stmt := model.queries.Prepare("delete")
	_, err = stmt.Exec(postID)
	if err != nil {
		return fmt.Errorf("Post/Delete3: %w", err)
	}

	return nil
}
