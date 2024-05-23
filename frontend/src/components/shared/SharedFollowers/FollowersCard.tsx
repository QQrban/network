"use client";

import { Box, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import { Item } from "../Item";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import noPhoto from "../../../../public/icons/profile.svg";
import mail from "../../../../public/icons/mail.svg";
import personAdd from "../../../../public/icons/personAdd.svg";
import personRemove from "../../../../public/icons/personRemove.svg";
import successBtn from "../../../../public/icons/successBtn.svg";
import errorBtn from "../../../../public/icons/errorBtn.svg";
import ConfirmBtn from "../ConfirmBtn";
import { ContactsProps } from "@/types/types";
import Link from "next/link";

interface Props {
  peopleList: ContactsProps[];
  setFollowRequests: Function;
  followRequest: ContactsProps[];
  activeTab: string;
  id: any;
  unfollowHandler: Function;
  follow: Function;
}

export default function FollowersCard({
  peopleList,
  setFollowRequests,
  followRequest,
  activeTab,
  id,
  unfollowHandler,
  follow,
}: Props) {
  console.log(peopleList);

  return (
    <>
      {peopleList?.length ? (
        peopleList.map((follower, index) => (
          <Item
            key={index}
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
            {id !== follower.ID && (
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
                        fontSize: "18px",
                      }}
                    >
                      Send Email
                    </Typography>
                  }
                />

                {follower.followInfo?.meToYou ? (
                  <SpeedDialAction
                    onClick={(event) =>
                      unfollowHandler(event, follower.firstName, follower.ID)
                    }
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
                    onClick={() => follow(follower.ID)}
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
                          fontSize: "18px",
                        }}
                      >
                        Follow
                      </Typography>
                    }
                  />
                )}
              </SpeedDial>
            )}
            <Link href={`/profile/${follower.ID}`}>
              <Box
                sx={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={
                    follower.image
                      ? `http://localhost:8888/file/${follower.image}`
                      : noPhoto
                  }
                  alt={follower.firstName}
                  width={90}
                  height={90}
                />
              </Box>
            </Link>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontWeight: 600, color: "#2a2a2a", fontSize: "20px" }}
              >
                {follower.firstName} {follower.lastName}
              </Typography>
            </Box>
            {id !== follower.ID ? (
              follower.followInfo?.meToYou ? (
                <ConfirmBtn
                  onClick={(event) =>
                    unfollowHandler(event, follower.firstName, follower.ID)
                  }
                  backgroundImage={errorBtn.src}
                  text="Unfollow"
                />
              ) : follower.followInfo?.meToYouPending ? (
                <ConfirmBtn backgroundImage={successBtn.src} text="Pending" />
              ) : (
                <ConfirmBtn
                  onClick={() => follow(follower.ID)}
                  backgroundImage={successBtn.src}
                  text="Follow"
                />
              )
            ) : (
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: "SchoolBell !important",
                  color: "crimson",
                }}
              >
                {"( YOU )"}
              </Typography>
            )}
          </Item>
        ))
      ) : (
        <Typography sx={{ fontSize: "30px" }}>No {activeTab} Yet!</Typography>
      )}
    </>
  );
}
