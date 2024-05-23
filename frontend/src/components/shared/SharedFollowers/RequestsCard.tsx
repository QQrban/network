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
import { fetchFromServer } from "@/lib/api";
import Link from "next/link";

interface Props {
  activeTab: string;
  setFollowRequests: Function;
  followRequest: ContactsProps[];
  id: any;
  unfollowHandler: Function;
  follow: Function;
}

export default function RequestsCard({
  activeTab,
  setFollowRequests,
  followRequest,
  id,
  unfollowHandler,
  follow,
}: Props) {
  const confirmFollowRequest = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/accept`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setFollowRequests((prevList: any[]) =>
          prevList.filter((person) => person.ID !== userID)
        );
      }
    } catch (error) {
      console.error("Error accepting follow from user:", error);
    }
  };

  const denyFollowRequest = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/reject`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setFollowRequests((prevList: any[]) =>
          prevList.filter((person) => person.ID !== userID)
        );
      }
    } catch (error) {
      console.error("Error rejecting follow from user:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "23px", flexWrap: "wrap" }}>
      {followRequest.length > 0 ? (
        followRequest.map((request, index) => (
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
            {id !== request.ID && (
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

                {request.followInfo?.meToYou ? (
                  <SpeedDialAction
                    onClick={(event) =>
                      unfollowHandler(event, request.firstName, request.ID)
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
                    onClick={() => follow(request.ID)}
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

            <Link href={`/profile/${request.ID}`}>
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
                    request.image
                      ? `http://localhost:8888/file/${request.image}`
                      : noPhoto
                  }
                  alt={request.firstName}
                  width={90}
                  height={90}
                />
              </Box>
            </Link>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#2a2a2a",
                  fontSize: "20px",
                }}
              >
                {request.firstName} {request.lastName}
              </Typography>
            </Box>
            <ConfirmBtn
              onClick={() => confirmFollowRequest(request.ID)}
              backgroundImage={successBtn.src}
              text="Accept"
            />
            <ConfirmBtn
              onClick={() => denyFollowRequest(request.ID)}
              backgroundImage={errorBtn.src}
              text="Deny"
            />
          </Item>
        ))
      ) : (
        <Typography sx={{ fontSize: "30px" }}>No {activeTab} Yet!</Typography>
      )}
    </Box>
  );
}
