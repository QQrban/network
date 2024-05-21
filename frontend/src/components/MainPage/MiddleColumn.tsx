"use client";

import { Box } from "@mui/material";
import PostsSection from "../shared/Post/PostsSection";
import CreatePost from "../shared/Post/CreatePost";
import { useEffect, useState } from "react";
import CreatePostModal from "../Group/CreatePostModal";
import { CommentProps, PostProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";
import CircularIndeterminate from "../shared/LoadingCircular";

export default function MiddleColumn() {
  const [mainPagePosts, setMainPagePosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      const response = await fetchFromServer("/posts/following", {
        credentials: "include",
      });
      const data = await response.json();
      setMainPagePosts(data);
    };
    setTimeout(() => {
      fetchFollowingPosts();
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
        post.postID === postID
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  return (
    <Box>
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
            posts={mainPagePosts}
            addCommentToPost={addCommentToPost}
          />
        ) : (
          <Box
            sx={{ width: "600px", display: "flex", justifyContent: "center" }}
          >
            <CircularIndeterminate />
          </Box>
        )}
      </Box>
      <CreatePostModal
        addNewPost={addNewPost}
        isProfile={true}
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </Box>
  );
}
