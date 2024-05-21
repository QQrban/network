"use client";

import LeftColumnMainPage from "@/components/MainPage/LeftColumn";
import ContactsSection from "@/components/shared/ContactsSection";
import { Box, Typography } from "@mui/material";

export default function ShowAllPosts() {
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
          ></Box>
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
