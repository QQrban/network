"use client";

import { Box, Typography } from "@mui/material";
import PostsSection from "../shared/Post/PostsSection";
import { useEffect, useState } from "react";
import { CommentProps, ContactsProps, PostProps } from "@/types/types";
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
  }, [pathname]);

  const addCommentToPost = (postID: number, comment: CommentProps) => {
    setMainPagePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postID
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
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
            deletePostFromList={deletePostFromList}
            posts={mainPagePosts}
            addCommentToPost={addCommentToPost}
            addLikeToPost={addLikeToPost}
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
