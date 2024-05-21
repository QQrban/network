"use client";

import { Box, Divider, Typography } from "@mui/material";
import ProfileAvatar from "./ProfileAvatar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import successBtn from "../../../../public/icons/successBtn.svg";
import errorBtn from "../../../../public/icons/errorBtn.svg";
import { fetchFromServer } from "@/lib/api";

const tabStyle = (isActive: boolean) => ({
  pb: "11px",
  borderBottom: isActive ? "3px solid #6495ED" : "none",
  fontFamily: "Schoolbell !important",
  fontSize: "19px",
  cursor: "pointer",
});

interface Props {
  isYourProfile: boolean;
  selectedTab: String;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function ProfileCard({
  setSelectedTab,
  selectedTab,
  isYourProfile,
}: Props) {
  const [activeTab, setActiveTab] = useState<String>("Main Board");
  const [buttonBg, setButtonBg] = useState<string>("");
  const [followValue, setFollowValue] = useState<string>("");

  const profile = useSelector((state: any) => state.profileReducer.value);

  const { meToYou, meToYouPending, youToMePending } = profile.followInfo;

  const handleTabClick = (tabName: String) => {
    setActiveTab(tabName);
    setSelectedTab(tabName);
  };

  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    if (meToYou) {
      setFollowValue("Unfollow");
      setButtonBg(errorBtn.src);
    } else if (meToYouPending) {
      setFollowValue("Pending");
    } else if (youToMePending) {
      setFollowValue("Accept Follow");
    } else {
      setFollowValue("Follow");
      setButtonBg(successBtn.src);
    }
  }, [meToYou, meToYouPending, youToMePending]);

  const tabs = ["Main Board", "Contacts", "Photos"];

  const requestValue: { [key: string]: string } = {
    Unfollow: "unfollow",
    Follow: "follow",
  };

  const followHandler = async () => {
    const action = requestValue[followValue];
    if (action) {
      const response = await fetchFromServer(`/user/${profile.id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        if (action === "follow") {
          setFollowValue("Unfollow");
          setButtonBg(errorBtn.src);
        } else if (action === "unfollow") {
          setFollowValue("Follow");
          setButtonBg(successBtn.src);
        }
      }
    } else {
      console.error("Invalid follow action");
    }
  };

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
        {profile.firstName} {profile.lastName}
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
      {!isYourProfile && (
        <Box
          sx={{
            width: "130px",
            position: "absolute",
            left: "20px",
            bottom: "60px",
          }}
        >
          <ConfirmBtn
            onClick={followHandler}
            text={followValue}
            backgroundImage={buttonBg}
          />
        </Box>
      )}
    </Box>
  );
}
