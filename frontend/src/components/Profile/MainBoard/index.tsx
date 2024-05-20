"use client";

import { Box, Button, Typography } from "@mui/material";
import CreatePost from "../../shared/CreatePost";
import PostsSection from "../../shared/PostsSection";
import { useRouter } from "next/navigation";
import { Item } from "@/components/shared/Item";
import PhotosContent from "../PhotosContent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreatePostModal from "@/components/Group/CreatePostModal";
import { PostProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";

interface Props {
  posts: PostProps[];
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function MainBoard({ setSelectedTab, posts }: Props) {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  const profile = useSelector((state: any) => state.profileReducer.value);

  const router = useRouter();
  let id: number = 10561654311;

  const da = () => {
    console.log(123);
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
        <CreatePost setOpenPostModal={setOpenPostModal} />
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
          {posts?.length > 2 && (
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
          )}
        </Box>
        <PostsSection addCommentToPost={da} posts={posts} />
        {posts?.length === 0 && (
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
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
        addNewPost={da}
      />
    </Box>
  );
}
