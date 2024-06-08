"use client";

import ContactsContent from "@/components/Profile/ContactsContent";
import PhotosContent from "@/components/Profile/PhotosContent";
import MainBoard from "@/components/Profile/MainBoard";
import ProfileCard from "@/components/Profile/ProfileCard";
import { Item } from "@/components/shared/Item";
import profileCardBg from "../../../../public/eventBG.svg";

import { Box, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { putProfile } from "@/redux/features/profile/profileSlice";
import { PostProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/getCookie";
import { loginSuccess } from "@/redux/features/auth/authSlice";

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [profilePosts, setProfilePosts] = useState<PostProps[]>([]);
  const [selectedTab, setSelectedTab] = useState<String>("Main Board");
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const matchesXXL = useMediaQuery("(min-width:1454px)");
  const matchesXL = useMediaQuery("(min-width:1200px)");
  const matchesMD = useMediaQuery("(min-width:856px)");
  const matchesSM = useMediaQuery("(min-width:670px)");

  const dispatch = useDispatch();

  const router = useRouter();

  const id = useSelector((state: any) => state.authReducer.value.id);
  const pathname = usePathname().split("/").pop();

  const isYourProfile = id.toString() === pathname;

  const fetchAuthData = async () => {
    try {
      const cookieVal = await getCookie();
      if (cookieVal) {
        const response = await fetchFromServer("/check-auth", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(
            loginSuccess({
              id: data.ID,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              nickname: data.nickname,
              birthday: data.birthday,
              image: data.image,
              country: data.country,
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleSubmitAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await fetchFromServer("/user/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        fetchAuthData();
        fetchData();
      } else {
        throw new Error("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      handleSubmitAvatar(file);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const getUser = await fetchFromServer(`/user/${pathname}`, {
        credentials: "include",
      });
      if (!getUser.ok) {
        router.push(`/profile`);
        return;
      }

      const userData = await getUser.json();

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
  }, [dispatch, pathname, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setProfilePosts(posts);
  }, [posts]);

  const renderContent = () => {
    switch (selectedTab) {
      case "Main Board":
        return (
          <MainBoard
            setProfilePosts={setProfilePosts}
            isYourProfile={isYourProfile}
            pathname={pathname}
            profilePosts={profilePosts}
            setSelectedTab={setSelectedTab}
            hasAccess={hasAccess}
          />
        );
      case "Contacts":
        return <ContactsContent />;
      case "Photos":
        return (
          <PhotosContent
            posts={profilePosts}
            setSelectedTab={setSelectedTab}
            isMainBoard={false}
          />
        );
      default:
        return (
          <MainBoard
            setProfilePosts={setProfilePosts}
            isYourProfile={isYourProfile}
            pathname={pathname}
            profilePosts={profilePosts}
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
          width: matchesXXL ? "1250px" : "100%",
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
            handleAvatarChange={handleAvatarChange}
            hasAccess={hasAccess}
            setHasAccess={setHasAccess}
            isYourProfile={isYourProfile}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Item>
        <Box
          sx={{
            m: "23px auto 0 auto",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
