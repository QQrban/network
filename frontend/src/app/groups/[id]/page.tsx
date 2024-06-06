/* eslint-disable react/no-unescaped-entities */
"use client";

import { Box } from "@mui/material";
import profileIcon from "../../../../public/icons/profile.svg";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchFromServer } from "@/lib/api";
import { ContactsProps, GroupProps } from "@/types/types";

import GroupCard from "@/components/Group/GroupCard";
import GroupAddInfo from "@/components/Group/GroupAddInfo";
import JoinGroupCard from "@/components/Group/JoinGroupCard";

export default function GroupPage() {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [members, setMembers] = useState<ContactsProps[]>([]);

  const [mainInfo, setMainInfo] = useState<GroupProps>();
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [isMember, setIsMember] = useState<boolean>(false);
  // /group/([0-9]+)/(join|accept|reject) - api to send join group request|accept|reject
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
    fetchGroup();
  }, [pathname, isMember]);

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
          {isMember ? (
            <>
              <GroupCard
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
                isMember={isMember}
                description={mainInfo.description}
                profileIcon={profileIcon}
                owner={mainInfo.owner}
              />
            </>
          ) : (
            <>
              <JoinGroupCard
                groupTitle={mainInfo.title}
                id={mainInfo.ID}
                pendingRequest={mainInfo.pendingRequest}
              />
              <GroupAddInfo
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
