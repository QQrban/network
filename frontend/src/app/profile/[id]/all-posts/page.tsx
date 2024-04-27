"use client";

import LeftColumnMainPage from "@/components/MainPage/LeftColumn";
import PostsSection from "@/components/shared/PostsSection";
import ContactsSection from "@/components/shared/ContactsSection";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";

export default function showAllPosts() {
  const posts = ["post", "post", "post", "post"];

  return (
    <>
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
            top: "80px",
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
          <Item
            sx={{
              overflow: "hidden",
            }}
            radius="8px"
          ></Item>
          <Box
            sx={{
              mt: "25px",
            }}
          >
            {posts
              ? posts.map((post, index) => <PostsSection key={index} />)
              : ""}
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
    </>
  );
}
