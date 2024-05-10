"use client";

import Box from "@mui/material/Box";
import { Item } from "@/components/shared/Item";
import GroupItem from "@/components/Groups/GroupItem";
import { Divider, Typography } from "@mui/material";
import SearchBar from "@/components/Groups/SearchBar";
import SuggestionsGroups from "@/components/shared/SuggestionsGroups";

export default function Groups() {
  const groups = true;

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "23px",
      }}
    >
      <Typography
        sx={{ fontFamily: "Gloria Hallelujah" }}
        component="h2"
        variant="h3"
      >
        Your Groups
      </Typography>
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
          sx={{ width: "70%", overflow: "hidden", pr: "10px" }}
          radius="8px"
        >
          <Box
            sx={{
              p: "16px 0 0 16px",
            }}
          ></Box>
          {groups ? (
            <>
              <GroupItem title="Ctrl + Alt + Delete Club" members={57982} />
              <Divider />
              <GroupItem title="Ctrl + Alt + Delete Club" members={57982} />
              <Divider />
              <GroupItem title="FOR JS!" members={8796} />
              <Divider />
              <GroupItem title="Python Maniacs" members={22901} />
            </>
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
    </Box>
  );
}
