"use client";

import CreateGroupModal from "@/components/Groups/CreateGroupModal";
import GroupItem from "@/components/Groups/GroupItem";
import SearchBar from "@/components/Groups/SearchBar";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import { Item } from "@/components/shared/Item";
import SuggestionsGroups from "@/components/shared/SuggestionsGroups";
import { fetchFromServer } from "@/lib/api";
import { GroupProps } from "@/types/types";
import { Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import successBtn from "../../../public/icons/successBtn.svg";

export default function Groups() {
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [createdGroup, setCreatedGroup] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const matchesMD = useMediaQuery("(min-width:950px)");
  const matchesSM = useMediaQuery("(min-width:750px)");

  const fetchGroups = async () => {
    try {
      const response = await fetchFromServer("/groups/my", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
        console.log(data);
      } else {
        throw new Error("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  const leaveGroup = async (groupID: number) => {
    try {
      const response = await fetchFromServer(`/group/${groupID}/leave`, {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchGroups();
    }, 500);
  }, []);

  useEffect(() => {
    if (createdGroup) {
      fetchGroups();
      setCreatedGroup(false);
    }
  }, [createdGroup]);

  if (!groups) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "23px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: matchesSM ? "center" : "left",
          flexDirection: matchesSM ? "row" : "column",
          gap: matchesSM ? "0px" : "23px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Gloria Hallelujah",
            fontSize: matchesSM ? "48px" : "30px",
          }}
          component="h2"
          variant="h3"
        >
          Your Groups
        </Typography>
        <Box
          sx={{
            width: "190px",
            "&:hover": {
              backgroundColor: "dodgerblue",
            },
          }}
        >
          <ConfirmBtn
            onClick={() => setOpen(true)}
            backgroundImage={successBtn.src}
            text="Create Group"
          />
        </Box>
      </Box>
      <Box>
        <SearchBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: matchesMD ? "row" : "column",
          gap: "23px",
        }}
      >
        <Item
          sx={{
            width: matchesMD ? "70%" : "100%",
            overflow: "hidden",
            alignSelf: "flex-start",
          }}
          radius="8px"
        >
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupItem
                leaveGroup={leaveGroup}
                ownerID={group.owner.ID}
                key={group.ID}
                groupId={group.ID}
                title={group.title}
                pendingRequest={group.pendingRequest}
              />
            ))
          ) : (
            <Typography
              sx={{
                p: "23px",
                fontSize: "35px",
                fontFamily: "Schoolbell !important",
              }}
            >
              You are not a member of any group! Use the search to find groups
              that may interest you.
            </Typography>
          )}
        </Item>
        <Box sx={{ width: matchesMD ? "30%" : "100%" }}>
          <SuggestionsGroups />
        </Box>
      </Box>
      <CreateGroupModal
        setCreatedGroup={setCreatedGroup}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}
