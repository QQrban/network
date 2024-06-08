package api

import (
	"log"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/router"
	"strconv"
	"time"
)

func CreateComment(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)
	postID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	comment := models.Comment{}

	//err := json.NewDecoder(r.Body).Decode(&comment)
	maxBytesSize := int64((60 << 20) + 1024)              // 60.1 MB = 3 * 20MB + text
	r.Body = http.MaxBytesReader(w, r.Body, maxBytesSize) // Limit total size of request body
	err := r.ParseMultipartForm(32 << 20)

	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	Content := r.FormValue("content")
	//GroupID := r.FormValue("groupID")
	//AboutID := r.FormValue("aboutID")
	//Status := r.FormValue("status")
	comment.Content = Content

	// Check if you have access to the post
	access, err := Database.Post.HasAccess(session.UserID, postID)
	panicIfErr(err)
	if !access {
		log.Println("Don't have access to post")
		writeStatusError(w, http.StatusForbidden)
		return
	}

	comment.AboutID = postID
	comment.AuthorID = session.UserID

	// Save images
	if len(r.MultipartForm.File["images"]) > 0 {
		// Enforce the limit on the number of files.
		if len(r.MultipartForm.File["images"]) > 3 {
			writeStatusError(w, http.StatusBadRequest)
			return
		}

		tokens, err := FileUpload(w, r, "images")
		comment.Images = tokens

		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
	}

	id, err := Database.Comment.Insert(comment)
	panicIfErr(err)

	user, err := Database.User.GetByID(session.UserID)
	panicIfErr(err)
	comment.Author = user.Limited()

	comment.ID = id
	comment.Created = time.Now()

	writeJSON(w, comment)
}

func GetCommentsByPost(w http.ResponseWriter, r *http.Request) {
	myID := getPossibleUserID(r)
	postID, _ := strconv.ParseInt(router.GetSlug(r, 0), 10, 64)

	// Check if you have access to the post
	access, err := Database.Post.HasAccess(myID, postID)
	panicIfErr(err)
	if !access {
		log.Println("Don't have access to post")
		writeStatusError(w, http.StatusForbidden)
		return
	}

	comments, err := Database.Comment.GetByPost(postID)
	panicIfErr(err)

	writeJSON(w, comments)
}
