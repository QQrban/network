"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FollowersProps, followers, followings } from "./mock";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import confirmBtn from "../../../../public/icons/confirmButton.svg";

import FollowersSection from "@/components/shared/FollowersSection";

export default function ContactsContent() {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [peopleList, setPeopleList] = useState<FollowersProps[]>(followers);

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
