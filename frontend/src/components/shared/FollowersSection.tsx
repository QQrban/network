"use client";

import { Box, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import { FollowersProps } from "../Profile/ContactsContent/mock";
import { Item } from "./Item";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import noPhoto from "../../../public/icons/profile.svg";
import mail from "../../../public/icons/mail.svg";
import star from "../../../public/icons/star.svg";
import personAdd from "../../../public/icons/personAdd.svg";
import personRemove from "../../../public/icons/personRemove.svg";
import successBtn from "../../../public/icons/successBtn.svg";
import errorBtn from "../../../public/icons/errorBtn.svg";
import { useState } from "react";
import AlertDialog from "./Dialog";
import ConfirmBtn from "./ConfirmBtn";

interface Props {
  peopleList: FollowersProps[];
  activeTab: string | boolean;
}

export default function FollowersSection({ peopleList, activeTab }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [followerName, setFollowerName] = useState<string>("");

  const unfollowHandler = (name: string) => {
    setOpen(true);
    setFollowerName(name);
  };

  return (
    <>
      {peopleList?.length ? (
        peopleList.map((follower, index) => (
          <Item
            sx={{
              width: "225px",
              p: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
            key={index}
            radius="12px"
          >
            <SpeedDial
              sx={{
                position: "absolute",
                top: "6px",
                right: "-2px",
              }}
              ariaLabel="SpeedDial openIcon example"
              icon={<MoreVertIcon sx={{ color: "grey" }} />}
              direction="down"
              FabProps={{
                sx: {
                  backgroundColor: "white",
                  width: "36px",
                  height: "32px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#00000014",
                  },
                  "&:active": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                },
              }}
            >
              <SpeedDialAction
                icon={
                  <Image
                    style={{ width: "25px", height: "25px" }}
                    src={mail}
                    alt="mail"
                  />
                }
                tooltipTitle={
                  <Typography
                    sx={{
                      fontFamily: "SchoolBell !important",
                      fontSize: "18",
                    }}
                  >
                    Send Email
                  </Typography>
                }
              />
              <SpeedDialAction
                icon={
                  <Image
                    style={{ width: "25px", height: "25px" }}
                    src={star}
                    alt="favorite"
                  />
                }
                tooltipTitle={
                  <Typography
                    sx={{
                      fontFamily: "SchoolBell !important",
                      fontSize: "18",
                    }}
                  >
                    Favorite
                  </Typography>
                }
              />
              {follower.following ? (
                <SpeedDialAction
                  onClick={() => unfollowHandler(follower.name)}
                  icon={
                    <Image
                      style={{ width: "25px", height: "25px" }}
                      src={personRemove}
                      alt="unfollow"
                    />
                  }
                  tooltipTitle={
                    <Typography
                      sx={{
                        fontFamily: "SchoolBell !important",
                        fontSize: "18px",
                      }}
                    >
                      Unfollow
                    </Typography>
                  }
                />
              ) : (
                <SpeedDialAction
                  icon={
                    <Image
                      style={{ width: "25px", height: "25px" }}
                      src={personAdd}
                      alt="follow"
                    />
                  }
                  tooltipTitle={
                    <Typography
                      sx={{
                        fontFamily: "SchoolBell !important",
                        fontSize: "18",
                      }}
                    >
                      Follow
                    </Typography>
                  }
                />
              )}
            </SpeedDial>
            <Box
              sx={{
                width: "90px",
                height: "90px",
              }}
            >
              <Image
                src={follower.avatar ? follower.avatar : noPhoto}
                alt={follower.name}
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontWeight: 600, color: "#2a2a2a", fontSize: "20px" }}
              >
                {follower.name.length > 20
                  ? follower.name.slice(0, 19) + "..."
                  : follower.name}
              </Typography>
            </Box>
            {follower.following ? (
              <ConfirmBtn
                onClick={() => unfollowHandler(follower.name)}
                backgroundImage={errorBtn.src}
                text="Unfollow"
              />
            ) : (
              <ConfirmBtn backgroundImage={successBtn.src} text="Follow" />
            )}
          </Item>
        ))
      ) : (
        <Typography sx={{ fontSize: "30px" }}>No {activeTab} Yet!</Typography>
      )}
      <AlertDialog
        title={`Unfollow ${followerName}`}
        dialogText="Are you sure you want to unfollow?"
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
