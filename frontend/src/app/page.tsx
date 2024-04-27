"use client";

import LeftColumn from "@/components/MainPage/LeftColumn";
import MiddleColumn from "@/components/MainPage/MiddleColumn";
import RightColumn from "@/components/MainPage/RightColumn";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "32px 29px 0 29px",
        gap: "23px",
      }}
      component="section"
    >
      <LeftColumn />
      <MiddleColumn />
      <RightColumn />
    </Box>
  );
}
