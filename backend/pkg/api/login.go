package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"social-network/pkg/models"
	"time"
)

// Login handler reads in credentials and sends back a session token.
func Login(w http.ResponseWriter, r *http.Request) {
	// Decode credentials
	credentials := struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}{}

	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		log.Println(err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	// Check if the user exists
	user, err := Database.User.GetByEmail(credentials.Email)
	panicUnlessError(err, sql.ErrNoRows)

	if err != nil {
		writeStatusError(w, http.StatusUnauthorized)
		return
	}

	// Check password
	// TODO: Password encryption
	if user.Password != credentials.Password {
		writeStatusError(w, http.StatusUnauthorized)
		return
	}
	// Valid credentials at this point
	doLogin(w, user)
	writeJSON(w, user)
}

func doLogin(w http.ResponseWriter, user *models.User) {
	token, err := Database.Session.Insert(user.ID, sessionDuration)
	if err != nil {
		panic(err)
	}

	cookie := newSessionCookie(token, time.Now().Add(sessionDuration))
	http.SetCookie(w, cookie)
}

// Logout handler takes in session token and removes it.
func Logout(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	token := session.Token

	success, err := Database.Session.Delete(token)
	if err != nil {
		panic(err)
	}

	if !success {
		writeStatusError(w, http.StatusUnauthorized)
		return
	}

	cookie := newSessionCookie("deleted", time.Unix(0, 0))
	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusNoContent)
}

// LogoutAll handler logs a user out from all their sessions.
func LogoutAll(w http.ResponseWriter, r *http.Request) {
	session := getSession(r)

	user, err := Database.User.GetByID(session.UserID)
	if err != nil {
		panic(err)
	}

	err = Database.Session.ClearUser(user.ID)
	if err != nil {
		panic(err)
	}

	cookie := newSessionCookie("deleted", time.Unix(0, 0))
	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusNoContent)
}

func Register(w http.ResponseWriter, r *http.Request) {
	// PUT /register

	// Create custom struct because the user struct doesn't include json tag for password
	incoming := models.UserIncoming{}
	/*err := json.NewDecoder(r.Body).Decode(&incoming)
	if err != nil {
		log.Println("api/Register1:", err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}*/

	// Get form values
	err := r.ParseMultipartForm(32 << 10)
	if err != nil {
		log.Println("api/Register1:", err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")
	firstName := r.FormValue("firstName")
	lastName := r.FormValue("lastName")
	birthday, _ := time.Parse("2006-01-02", r.FormValue("birthday"))
	nickname := r.FormValue("nickname")
	about := r.FormValue("about")
	private := r.FormValue("private") == "true"
	country := r.FormValue("country")
	var token string
	fmt.Println("birthday0:", r.FormValue("birthday"))

	// Save images
	if len(r.MultipartForm.File["avatar"]) > 0 {
		fmt.Println("img0")
		// Enforce the limit on the number of files.
		if len(r.MultipartForm.File["avatar"]) > 1 {
			writeStatusError(w, http.StatusBadRequest)
			return
		}
		fmt.Println("img1")
		token, err = FileUpload(w, r, "avatar")
		fmt.Println("img2")
		if err != nil {
			log.Println(err)
			writeStatusError(w, http.StatusBadRequest)
			return
		}
	}

	fmt.Printf("email: %s\npassword: %s\nfirstName: %s\nlastName: %s\nbirthday: %s\nnickname: %s\nabout: %s\nprivate: %v\ncountry: %s\ntoken %s\n",
		email, password, firstName, lastName, birthday, nickname, about, private, country, token)

	incoming.Email = &email
	incoming.Password = &password
	incoming.FirstName = &firstName
	incoming.LastName = &lastName
	incoming.Birthday = &birthday
	incoming.Nickname = &nickname
	incoming.About = &about
	incoming.Private = private
	incoming.Country = &country
	incoming.Image = &token

	id, err := Database.User.Insert(incoming)
	if err != nil {
		log.Println("api/Register2:", err)
		writeStatusError(w, http.StatusBadRequest)
		return
	}

	user, err := Database.User.GetByID(id)
	if err != nil {
		panic(err)
	}

	doLogin(w, user)
	writeJSON(w, user)
}

// func registerValidate(user models.User) *map[string]string {
// 	return nil
// }

func CheckAuth(w http.ResponseWriter, r *http.Request) {
	// GET /check-auth
	session := getSession(r)

	user, err := Database.User.GetByID(session.UserID)
	if err != nil {
		panic(err)
	}

	writeJSON(w, user)
}
