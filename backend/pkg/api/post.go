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
		post.AboutID = &aboutID
	}

	if Status == "" {
		post.Status = "public"
	} else {
		post.Status = Status
	}
	post.Content = Content
	/*fmt.Println("formData:", formData)
	if formData != nil {
		log.Println("formData:", formData)
	}
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}*/

	// If it's a group post, check that I have access
	if post.GroupID != nil {
		post.Status = "public"

		access, err := Database.Group.IncludesUser(*post.GroupID, session.UserID)
		panicIfErr(err)
		if !access {
			writeStatusError(w, http.StatusForbidden)
			return
		}
	}

	/*if post.Status == "" {
		post.Status = "public"
	}*/

	if post.Status == "manual" {
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

	//err = saveImages(r, "images", cid)
	if len(r.MultipartForm.File["images"]) > 0 {
		// Enforce the limit on the number of files.
		if len(r.MultipartForm.File["images"]) > 3 {
			writeStatusError(w, http.StatusBadRequest)
			return
		}

		//tokens, err := FileUpload(w, r, "images")

		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
	}

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

	post.AuthorID = session.UserID
	id, err := Database.Post.Insert(post.Post)
	if err != nil {
		panic(err)
	}

	if post.Status == "manual" {
		for _, userID := range post.AllowedUsers {
			err = Database.Post.InsertAllowedUser(id, userID)
			panicIfErr(err)
		}
	}

	user, err := Database.User.GetByID(session.UserID)
	panicIfErr(err)

	post.Author = user.Limited()

	post.ID = id
	post.Created = time.Now()

	writeJSON(w, post.Post)
}

/*func saveImages(r *http.Request, iName string, comment_id int64) error {
	// Enforce the limit on the number of files.
	if len(r.MultipartForm.File[iName]) > 3 {
		return errors.New("too many files uploaded")
	}
	uploadPath := "./ui/static/images/uploads"
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		os.Mkdir(uploadPath, os.ModePerm)
	}

	files := r.MultipartForm.File[iName]
	for _, fileHeader := range files {
		src, err := fileHeader.Open()
		if err != nil {
			return err
		}
		defer src.Close()

		// Check file type using the mime package. // Not working!!
		//fileType, err := getFileType(src)
		//fmt.Println("fileType:", fileType, err)
		//if err != nil || (fileType != "image/png" && fileType != "image/gif" && fileType != "image/jpeg") {
		//	return errors.New("invalid file type: " + fileType)
		//}

		// Check file size.
		maxFileSize := int64(20 << 20) // 20MB
		if fileHeader.Size > maxFileSize {
			return fmt.Errorf("file %s is too big", fileHeader.Filename)
		}

		// Create a temporary file to store the uploaded file contents.
		suffix := filepath.Ext(fileHeader.Filename)
		dst, err := os.CreateTemp(uploadPath, "*"+suffix)
		if err != nil {
			return err
		}
		defer dst.Close()

		if _, err = io.Copy(dst, src); err != nil {
			return err
		}

		// Add image name to database
		// tmpName := filepath.Base(dst.Name())
		img := &Image{
			Comment_Id: comment_id,
			FileName:   fileHeader.Filename,
			TmpName:    dst.Name(), //tmpName,
		}

		_, err = img.Create()
		if err != nil {
			return err
		}

		fmt.Printf("File %s successfully saved\n", fileHeader.Filename)
	}
	return nil
}*/

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

	likes, err := Database.Post.Like(postID, session.UserID)
	panicIfErr(err)

	writeJSON(w, likes)
}
