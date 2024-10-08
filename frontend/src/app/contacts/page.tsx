"use client";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

import FollowersSection from "@/components/shared/SharedFollowers/FollowersSection";
import { useSelector } from "react-redux";

const StyledTab = styled(Tab)`
  font-family: Gloria Hallelujah, sans-serif;
  font-size: 18px;
`;

const StyledBox = styled(Box)`
  padding: 30px 0 30px 120px;
  display: flex;
  gap: 29px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledSmallBox = styled(Box)`
  padding: 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Followers() {
  const [activeTab, setActiveTab] = useState<string>("Followers");
  const profileId = useSelector((state: any) => state.authReducer.value.id);

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleActiveTab(newValue);
  };

  const matchesMD = useMediaQuery("(min-width:950px)");

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="Followers tabs"
        variant="scrollable"
        
      >
        <StyledTab label="Followers" value="Followers" />
        <StyledTab label="Followings" value="Following" />
        <StyledTab label="Requests" value="Requests" />
      </Tabs>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          p: matchesMD ? "24px 0 0 210px" : "0",
          textAlign: matchesMD ? "left" : "center",
          fontFamily: "SchoolBell !important",
        }}
      >
        {activeTab}
      </Typography>
      {matchesMD ? (
        <StyledBox>
          <FollowersSection activeTab={activeTab} profileId={profileId} />
        </StyledBox>
      ) : (
        <StyledSmallBox>
          <FollowersSection activeTab={activeTab} profileId={profileId} />
        </StyledSmallBox>
      )}
    </Box>
  );
}
