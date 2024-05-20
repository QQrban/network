"use client";

import { useEffect, useState } from "react";
import CreatePost from "../shared/CreatePost";
import PostsSection from "../shared/PostsSection";
import { fetchFromServer } from "@/lib/api";
import { PostProps } from "@/types/types";
import { Box, Typography } from "@mui/material";

interface GroupPostsSectionProps {
  setOpenPostModal: React.Dispatch<boolean>;
  pathName: string | undefined;
}

export default function GroupPostsSection({
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
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, [pathName]);

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
        <PostsSection posts={posts} />
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
    </Box>
  );
}
