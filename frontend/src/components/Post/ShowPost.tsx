"use client";

import { Box, Typography } from "@mui/material";
import PostsSection from "../shared/Post/PostsSection";
import { useEffect, useState } from "react";
import { CommentProps, PostProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";
import CircularIndeterminate from "../shared/LoadingCircular";

interface Props {
  pathname: string | undefined;
}

export default function ShowPost({ pathname }: Props) {
  const [mainPagePosts, setMainPagePosts] = useState<PostProps[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  console.log(mainPagePosts);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      const response = await fetchFromServer(`/post/${pathname}`, {
        credentials: "include",
      });
      const data = await response.json();
      setMainPagePosts([data]);
    };
    setShowLoading(true);
    setTimeout(() => {
      fetchFollowingPosts();
      setShowLoading(false);
    }, 500);
  }, []);

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
    <Box sx={{ width: "600px" }}>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          flexDirection: "column",
          gap: "23px",
        }}
      >
        {mainPagePosts ? (
          <PostsSection
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
    </Box>
  );
}
