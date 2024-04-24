package main

import (
	"social-network/pkg/api"
	"social-network/pkg/router"
)

// Prepare sets up the router with checks and routes.
func prepare(rtr *router.Router) {
	rtr.Get("/user", api.EnsureAuth(api.GetUserBySession))
	rtr.Post("/user", api.EnsureAuth(api.UpdateUser))
	rtr.Get("/user/([0-9]+)", api.OptionalAuth(api.GetUserByID))
	rtr.Get("/user/([^/]+)", api.GetUserByEmail)
	/*rtr.Get("/user/known", api.EnsureAuth(api.GetKnownUsers))

	rtr.Get("/user/([0-9]+)/followers", api.UserFollowers)
	rtr.Get("/user/([0-9]+)/following", api.UserFollowing)
	rtr.Post("/user/([0-9]+)/follow", api.EnsureAuth(api.UserFollow))
	rtr.Post("/user/([0-9]+)/accept", api.EnsureAuth(api.UserAcceptFollow))
	rtr.Post("/user/([0-9]+)/unfollow", api.EnsureAuth(api.UserUnfollow))*/

	rtr.Put("/register", api.Register)
	rtr.Post("/login", api.Login)
	rtr.Get("/logout", api.EnsureAuth(api.Logout))
	rtr.Get("/logout/all", api.EnsureAuth(api.LogoutAll))

	/*rtr.Post("/post/create", api.EnsureAuth(api.CreatePost))
	rtr.Get("/post/([0-9]+)", api.OptionalAuth(api.GetPostByID))
	rtr.Get("/post/all", api.OptionalAuth(api.GetAllPosts))
	rtr.Get("/post/all/groups", api.EnsureAuth(api.GetMyGroupPosts))
	rtr.Get("/post/all/following", api.EnsureAuth(api.GetMyFollowingPosts))
	rtr.Get("/group/([0-9]+)/posts", api.GroupAccessCheck(api.GetGroupPosts))
	rtr.Get("/user/([0-9]+)/posts", api.OptionalAuth(api.GetUserPosts))

	rtr.Post("/post/([0-9]+)/comment/create", api.EnsureAuth(api.CreateComment))
	rtr.Get("/post/([0-9]+)/comment/all", api.OptionalAuth(api.GetCommentsByPost))

	rtr.Get("/file/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})", api.FileDownload)
	rtr.Post("/file", api.FileUpload)

	rtr.Post("/group/create", api.EnsureAuth(api.CreateGroup))
	rtr.Get("/group/all", api.OptionalAuth(api.GetAllGroups))
	rtr.Get("/group/my", api.OptionalAuth(api.GetMyGroups))
	rtr.Get("/group/([0-9]+)", api.GroupAccessCheck(api.GetGroupByID))
	rtr.Post("/group/([0-9]+)/invite/([0-9]+)", api.EnsureAuth(api.GroupInvite))
	rtr.Post("/group/([0-9]+)/join", api.EnsureAuth(api.JoinGroup))
	rtr.Post("/group/([0-9]+)/leave", api.EnsureAuth(api.LeaveGroup))
	rtr.Get("/group/([0-9]+)/members", api.GroupAccessCheck(api.GetGroupMembers))
	rtr.Post("/group/([0-9]+)/transfer/([0-9]+)", api.EnsureAuth(api.TransferOwnership))
	rtr.Get("/group/([0-9]+)/invite/all", api.GroupAccessCheck(api.GetPendingInvites))

	rtr.Post("/event/create", api.EnsureAuth(api.CreateEvent))
	rtr.Post("/event/([0-9]+)/going", api.EnsureAuth(api.EventGoing))
	rtr.Post("/event/([0-9]+)/not-going", api.EnsureAuth(api.EventNotGoing))
	rtr.Post("/event/([0-9]+)/unset", api.EnsureAuth(api.EventUnset))
	rtr.Get("/event/([0-9]+)", api.EventAccessCheck(api.GetEvent))
	rtr.Get("/group/([0-9]+)/events", api.GroupAccessCheck(api.GetGroupEvents))
	rtr.Get("/event/([0-9]+)/members", api.EventAccessCheck(api.GetEventMembers))
	rtr.Get("/event/all", api.EnsureAuth(api.GetMyEvents))*/

	rtr.Post("/message/send", api.EnsureAuth(api.SendMessage))
	rtr.Post("/message/history", api.EnsureAuth(api.GetMessages))
}