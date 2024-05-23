package main

import (
	"social-network/pkg/api"
	"social-network/pkg/router"
)

// Prepare sets up the router with checks and routes.
func prepare(rtr *router.Router) {
	
	rtr.Get("/check-auth", api.EnsureAuth(api.CheckAuth))
	rtr.Get("/user/known", api.EnsureAuth(api.GetKnownUsers))
	rtr.Get("/user/([0-9]+)", api.OptionalAuth(api.GetUserByID))
	rtr.Get("/user/([^/]+)", api.GetUserByEmail)
	rtr.Get("/users", api.EnsureAuth(api.GetAllUsers))
	rtr.Post("/user", api.EnsureAuth(api.UpdateUser))
	rtr.Get("/user", api.EnsureAuth(api.GetUserBySession))
	rtr.Get("/suggestions", api.EnsureAuth(api.GetSuggestions))
	rtr.Post("/user/status", api.EnsureAuth(api.UpdateStatus))

	rtr.Get("/user/([0-9]+)/followers", api.EnsureAuth(api.UserFollowers))
	rtr.Get("/user/([0-9]+)/following", api.EnsureAuth(api.UserFollowing))
	rtr.Post("/user/([0-9]+)/follow", api.EnsureAuth(api.UserFollow))
	rtr.Post("/user/([0-9]+)/accept", api.EnsureAuth(api.UserAcceptFollow))
	rtr.Post("/user/([0-9]+)/reject", api.EnsureAuth(api.UserRejectFollow))
	rtr.Post("/user/([0-9]+)/unfollow", api.EnsureAuth(api.UserUnfollow))

	rtr.Put("/register", api.Register)
	rtr.Post("/login", api.Login)
	rtr.Get("/logout/all", api.EnsureAuth(api.LogoutAll))
	rtr.Get("/logout", api.EnsureAuth(api.Logout))

	rtr.Get("/post/([0-9]+)/comments", api.OptionalAuth(api.GetCommentsByPost))
	rtr.Put("/post/([0-9]+)/comment", api.EnsureAuth(api.CreateComment))
	//rtr.Post("/post/([0-9]+)/comment", api.EnsureAuth(api.EditComment))

	rtr.Get("/user/([0-9]+)/posts", api.OptionalAuth(api.GetUserPosts))
	rtr.Get("/group/([0-9]+)/posts", api.GroupAccessCheck(api.GetGroupPosts))
	rtr.Get("/post/([0-9]+)", api.OptionalAuth(api.GetPostByID))
	rtr.Put("/post/([0-9]+)/like", api.EnsureAuth(api.LikePost))
	//rtr.Post("/post/([0-9]+)", api.EnsureAuth(api.EditPost))
	rtr.Get("/posts/following", api.EnsureAuth(api.GetMyFollowingPosts))
	rtr.Get("/posts/groups", api.EnsureAuth(api.GetMyGroupPosts))
	rtr.Get("/posts", api.OptionalAuth(api.GetAllPosts))
	rtr.Post("/post", api.EnsureAuth(api.CreatePost))
	rtr.Delete("/post/([0-9]+)", api.EnsureAuth(api.DeletePost))

	rtr.Get("/file/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})", api.FileDownload)
	/*rtr.Post("/file", api.FileUpload)*/

	rtr.Put("/group", api.EnsureAuth(api.CreateGroup))
	rtr.Get("/groups", api.OptionalAuth(api.GetAllGroups))
	rtr.Get("/groups/my", api.OptionalAuth(api.GetMyGroups))
	rtr.Get("/group/([0-9]+)", api.EnsureAuth(api.GetGroupByID)) //GroupAccessCheck
	rtr.Post("/group/([0-9]+)/(invite|accept|reject)/([0-9]+)", api.EnsureAuth(api.GroupInvite))
	rtr.Post("/group/([0-9]+)/(join|accept|reject)", api.EnsureAuth(api.JoinGroup))
	rtr.Post("/group/([0-9]+)/leave", api.EnsureAuth(api.LeaveGroup))
	rtr.Get("/group/([0-9]+)/members", api.GroupAccessCheck(api.GetGroupMembers))
	rtr.Get("/group/([0-9]+)/invites", api.GroupAccessCheck(api.GetPendingInvites))

	rtr.Post("/group/([0-9]+)/transfer/([0-9]+)", api.EnsureAuth(api.TransferOwnership))

	rtr.Put("/event", api.EnsureAuth(api.CreateEvent))
	rtr.Put("/event/([0-9]+)/choice/([1-9])", api.EventAccessCheck(api.RespondEvent))
	//rtr.Post("/event/([0-9]+)/going", api.EnsureAuth(api.EventGoing))
	//rtr.Post("/event/([0-9]+)/not-going", api.EnsureAuth(api.EventNotGoing))
	rtr.Post("/event/([0-9]+)/unset", api.EnsureAuth(api.EventUnset))
	rtr.Get("/event/([0-9]+)", api.EventAccessCheck(api.GetEvent))
	rtr.Get("/group/([0-9]+)/events", api.GroupAccessCheck(api.GetGroupEvents))
	rtr.Get("/event/([0-9]+)/members", api.EventAccessCheck(api.GetEventMembers))
	rtr.Get("/events", api.EnsureAuth(api.GetMyEvents))

	rtr.Post("/message/send", api.EnsureAuth(api.SendMessage))
	rtr.Post("/message/history", api.EnsureAuth(api.GetMessages)) // NB! What's this about?
	rtr.Get("/notifications", api.EnsureAuth(api.GetNotifications))

	rtr.Get("/stats", api.EnsureAuth(api.GetStats))
	rtr.Get("/stats/user/([0-9]+)", api.EnsureAuth(api.GetUserStats))
	rtr.Get("/stats/group/([0-9]+)", api.EnsureAuth(api.GetGroupStats))
	rtr.Get("/stats/event/([0-9]+)", api.EnsureAuth(api.GetEventStats))
}
