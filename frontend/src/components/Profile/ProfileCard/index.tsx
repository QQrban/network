"use client";

import {
  Box,
  Divider,
  SpeedDial,
  SpeedDialAction,
  Typography,
} from "@mui/material";
import ProfileAvatar from "./ProfileAvatar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import successBtn from "../../../../public/icons/successBtn.svg";
import errorBtn from "../../../../public/icons/errorBtn.svg";
import lockedIcon from "../../../../public/icons/locked.svg";
import unlockedIcon from "../../../../public/icons/unlocked.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { fetchFromServer } from "@/lib/api";
import Image from "next/image";

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
  hasAccess: boolean;
  setHasAccess: React.Dispatch<boolean>;
}

export default function ProfileCard({
  setSelectedTab,
  selectedTab,
  isYourProfile,
  hasAccess,
  setHasAccess,
}: Props) {
  const [activeTab, setActiveTab] = useState<String>("Main Board");
  const [privateProfile, setPrivateProfile] = useState<boolean | null>(null);
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
      setButtonBg(successBtn.src);
    } else {
      setFollowValue("Follow");
      setButtonBg(successBtn.src);
    }
  }, [meToYou, meToYouPending, youToMePending]);

  useEffect(() => {
    setPrivateProfile(profile.private);
  }, [profile.private]);

  const tabs = ["Main Board", "Contacts", "Photos"];

  const requestValue: { [key: string]: string } = {
    Unfollow: "unfollow",
    Pending: "pending",
    Follow: "follow",
  };

  const followHandler = async () => {
    const action = requestValue[followValue];

    try {
      const response =
        action !== "pending" &&
        (await fetchFromServer(`/user/${profile.id}/${action}`, {
          method: "POST",
          credentials: "include",
        }));
      if (response.ok) {
        if (action === "follow") {
          if (hasAccess && !privateProfile) {
            setFollowValue("Unfollow");
            setButtonBg(errorBtn.src);
          } else {
            setFollowValue("Pending");
            setButtonBg(successBtn.src);
          }
        } else if (action === "unfollow") {
          setFollowValue("Follow");
          setSelectedTab("Main Board");
          setButtonBg(successBtn.src);
          if (privateProfile) {
            setHasAccess(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const privacyHandler = async () => {
    try {
      const response = await fetchFromServer(`/user/status`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) setPrivateProfile(!privateProfile);
    } catch (error) {
      console.error(error);
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
      {isYourProfile && (
        <SpeedDial
          sx={{
            position: "absolute",
            top: "-10px",
            right: "12px",
          }}
          ariaLabel="SpeedDial openIcon example"
          icon={<MoreHorizIcon fontSize="large" sx={{ color: "grey" }} />}
          direction="down"
          FabProps={{
            sx: {
              backgroundColor: "white",
              width: "36px",
              height: "32px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#00000014",
              },
              "&:active": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "&:focus": {
                outline: "none",
              },
            },
          }}
        >
          <SpeedDialAction
            onClick={privacyHandler}
            icon={
              <Image
                width={30}
                height={30}
                src={privateProfile ? unlockedIcon : lockedIcon}
                alt="private"
              />
            }
            tooltipTitle={
              <Typography
                sx={{
                  fontSize: "19px",
                }}
              >
                Make Profile {privateProfile ? "Public" : "Private"}
              </Typography>
            }
          />
        </SpeedDial>
      )}
      <ProfileAvatar isYourProfile={isYourProfile} avatar={profile.image} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          mb: "23px",
        }}
      >
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
        {!isYourProfile && (
          <Box
            sx={{
              width: "130px",
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

      {!privateProfile || isYourProfile || hasAccess ? (
        <>
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
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
