"use client";

import { Box, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { FollowersProps, followers, followings } from "./mock";

import FollowersSection from "@/components/shared/FollowersSection";

export default function ContactsContent() {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [peopleList, setPeopleList] = useState<FollowersProps[]>(followers);

  useEffect(() => {
    activeTab ? setPeopleList(followers) : setPeopleList(followings);
  }, [activeTab]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "26px",
        }}
      >
        <Button
          onClick={() => setActiveTab(true)}
          variant={activeTab ? "contained" : "outlined"}
        >
          Followers
        </Button>
        <Button
          onClick={() => setActiveTab(false)}
          variant={!activeTab ? "contained" : "outlined"}
        >
          Following
        </Button>
      </Box>
      <Box
        sx={{
          mt: "23px",
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
