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
import { PostProps } from "@/types/types";

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const [selectedTab, setSelectedTab] = useState<String>("Main Board");

  const dispatch = useDispatch();

  const pathname = usePathname().split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const getUser = await fetchFromServer(`/user/${pathname}`, {
          credentials: "include",
        });
        const userData = await getUser.json();

        dispatch(
          putProfile({
            id: userData.ID,
            about: userData.about,
            firstName: userData.firstName,
            lastName: userData.lastName,
            nickname: userData.nickname,
            private: userData.private,
            followInfo: {
              meToYou: userData.followInfo.meToYou,
              meToYouPending: userData.followInfo.meToYouPending,
              youToMePending: userData.followInfo.youToMePending,
            },
          })
        );

        // Fetch posts data after user data is fetched
        const response = await fetchFromServer(`/user/${pathname}/posts`, {
          credentials: "include",
        });
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [pathname, dispatch]);

  const renderContent = () => {
    switch (selectedTab) {
      case "Main Board":
        return <MainBoard posts={posts} setSelectedTab={setSelectedTab} />;
      case "Contacts":
        return <ContactsContent />;
      case "Photos":
        return (
          <PhotosContent setSelectedTab={setSelectedTab} isMainBoard={false} />
        );
      default:
        return <MainBoard posts={posts} setSelectedTab={setSelectedTab} />;
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
