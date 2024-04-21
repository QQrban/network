"use client";

import Header from "@/components/Header";
import LeftColumnMainPage from "@/components/MainPage";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box component="main">
      <Header />
      <Box
        sx={{
          display: "flex",
          padding: "32px 29px 0 29px",
        }}
        component="section"
      >
        <LeftColumnMainPage />
      </Box>
    </Box>
  );
}
