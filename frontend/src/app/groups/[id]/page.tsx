/* eslint-disable react/no-unescaped-entities */
"use client";

import { fetchFromServer } from "@/lib/api";
import { ContactsProps, GroupProps } from "@/types/types";
import { Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import profileIcon from "../../../../public/icons/profile.svg";

import GroupAddInfo from "@/components/Group/GroupAddInfo";
import GroupCard from "@/components/Group/GroupCard";
import JoinGroupCard from "@/components/Group/JoinGroupCard";

export default function GroupPage() {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [members, setMembers] = useState<ContactsProps[]>([]);

  const [mainInfo, setMainInfo] = useState<GroupProps>();
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [isMember, setIsMember] = useState<boolean>(false);
  const pathname = usePathname().split("/").pop();
  const matchesLG = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetchFromServer(`/group/${pathname}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setMainInfo(data);

          setIsMember(data.includesMe === true);
        } else {
          throw new Error("Failed to fetch groups");
        }

        if (isMember) {
          const groupMembers = await fetchFromServer(
            `/group/${pathname}/members`,
            {
              credentials: "include",
            }
          );
          if (groupMembers.ok) {
            const membersData = await groupMembers.json();
            setMembers(membersData);
            console.log(membersData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    setTimeout(() => {
      fetchGroup();
    }, 100);
  }, [pathname, isMember]);

  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        flexDirection: matchesLG ? "row" : "column",
        justifyContent: "center",
        gap: "23px",
        position: "relative",
      }}
    >
      {mainInfo && (
        <>
          {isMember ? (
            <>
              <GroupCard
                matchesLG={matchesLG}
                openPostModal={openPostModal}
                members={members}
                setOpenPostModal={setOpenPostModal}
                groupTitle={mainInfo.title}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pathName={pathname}
                groupID={mainInfo.ID}
              />
              <GroupAddInfo
                matchesLG={matchesLG}
                isMember={isMember}
                description={mainInfo.description}
                profileIcon={profileIcon}
                owner={mainInfo.owner}
              />
            </>
          ) : (
            <>
              <JoinGroupCard
                matchesLG={matchesLG}
                groupTitle={mainInfo.title}
                id={mainInfo.ID}
                pendingRequest={mainInfo.pendingRequest}
              />
              <GroupAddInfo
                matchesLG={matchesLG}
                isMember={isMember}
                description={mainInfo.description}
                profileIcon={profileIcon}
                owner={mainInfo.owner}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
}
