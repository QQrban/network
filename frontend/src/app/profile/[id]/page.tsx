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
import { useDispatch, useSelector } from "react-redux";
import { putProfile } from "@/redux/features/profile/profileSlice";
import { PostProps } from "@/types/types";

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [selectedTab, setSelectedTab] = useState<String>("Main Board");
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const dispatch = useDispatch();

  const id = useSelector((state: any) => state.authReducer.value.id);
  const pathname = usePathname().split("/").pop();

  const isYourProfile = id.toString() === pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUser = await fetchFromServer(`/user/${pathname}`, {
          credentials: "include",
        });
        const userData = await getUser.json();
        console.log(userData);

        dispatch(
          putProfile({
            id: userData.ID,
            about: userData.about,
            access: userData.access,
            firstName: userData.firstName,
            lastName: userData.lastName,
            nickname: userData.nickname,
            private: userData.private,
            image: userData.image,
            followInfo: {
              meToYou: userData.followInfo.meToYou,
              meToYouPending: userData.followInfo.meToYouPending,
              youToMePending: userData.followInfo.youToMePending,
            },
          })
        );
        setHasAccess(userData.access);
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
        return (
          <MainBoard
            isYourProfile={isYourProfile}
            pathname={pathname}
            posts={posts}
            setSelectedTab={setSelectedTab}
            hasAccess={hasAccess}
          />
        );
      case "Contacts":
        return <ContactsContent />;
      case "Photos":
        return (
          <PhotosContent
            posts={posts}
            setSelectedTab={setSelectedTab}
            isMainBoard={false}
          />
        );
      default:
        return (
          <MainBoard
            isYourProfile={isYourProfile}
            pathname={pathname}
            posts={posts}
            setSelectedTab={setSelectedTab}
            hasAccess={hasAccess}
          />
        );
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          p: "19px 28px",
          width: "1250px",
          m: "0 auto",
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
            hasAccess={hasAccess}
            setHasAccess={setHasAccess}
            isYourProfile={isYourProfile}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Item>
        <Box
          sx={{
            mt: "25px",
            m: "23px auto 0 auto",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
