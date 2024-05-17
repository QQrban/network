"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import Link from "next/link";
import leaveIcon from "../../../public/icons/leave.svg";
import noPhoto from "../../../public/icons/profile.svg";
import { MouseEventHandler, useState } from "react";
import AlertDialog from "../shared/Dialog";

interface GroupItemProps {
  title: string;
  members?: number;
  groupId: number;
}

export default function GroupItem({ title, members, groupId }: GroupItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  const leaveGroup: MouseEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Link href={`/groups/${groupId}`}>
        <List
          sx={{
            cursor: "pointer",
            position: "relative",
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
            p: "10px",
            "&:hover": { bgcolor: "#f3f3f3" },
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Image src={noPhoto} alt="profile" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: "28px",
                    fontFamily: "Schoolbell !important",
                    textTransform: "capitalize",
                  }}
                >
                  {title}
                </Typography>
              }
            />
          </ListItem>
          <SpeedDial
            onClick={(e) => e.preventDefault()}
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
            <SpeedDialAction
              onClick={leaveGroup}
              tooltipTitle={
                <Typography
                  sx={{
                    fontFamily: "Schoolbell !important",
                  }}
                >
                  Leave Group
                </Typography>
              }
              icon={
                <Image
                  style={{ width: "25px", height: "25px" }}
                  src={leaveIcon}
                  alt="leave"
                />
              }
            />
          </SpeedDial>
        </List>
      </Link>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title={title}
        dialogText="Are you sure that you want to leave this group?"
      />
    </>
  );
}
