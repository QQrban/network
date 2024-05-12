"use client";

import ContactsContent from "@/components/Profile/ContactsContent";
import PhotosContent from "@/components/Profile/PhotosContent";
import MainBoard from "@/components/Profile/MainBoard";
import ProfileCard from "@/components/Profile/ProfileCard";
import { Item } from "@/components/shared/Item";
import profileCardBg from "../../../../public/eventBG.svg";

import { Box } from "@mui/material";
import { useState } from "react";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState<String>("Main Board");

  const renderContent = () => {
    switch (selectedTab) {
      case "Main Board":
        return <MainBoard setSelectedTab={setSelectedTab} />;
      case "Contacts":
        return <ContactsContent />;
      case "Photos":
        return (
          <PhotosContent setSelectedTab={setSelectedTab} isMainBoard={false} />
        );
      default:
        return <MainBoard setSelectedTab={setSelectedTab} />;
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          p: "19px 28px",
        }}
      >
        <Item
          sx={{
            overflow: "hidden",
            backgroundImage: `url(${profileCardBg.src})`,
            backgroundPosition: "center",
          }}
          radius="8px"
        >
          <ProfileCard
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Item>
        <Box
          sx={{
            mt: "25px",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
