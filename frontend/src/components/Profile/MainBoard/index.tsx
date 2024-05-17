"use client";

import { Box, Button, Typography } from "@mui/material";
import CreatePost from "../../shared/CreatePost";
import PostsSection from "../../shared/PostsSection";
import { useRouter } from "next/navigation";
import { Item } from "@/components/shared/Item";
import PhotosContent from "../PhotosContent";
import { useSelector } from "react-redux";

interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function MainBoard({ setSelectedTab }: Props) {
  const profile = useSelector((state: any) => state.profileReducer.value);

  const posts = ["post", "post"];
  const router = useRouter();
  let id: number = 10561654311;

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
        <CreatePost />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "13px",
          }}
        >
          <Typography fontSize={22}>Posts</Typography>
          {posts?.length >= 2 && (
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
        {posts?.length >= 1 ? (
          posts.slice(0, 1).map((post) => <PostsSection key={post} />)
        ) : (
          <Typography
            fontSize={40}
            sx={{
              mt: "23px",
              height: "100px",
            }}
          >
            No Posts Yet
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
    </Box>
  );
}
