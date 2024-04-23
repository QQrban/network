"use client";

import { Box, Button, Typography } from "@mui/material";
import CreatePost from "./CreatePost";
import ContactInfo from "./ContactInfo";
import Education from "./Education";
import PostsSection from "./PostsSection/PostsSection";
import { useRouter } from "next/navigation";

export default function PostsContent() {
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
          width: "50%",
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
      <Box
        sx={{
          width: "50%",
        }}
      >
        <ContactInfo />
        <Education />
      </Box>
    </Box>
  );
}
