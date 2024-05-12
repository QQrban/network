"use client";

import ContactsContent from "@/components/Profile/ContactsContent";
import PhotosContent from "@/components/Profile/PhotosContent";
import MainBoard from "@/components/Profile/MainBoard";
import ProfileCard from "@/components/Profile/ProfileCard";
import { Item } from "@/components/shared/Item";
import profileCardBg from "../../../../public/eventBG.svg";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { putProfile } from "@/redux/features/profile/profileSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const pathname = usePathname().slice(-1);

  useEffect(() => {
    async function fetchData() {
      try {
        const getUser = await fetchFromServer(`/user/${pathname}`);
        const userData = await getUser.json();
        dispatch(
          putProfile({
            id: userData.ID,
            about: userData.about,
            firstName: userData.firstName,
            lastName: userData.lastName,
            nickname: userData.nickname,
            private: userData.private,
          })
        );
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchData();
  }, [pathname, dispatch]);

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
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
            width: "1300px",
            m: "23px auto 0 auto",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
