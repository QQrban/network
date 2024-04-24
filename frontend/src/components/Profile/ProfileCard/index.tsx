"use client";

import { Box, Divider, Typography } from "@mui/material";
import ProfileBackground from "./ProfileBackground";
import ProfileAvatar from "./ProfileAvatar";
import React, { useState } from "react";

const tabStyle = (isActive: boolean) => ({
  pb: "11px",
  borderBottom: isActive ? "3px solid #6495ED" : "none",
  cursor: "pointer",
});

interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function ProfileCard({ setSelectedTab }: Props) {
  const [activeTab, setActiveTab] = useState<String>("Posts");

  const handleTabClick = (tabName: String) => {
    setActiveTab(tabName);
    setSelectedTab(tabName);
  };

  const tabs = ["Posts", "Bio", "Contacts", "Photos"];

  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
      }}
    >
      <ProfileBackground />
      <ProfileAvatar />
      <Typography
        sx={{
          fontSize: "32px",
          mt: "85px",
          fontWeight: 600,
          color: "#2A2A2A",
        }}
        component="h2"
      >
        Kurban Ramazanov
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#959595",
        }}
        component="h2"
      >
        Frontend (React, Next.js) developer
      </Typography>
      <Divider sx={{ mt: "11px" }} />
      <Box
        sx={{
          textAlign: "left",
          p: "11px 20px 0 20px",
          display: "flex",
          gap: "30px",
        }}
      >
        {tabs.map((tab) => (
          <Typography
            key={tab}
            sx={tabStyle(tab === activeTab)}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
