"use client";

import { useState } from "react";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import {
  FollowersProps,
  followers,
  followings,
  topContacts,
} from "@/components/Profile/ContactsContent/mock";
import FollowersSection from "@/components/shared/FollowersSection";

const StyledTab = styled(Tab)`
  font-family: Gloria Hallelujah, sans-serif;
  font-size: 18px;
`;

export default function Followers() {
  const [activeTab, setActiveTab] = useState<string>("Followers");
  const [peopleList, setPeopleList] = useState<FollowersProps[]>(followers);

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Followers") {
      setPeopleList(followers);
    } else if (tab === "Followings") {
      setPeopleList(followings);
    } else if (tab === "Favorite Contacts") {
      setPeopleList(topContacts);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="Followers tabs"
      >
        <StyledTab label="Followers" value="Followers" />
        <StyledTab label="Followings" value="Followings" />
        <StyledTab label="Favorite Contacts" value="Favorite Contacts" />
      </Tabs>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          p: "24px 0 0 210px",
          fontFamily: "SchoolBell !important",
        }}
      >
        {activeTab}
      </Typography>
      <Box
        sx={{
          padding: "30px 0 30px 120px",
          display: "flex",
          gap: "29px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FollowersSection activeTab={activeTab} peopleList={peopleList} />
      </Box>
    </Box>
  );
}
