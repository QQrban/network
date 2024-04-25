package main

import (
	"log"
	"net/http"
	"os"
	"social-network/pkg/api"
	database "social-network/pkg/db"
	"social-network/pkg/notify"
	"social-network/pkg/router"
)

func main() {
	_ = os.Mkdir("./persist", os.ModePerm)
	db := database.NewDatabase("./persist/database.db")
	api.Database = db
	api.Notify = notify.NewNotifier(db)

	//go CleanupDB(db)

	rtr := router.New()
	prepare(&rtr)

	log.Println("Backend listening on http://localhost:8888")
	log.Panic(http.ListenAndServe(":8888", router.ApplyMiddleware(
		rtr,
		api.ExtendSession,
		router.RedirectTrailingSlash,
		router.LogRequests,
		router.Recover500,
	)),
	)
}

/*func CleanupDB(db *database.Database) {
	for {
		n, err := db.Session.CleanExpired()
		if err != nil {
			log.Printf("Failed to clean up old sessions: %v\n", err)
		}
		log.Printf("Cleaned up %v old sessions\n", n)
		time.Sleep(time.Hour * 24)
	}
}*/
