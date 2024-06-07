"use client";

import LeftColumn from "@/components/MainPage/LeftColumn";
import MiddleColumn from "@/components/MainPage/MiddleColumn";
import RightColumn from "@/components/MainPage/RightColumn";

import { Box, useMediaQuery } from "@mui/material";

export default function Home() {
  const matchesXL = useMediaQuery("(min-width:1389px)");
  const matchesLG = useMediaQuery("(min-width:1143px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "32px 29px 0 29px",
        gap: "23px",
      }}
      component="section"
    >
      {matchesLG && (
        <Box
          sx={{
            height: "100vh",
            position: "sticky",
            top: "80px",
          }}
        >
          <LeftColumn />
          {!matchesXL && <RightColumn />}
        </Box>
      )}
      <Box>
        <MiddleColumn />
      </Box>
      {matchesXL && <RightColumn />}
    </Box>
  );
}
