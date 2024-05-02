"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import Link from "next/link";

interface GroupItemProps {
  title: string;
  members: number;
  iconLabel: string;
  icon: React.ElementType;
}

export default function GroupItem({
  title,
  members,
  iconLabel,
  icon: Icon,
}: GroupItemProps) {
  return (
    <Link href="/groups/1">
      <List
        sx={{
          cursor: "pointer",
          position: "relative",
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
          p: "6px",
          "&:hover": { bgcolor: "#f3f3f3" },
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Image src="" alt="" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} secondary={`${members} members`} />
        </ListItem>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          icon={<MoreVertIcon sx={{ color: "white" }} />}
          direction="left"
          FabProps={{
            sx: {
              backgroundColor: "#6495ED",
              width: "36px",
              height: "32px",
              boxShadow: "none",
              "&:hover": {},
              "&:active": { boxShadow: "none" },
              "&:focus": { outline: "none" },
            },
          }}
        >
          <SpeedDialAction tooltipTitle={iconLabel} icon={<Icon />} />
        </SpeedDial>
      </List>
    </Link>
  );
}
