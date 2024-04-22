"use client";

import BioContent from "@/components/Profile/BioContent";
import ContactsContent from "@/components/Profile/ContactsContent";
import PhotosContent from "@/components/Profile/PhotosContent";
import PostsContent from "@/components/Profile/PostsContent";
import ProfileCard from "@/components/Profile/ProfileCard";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";
import { useState } from "react";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState<String>("Posts");

  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return <PostsContent />;
      case "Bio":
        return <BioContent />;
      case "Contacts":
        return <ContactsContent />;
      case "Photos":
        return <PhotosContent />;
      default:
        return <PostsContent />;
    }
  };

  return (
    <>
      <Box
        sx={{
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
