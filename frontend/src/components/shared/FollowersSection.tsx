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
import { useEffect, useState } from "react";
import AlertDialog from "./Dialog";
import ConfirmBtn from "./ConfirmBtn";
import { ContactsProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";
import Link from "next/link";

interface Props {
  activeTab: string;
  profileId: string | null;
}

export default function FollowersSection({ activeTab, profileId }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<ContactsProps[]>([]);
  const [followerName, setFollowerName] = useState<string>("");

  useEffect(() => {
    const getFollowers = async () => {
      if (profileId) {
        if (activeTab === "Followers") {
          const response = await fetchFromServer(
            `/user/${profileId}/followers`
          );
          const data = await response.json();
          console.log(data);

          setPeopleList(data);
        } else if (activeTab === "Following") {
          const response = await fetchFromServer(
            `/user/${profileId}/following`
          );
          const data = await response.json();
          setPeopleList(data);
        }
      }
    };
    getFollowers();
  }, [profileId, activeTab]);

  const unfollowHandler = (name: string) => {
    setOpen(true);
    setFollowerName(name);
  };

  return (
    <>
      {peopleList?.length ? (
        peopleList.map((follower, index) => (
          <Link href={`/profile/${follower.ID}`} key={index}>
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

                {/* {follower.following ? (
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
              )} */}
              </SpeedDial>
              <Box
                sx={{
                  width: "90px",
                  height: "90px",
                }}
              >
                <Image
                  src={follower.image ? follower.image : noPhoto}
                  alt={follower.firstName}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontWeight: 600, color: "#2a2a2a", fontSize: "20px" }}
                >
                  {follower.firstName} {follower.lastName}
                </Typography>
              </Box>
              {/* {follower.following ? (
              <ConfirmBtn
                onClick={() => unfollowHandler(follower.name)}
                backgroundImage={errorBtn.src}
                text="Unfollow"
              />
            ) : (
              <ConfirmBtn backgroundImage={successBtn.src} text="Follow" />
            )} */}
            </Item>
          </Link>
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
