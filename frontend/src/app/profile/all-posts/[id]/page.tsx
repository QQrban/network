"use client";

import LeftColumnMainPage from "@/components/MainPage/LeftColumn";
import ContactsSection from "@/components/shared/ContactsSection";
import PostsSection from "@/components/shared/Post/PostsSection";
import { fetchFromServer } from "@/lib/api";
import { CommentProps, PostProps } from "@/types/types";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowAllPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const pathname = usePathname().split("/").pop();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await fetchFromServer(`/user/${pathname}/posts`, {
        credentials: "include",
      });
      const postsData = await response.json();
      setPosts(postsData);
    };
    fetchAllPosts();
  }, [pathname]);

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
    <Box sx={{ mt: "13px" }}>
      <Typography
        sx={{
          fontFamily: "Gloria Hallelujah !important",
          fontSize: "39px",
          textAlign: "center",
        }}
      >
        All Posts
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          pb: "30px",
        }}
      >
        <Box
          sx={{
            mt: "23px",
            position: "sticky",
            top: "10px",
            height: "430px",
          }}
        >
          <LeftColumnMainPage />
        </Box>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              mt: "25px",
              display: "flex",
              flexDirection: "column",
              gap: "23px",
            }}
          >
            <PostsSection addCommentToPost={addCommentToPost} posts={posts} />
          </Box>
        </Box>
        <Box
          sx={{
            mt: "23px",
            position: "sticky",
            top: "80px",
            height: "430px",
          }}
        >
          <ContactsSection />
        </Box>
      </Box>
    </Box>
  );
}
