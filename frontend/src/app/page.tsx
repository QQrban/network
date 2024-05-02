"use client";

import LeftColumn from "@/components/MainPage/LeftColumn";
import MiddleColumn from "@/components/MainPage/MiddleColumn";
import ContactsSection from "@/components/shared/ContactsSection";
import RightColumn from "@/components/shared/SuggestionsGroups";
import { Box, Typography } from "@mui/material";

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
      <Box
        sx={{
          position: "sticky",
          top: "90px",
          height: "900px",
        }}
      >
        <RightColumn />
        <Box sx={{ mt: "23px" }}>
          <Typography sx={{ color: "#2a2a2a" }} variant="h5">
            Contacts
          </Typography>
          <Box sx={{ mt: "8px" }}>
            <ContactsSection />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
