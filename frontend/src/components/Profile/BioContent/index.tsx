"use client";

import { Item } from "@/components/shared/Item";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";

const tabStyle = (isActive: boolean) => ({
  color: isActive ? "#6495ED" : "none",
  cursor: "pointer",
});

const tabs = [
  "Overview",
  "Education",
  "Experience",
  "Contact Info",
  "Details",
  "Life Events",
];

export default function BioContent() {
  const [activeTab, setActiveTab] = useState<String>("Overview");
  const handleTabClick = (tabName: String) => {
    setActiveTab(tabName);
  };

  return (
    <Item
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      radius="8px"
    >
      <Box
        sx={{
          borderRight: "2px solid #0000001b",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            p: "11px 20px",

            fontSize: "19px",
            color: "#2a2a2a",
          }}
        >
          Biography
        </Typography>
        <Divider />
        <Box
          sx={{
            p: "11px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {" "}
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
      <Box
        sx={{
          pl: "20px",
        }}
      >
        asd
      </Box>
    </Item>
  );
}
