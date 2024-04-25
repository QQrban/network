"use client";

import BioContent from "@/components/Profile/BioContent";
import ContactsContent from "@/components/Profile/ContactsContent";
import PhotosContent from "@/components/Profile/PhotosContent";
import MainBoard from "@/components/Profile/MainBoard";
import ProfileCard from "@/components/Profile/ProfileCard";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";
import { useState } from "react";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState<String>("Posts");

  const renderContent = () => {
    switch (selectedTab) {
      case "Main Board":
        return <MainBoard />;
      case "Biography":
        return <BioContent />;
      case "Contacts":
        return <ContactsContent />;
      case "Photos":
        return <PhotosContent />;
      default:
        return <MainBoard />;
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          p: "19px 28px",
        }}
      >
        <Item
          sx={{
            overflow: "hidden",
          }}
          radius="8px"
        >
          <ProfileCard setSelectedTab={setSelectedTab} />
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
