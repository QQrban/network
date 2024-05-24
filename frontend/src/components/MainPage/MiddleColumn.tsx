"use client";

import { Box, Typography } from "@mui/material";
import PostsSection from "../shared/Post/PostsSection";
import CreatePost from "../shared/Post/CreatePost";
import { useEffect, useState } from "react";
import CreatePostModal from "../Group/CreatePostModal";
import { CommentProps, ContactsProps, PostProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";
import CircularIndeterminate from "../shared/LoadingCircular";

export default function MiddleColumn() {
  const [mainPagePosts, setMainPagePosts] = useState<PostProps[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      const response = await fetchFromServer("/posts/following", {
        credentials: "include",
      });
      const data = await response.json();
      setMainPagePosts(data);
    };
    setShowLoading(true);
    setTimeout(() => {
      fetchFollowingPosts();
      setShowLoading(false);
    }, 500);
  }, []);

  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  const addNewPost = (newPost: PostProps) => {
    setMainPagePosts((prevPosts) => [
      { ...newPost, comments: newPost.comments || [] },
      ...prevPosts,
    ]);
  };

  const addCommentToPost = (postID: number, comment: CommentProps) => {
    setMainPagePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postID ? { ...post, comments: [...[], comment] } : post
      )
    );
  };

  const addLikeToPost = (postID: number, like: ContactsProps) => {
    setMainPagePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postID
          ? { ...post, likes: [...(post.likes || []), like] }
          : post
      )
    );
  };

  const deletePostFromList = async (postID: number) => {
    setMainPagePosts((prevPosts) =>
      prevPosts.filter((post) => post.postID !== postID)
    );
  };

  return (
    <Box sx={{ width: "600px" }}>
      <Box sx={{ width: "100%" }}>
        <CreatePost setOpenPostModal={setOpenPostModal} />
      </Box>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          flexDirection: "column",
          gap: "23px",
        }}
      >
        {mainPagePosts.length > 0 ? (
          <PostsSection
            deletePostFromList={deletePostFromList}
            addLikeToPost={addLikeToPost}
            posts={mainPagePosts}
            addCommentToPost={addCommentToPost}
          />
        ) : (
          !showLoading && (
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Gloria Hallelujah !important",
                fontSize: "50px",
              }}
            >
              Nothing to Show Yet
            </Typography>
          )
        )}
        {showLoading && (
          <Box
            sx={{ width: "600px", display: "flex", justifyContent: "center" }}
          >
            <CircularIndeterminate />
          </Box>
        )}
      </Box>
      <CreatePostModal
        text="Create Post"
        addNewPost={addNewPost}
        isProfile={true}
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </Box>
  );
}
