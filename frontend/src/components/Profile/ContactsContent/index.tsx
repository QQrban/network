"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FollowersProps, followers, followings } from "./mock";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import confirmBtn from "../../../../public/icons/confirmButton.svg";

import FollowersSection from "@/components/shared/FollowersSection";
import { usePathname } from "next/navigation";
import { fetchFromServer } from "@/lib/api";

export default function ContactsContent() {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [peopleList, setPeopleList] = useState<FollowersProps[]>(followers);
  const [profileId, setProfileId] = useState<string>("");

  const pathname = usePathname().split("/").pop();

  useEffect(() => {
    if (pathname !== undefined) {
      setProfileId(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const getFollowers = async () => {
      if (profileId) {
        const response = await fetchFromServer(`/user/${profileId}/followers`);
        const data = await response.json();
        console.log(data);
      }
    };
    getFollowers();
  }, [profileId]);

  useEffect(() => {
    activeTab ? setPeopleList(followers) : setPeopleList(followings);
  }, [activeTab]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "26px",
        }}
      >
        <Box
          sx={{
            background: activeTab ? "#500606" : "",
            width: "160px",
          }}
        >
          <ConfirmBtn
            backgroundImage={confirmBtn.src}
            text="Followers"
            onClick={() => setActiveTab(true)}
          />
        </Box>
        <Box
          sx={{
            background: !activeTab ? "#500606" : "",
            width: "160px",
          }}
        >
          <ConfirmBtn
            backgroundImage={confirmBtn.src}
            text="Following"
            onClick={() => setActiveTab(false)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          gap: "29px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FollowersSection activeTab={activeTab} peopleList={peopleList} />
      </Box>
    </Box>
  );
}
