"use client";

import { Box, Button, Typography } from "@mui/material";
import CreatePost from "../../shared/Post/CreatePost";
import PostsSection from "../../shared/Post/PostsSection";
import { useRouter } from "next/navigation";
import { Item } from "@/components/shared/Item";
import PhotosContent from "../PhotosContent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreatePostModal from "@/components/Group/CreatePostModal";
import { CommentProps, PostProps } from "@/types/types";

interface Props {
  isYourProfile: boolean;
  pathname: string | undefined;
  posts: PostProps[];
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function MainBoard({
  setSelectedTab,
  posts,
  isYourProfile,
}: Props) {
  const [profilePosts, setProfilePosts] = useState<PostProps[]>([]);
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  useEffect(() => {
    setProfilePosts(posts);
  }, [posts]);

  const profile = useSelector((state: any) => state.profileReducer.value);

  const addNewPost = (newPost: PostProps) => {
    setProfilePosts((prevPosts) => [
      { ...newPost, comments: newPost.comments || [] },
      ...prevPosts,
    ]);
  };

  const addCommentToPost = (postID: number, comment: CommentProps) => {
    setProfilePosts((prevPosts) =>
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
        display: "flex",
        gap: "23px",
        overflow: "auto",
        pb: "40px",
      }}
    >
      <Box
        sx={{
          width: "600px",
        }}
      >
        {isYourProfile && <CreatePost setOpenPostModal={setOpenPostModal} />}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "13px",
          }}
        >
          <Typography fontSize={22} sx={{ mb: "23px" }}>
            Posts
          </Typography>
          {/*           {posts?.length > 2 && (
            <Button
              onClick={() => router.push(`/profile/${id}/all-posts`)}
              sx={{
                mt: "20px",
                fontFamily: "Gloria Hallelujah",
                fontSize: "18px",
              }}
            >
              View All Posts &#x2192;
            </Button>
          )} */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "23px" }}>
          <PostsSection
            addCommentToPost={addCommentToPost}
            posts={profilePosts}
          />
        </Box>
        {profilePosts?.length === 0 && (
          <Typography
            sx={{
              fontFamily: "Gloria Hallelujah !important",
              fontSize: "46px",
            }}
          >
            No Posts Yet!
          </Typography>
        )}
      </Box>
      <Box>
        <Item
          radius="8px"
          sx={{
            width: "100%",
            p: "10px 20px",
            alignSelf: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Gloria Hallelujah !important",
              fontWeight: 600,
              fontSize: "28px",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              mt: "13px",
              fontSize: "21px",
              fontFamily: profile.about
                ? "inherit"
                : "Gloria Hallelujah !important",
            }}
          >
            {profile.about
              ? profile.about
              : "Mr. X preferred to remain incognito and said nothing about himself."}
          </Typography>
        </Item>
        <PhotosContent setSelectedTab={setSelectedTab} isMainBoard={true} />
      </Box>
      <CreatePostModal
        text="Create Post"
        isProfile={true}
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
        addNewPost={addNewPost}
      />
    </Box>
  );
}
