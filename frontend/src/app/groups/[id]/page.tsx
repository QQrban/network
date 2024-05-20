/* eslint-disable react/no-unescaped-entities */
"use client";

import { Box } from "@mui/material";
import profileIcon from "../../../../public/icons/profile.svg";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchFromServer } from "@/lib/api";
import { GroupProps } from "@/types/types";
import GroupCard from "@/components/Group/GroupCard";
import GroupAddInfo from "@/components/Group/GroupAddInfo";
import CreatePostModal from "@/components/Group/CreatePostModal";

export default function GroupPage() {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [membersNumber, setMembersNumber] = useState<number>(0);

  const [mainInfo, setMainInfo] = useState<GroupProps>();
  const [activeTab, setActiveTab] = useState<string>("posts");

  const pathname = usePathname().split("/").pop();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetchFromServer(`/group/${pathname}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setMainInfo(data);
        } else {
          throw new Error("Failed to fetch groups");
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    fetchGroup();
    const fetchMembers = async () => {
      try {
        const response = await fetchFromServer(`/group/${pathname}/members`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setMembersNumber(data.length);
        } else {
          throw new Error("Failed to fetch groups");
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    fetchMembers();
  }, [pathname]);

  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        justifyContent: "center",
        gap: "23px",
        position: "relative",
      }}
    >
      {mainInfo && (
        <>
          <GroupCard
            members={membersNumber}
            setOpenPostModal={setOpenPostModal}
            groupTitle={mainInfo.title}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <GroupAddInfo
            description={mainInfo.description}
            ownerID={mainInfo.ownerID}
            profileIcon={profileIcon}
            ownerName={mainInfo.ownerName}
          />
        </>
      )}
      <CreatePostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </Box>
  );
}
