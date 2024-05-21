"use client";

import { useEffect, useState } from "react";
import CreatePost from "../shared/Post/CreatePost";
import PostsSection from "../shared/Post/PostsSection";
import { fetchFromServer } from "@/lib/api";
import { PostProps, CommentProps } from "@/types/types";
import { Box, Typography } from "@mui/material";
import CreatePostModal from "./CreatePostModal";

interface GroupPostsSectionProps {
  openPostModal: boolean;
  setOpenPostModal: React.Dispatch<boolean>;
  pathName: string | undefined;
}

export default function GroupPostsSection({
  openPostModal,
  setOpenPostModal,
  pathName,
}: GroupPostsSectionProps) {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetchFromServer(`/group/${pathName}/posts`, {
        credentials: "include",
      });
      const data = await response.json();
      const postsWithComments = data.map((post: PostProps) => ({
        ...post,
        comments: post.comments || [],
      }));
      setPosts(postsWithComments);
    };
    fetchPosts();
  }, [pathName]);

  const addNewPost = (newPost: PostProps) => {
    setPosts((prevPosts) => [
      { ...newPost, comments: newPost.comments || [] },
      ...prevPosts,
    ]);
  };

  const addCommentToPost = (postID: number, comment: CommentProps) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postID
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  return (
    <Box
      sx={{
        width: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "23px",
      }}
    >
      <CreatePost setOpenPostModal={setOpenPostModal} />
      {posts.length > 0 ? (
        <PostsSection posts={posts} addCommentToPost={addCommentToPost} />
      ) : (
        <Typography
          sx={{
            mt: "23px",
            fontFamily: "SchoolBell !important",
            fontSize: "32px",
          }}
        >
          This group has no posts yet!
        </Typography>
      )}
      <CreatePostModal
        addNewPost={addNewPost}
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </Box>
  );
}
