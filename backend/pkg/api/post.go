package api

import (
	"database/sql"
	"log"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/router"
	"strconv"
	"time"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	post := struct {
		models.Post
		AllowedUsers []int64 `json:"allowedUsers"`
	}{}

	maxBytesSize := int64((60 << 20) + 1024)              // 60.1 MB = 3 * 20MB + text
	r.Body = http.MaxBytesReader(w, r.Body, maxBytesSize) // Limit total size of request body
	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	Content := r.FormValue("content")
	GroupID := r.FormValue("groupID")
	AboutID := r.FormValue("aboutID")
	Status := r.FormValue("status")

	if GroupID != "" && GroupID != "null" {
		groupID, err := strconv.ParseInt(GroupID, 10, 64)
		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
		post.GroupID = &groupID
	}

	if AboutID != "" && AboutID != "null" {
		aboutID, err := strconv.ParseInt(AboutID, 10, 64)
		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
		post.Post.AboutID = &aboutID
	}

	if Status == "" {
		post.Post.Status = "public"
	} else {
		post.Post.Status = Status
	}
	post.Content = Content

	// If it's a group post, check that I have access
	if post.GroupID != nil {
		post.Post.Status = "public"

		access, err := Database.Group.IncludesUser(*post.Post.GroupID, session.UserID)
		panicIfErr(err)
		if !access {
			writeStatusError(w, http.StatusForbidden)
			return
		}
	}

	if post.Post.Status == "manual" {
		if post.AllowedUsers == nil {
			log.Println("Tried to insert a post with privacy \"MANUAL\", but with no allowedUsers array defined")
			writeStatusError(w, http.StatusBadRequest)
			return
		}

		// This is a crappy way of doing this, but I want to make sure the provided user IDs are valid
		// That way we don't end up with an "orphan" post that nobody has access to
		// A much better alternative would be to use a transaction, but we don't have the framework set up for that
		for i, userID := range post.AllowedUsers {
			_, err := Database.User.GetByID(userID)
			if err != nil {
				log.Printf("Provided userID %v at allowedUsers[%v] is not valid\n", userID, i)
				writeStatusError(w, http.StatusBadRequest)
				return
			}
		}
	}

	// Save images
	if len(r.MultipartForm.File["images"]) > 0 {
		// Enforce the limit on the number of files.
		if len(r.MultipartForm.File["images"]) > 3 {
			writeStatusError(w, http.StatusBadRequest)
			return
		}

		tokens, err := FileUpload(w, r, "images")
		post.Post.Images = tokens

		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
	}

	post.Post.AuthorID = session.UserID
	id, err := Database.Post.Insert(post.Post)
	if err != nil {
		panic(err)
	}

	if post.Post.Status == "manual" {
		for _, userID := range post.AllowedUsers {
			err = Database.Post.InsertAllowedUser(id, userID)
			panicIfErr(err)
		}
	}

	user, err := Database.User.GetByID(session.UserID)
	panicIfErr(err)

	post.Post.Author = user.Limited()

	post.Post.ID = id
	post.Post.Created = time.Now()

	writeJSON(w, post.Post)
}

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	myID := getPossibleUserID(r)

	beforeID, err := queryAtoi(r.URL.Query().Get("beforeID"))
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	posts, err := Database.Post.GetAll(myID, beforeID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, posts)
}

func GetPostByID(w http.ResponseWriter, r *http.Request) {
	myID := getPossibleUserID(r)
	slug := router.GetSlug(r, 0)
	postID, _ := strconv.ParseInt(slug, 10, 64)

	allowed, err := Database.Post.HasAccess(myID, postID)
	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusNotFound)
		return
	}
	if !allowed {
		writeStatusError(w, http.StatusForbidden)
		return
	}

	post, err := Database.Post.GetByID(postID)
	panicIfErr(err)

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

	writeJSON(w, post)
}

func GetGroupPosts(w http.ResponseWriter, r *http.Request) {
	groupID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	beforeID, err := queryAtoi(r.URL.Query().Get("beforeID"))
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	posts, err := Database.Post.GetByGroup(groupID, beforeID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, posts)
}

func GetMyGroupPosts(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	beforeID, err := queryAtoi(r.URL.Query().Get("beforeID"))
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	posts, err := Database.Post.GetByMyGroups(session.UserID, beforeID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, posts)
}

func GetUserPosts(w http.ResponseWriter, r *http.Request) {
	myID := getPossibleUserID(r)

	slug := router.GetSlug(r, 0)
	userID, _ := strconv.ParseInt(slug, 10, 64)

	beforeID, err := queryAtoi(r.URL.Query().Get("beforeID"))
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	posts, err := Database.Post.GetByUser(myID, userID, beforeID)
	panicIfErr(err)

	writeJSON(w, posts)
}

func GetMyFollowingPosts(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	beforeID, err := queryAtoi(r.URL.Query().Get("beforeID"))
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	posts, err := Database.Post.GetByFollowing(session.UserID, beforeID)
	panicIfErr(err)

	writeJSON(w, posts)
}

func LikePost(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	slug := router.GetSlug(r, 0)
	postID, _ := strconv.ParseInt(slug, 10, 64)

	likes, typ, err := Database.Post.Like(postID, session.UserID)
	panicIfErr(err)

	if typ == "+" {
		done := make(chan bool)
		post, err := Database.Post.GetByID(postID)
		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusNotFound)
			return
		}
		go func() {
			defer close(done)
			me, err := Database.User.GetByID(session.UserID)
			if err != nil {
				log.Println(err)
			}

			message, targets := Notify.PostLiked(me, post)
			event := ChatEvent{
				Type:    "post",
				Payload: message,
			}
			ChatManager.broadcast(event, targets)
		}()
		<-done
	}

	writeJSON(w, likes)
}

func DeletePost(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	slug := router.GetSlug(r, 0)
	postID, _ := strconv.ParseInt(slug, 10, 64)

	allowed, err := Database.Post.HasAccess(session.UserID, postID)
	panicUnlessError(err, sql.ErrNoRows)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusNotFound)
		return
	}
	if !allowed {
		writeStatusError(w, http.StatusForbidden)
		return
	}

	err = Database.Post.Delete(postID)
	panicIfErr(err)

	writeStatus(w, http.StatusOK)
}
