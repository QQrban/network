"use client";

import { Box, Divider, Typography } from "@mui/material";
import ProfileAvatar from "./ProfileAvatar";
import React, { useEffect, useState } from "react";

const tabStyle = (isActive: boolean) => ({
  pb: "11px",
  borderBottom: isActive ? "3px solid #6495ED" : "none",
  fontFamily: "Schoolbell !important",
  fontSize: "19px",
  cursor: "pointer",
});

interface Props {
  selectedTab: String;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function ProfileCard({ setSelectedTab, selectedTab }: Props) {
  const [activeTab, setActiveTab] = useState<String>("Main Board");

  const handleTabClick = (tabName: String) => {
    setActiveTab(tabName);
    setSelectedTab(tabName);
  };

  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  const tabs = ["Main Board", "Contacts", "Photos"];

  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        mt: "23px",
      }}
    >
      <ProfileAvatar />
      <Typography
        sx={{
          fontSize: "42px",
          fontWeight: 600,
          color: "#2A2A2A",
          fontFamily: "Gloria Hallelujah",
        }}
        component="h2"
      >
        Kurban Ramazanov
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
