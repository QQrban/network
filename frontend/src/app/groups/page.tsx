"use client";

import Box from "@mui/material/Box";
import { Item } from "@/components/shared/Item";
import GroupItem from "@/components/Groups/GroupItem";
import { Typography } from "@mui/material";
import SearchBar from "@/components/Groups/SearchBar";
import SuggestionsGroups from "@/components/shared/SuggestionsGroups";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import successBtn from "../../../public/icons/successBtn.svg";
import { useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import CreateGroupModal from "@/components/Groups/CreateGroupModal";
import { GroupProps } from "@/types/types";

export default function Groups() {
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [createdGroup, setCreatedGroup] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontFamily: "Gloria Hallelujah" }}
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
          gap: "23px",
        }}
      >
        <Item
          sx={{
            width: "70%",
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
        <Box sx={{ width: "30%" }}>
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
