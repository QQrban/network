"use client";

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import CreatePost from "../../shared/Post/CreatePost";
import PostsSection from "../../shared/Post/PostsSection";
import { Item } from "@/components/shared/Item";
import PhotosContent from "../PhotosContent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreatePostModal from "@/components/shared/Post/CreatePostModal";
import { CommentProps, ContactsProps, PostProps } from "@/types/types";
import { useRouter } from "next/navigation";
import privacyIcon from "../../../../public/icons/private.svg";
import Image from "next/image";

interface Props {
  hasAccess: boolean;
  isYourProfile: boolean;
  pathname: string | undefined;
  profilePosts: PostProps[];
  setProfilePosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function MainBoard({
  setSelectedTab,
  profilePosts,
  setProfilePosts,
  isYourProfile,
  hasAccess,
}: Props) {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  const matchesXL = useMediaQuery("(min-width:1200px)");
  const matchesMD = useMediaQuery("(min-width:856px)");
  const matchesSM = useMediaQuery("(min-width:670px)");

  const profile = useSelector((state: any) => state.profileReducer.value);

  const router = useRouter();

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

  const addLikeToPost = (postID: number, like: ContactsProps) => {
    setProfilePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postID === postID
          ? { ...post, likes: [...(post.likes || []), like] }
          : post
      )
    );
  };

  const deletePostFromList = async (postID: number) => {
    setProfilePosts((prevPosts) =>
      prevPosts.filter((post) => post.postID !== postID)
    );
  };

  return (
    <>
      {isYourProfile || hasAccess ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: matchesXL ? "row" : "column",
            gap: "23px",
            overflow: "auto",
            pb: "40px",
            width: matchesXL ? "100%" : matchesMD ? "600px" : "100%",
            m: "0 auto",
          }}
        >
          <Box
            sx={{
              order: matchesXL ? 1 : 2,
              width: matchesMD ? "600px" : "100%",
            }}
          >
            {isYourProfile && (
              <CreatePost setOpenPostModal={setOpenPostModal} />
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                m: "23px 0 13px 0",
              }}
            >
              <Typography fontSize={30}>Posts</Typography>
              {profilePosts?.length > 2 && (
                <Button
                  onClick={() =>
                    router.push(`/profile/all-posts/${profile.id}`)
                  }
                  sx={{
                    fontFamily: "Gloria Hallelujah",
                    fontSize: "18px",
                  }}
                >
                  View All Posts &#x2192;
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "23px" }}>
              <PostsSection
                deletePostFromList={deletePostFromList}
                addLikeToPost={addLikeToPost}
                addCommentToPost={addCommentToPost}
                posts={
                  profilePosts.length > 2
                    ? profilePosts.slice(0, 2)
                    : profilePosts
                }
              />
            </Box>
            {profilePosts?.length === 0 && (
              <Typography
                sx={{
                  fontFamily: "Gloria Hallelujah !important",
                  fontSize: "46px",
                  textTransform: "capitalize",
                }}
              >
                This user has no posts
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              order: matchesXL ? 2 : 1,
              width: matchesMD ? "600px" : "100%",
            }}
          >
            <Item
              radius="8px"
              sx={{
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
                  : "This account preferred to remain incognito and said nothing about himself."}
              </Typography>
            </Item>
            <PhotosContent
              posts={profilePosts}
              setSelectedTab={setSelectedTab}
              isMainBoard={true}
            />
          </Box>
          <CreatePostModal
            text="Create Post"
            isProfile={true}
            openPostModal={openPostModal}
            setOpenPostModal={setOpenPostModal}
            addNewPost={addNewPost}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "SchoolBell !important",
              fontSize: "45px",
            }}
          >
            This account is private
          </Typography>
          <Image width={101} height={101} src={privacyIcon} alt="private" />
          <Typography sx={{ fontSize: "19px" }}>
            Follow this account to see more!
          </Typography>
        </Box>
      )}
    </>
  );
}
