"use client";

import { useEffect, useState } from "react";
import CreatePost from "../shared/CreatePost";
import PostsSection from "../shared/PostsSection";
import { fetchFromServer } from "@/lib/api";
import { PostProps } from "@/types/types";

interface GroupPostsSectionProps {
  setOpenPostModal: React.Dispatch<boolean>;
}

export default function GroupPostsSection({
  setOpenPostModal,
}: GroupPostsSectionProps) {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetchFromServer(`/group/1/posts`, {
        credentials: "include",
      });
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <CreatePost setOpenPostModal={setOpenPostModal} />
      <PostsSection posts={posts} />
    </>
  );
}
