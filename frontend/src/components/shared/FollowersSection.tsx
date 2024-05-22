"use client";

import { Box, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import { Item } from "./Item";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import noPhoto from "../../../public/icons/profile.svg";
import mail from "../../../public/icons/mail.svg";
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
import { useSelector } from "react-redux";

interface Props {
  activeTab: string;
  profileId: string | null;
}

export default function FollowersSection({ activeTab, profileId }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<ContactsProps[]>([]);
  const [followerName, setFollowerName] = useState<string>("");
  const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);
  // "/user/([0-9]+)/accept"
  // "/user/([0-9]+)/reject"
  const [followRequest, setFollowRequests] = useState<ContactsProps[]>([]);

  const id = useSelector((state: any) => state.authReducer.value.id);

  useEffect(() => {
    const getFollowers = async () => {
      if (profileId) {
        const endpoint = activeTab === "Followers" ? "followers" : "following";
        const response = await fetchFromServer(
          `/user/${profileId}/${endpoint}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (activeTab === "Followers" || activeTab === "Following") {
          setPeopleList(
            data.filter((item: any) => !item.followInfo.youToMePending)
          );
        } else if (activeTab === "Requests") {
          setFollowRequests(
            data.filter((item: any) => item.followInfo.youToMePending)
          );
        }
      }
    };
    getFollowers();
  }, [profileId, activeTab]);

  const unfollowHandler = async (
    event: React.MouseEvent,
    name: string,
    userID: number
  ) => {
    event.preventDefault();
    setOpen(true);
    setFollowerName(name);
    setUserToUnfollow(userID);
  };

  const confirmUnfollow = async () => {
    if (profileId && userToUnfollow !== null) {
      try {
        const response = await fetchFromServer(
          `/user/${userToUnfollow}/unfollow`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setPeopleList((prevList) =>
            prevList.map((person) =>
              person.ID === userToUnfollow
                ? {
                    ...person,
                    followInfo: {
                      ...person.followInfo,
                      meToYou: false,
                    },
                  }
                : person
            )
          );
        }
      } catch (error) {
        console.error("Error unfollowing user:", error);
      }
      setOpen(false);
      setFollowerName("");
      setUserToUnfollow(null);
    }
  };

  const follow = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/follow`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setPeopleList((prevList) =>
          prevList.map((person) =>
            person.ID === userID
              ? {
                  ...person,
                  followInfo: {
                    ...person.followInfo,
                    meToYou: true,
                  },
                }
              : person
          )
        );
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const confirmFollowRequest = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/accept`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setFollowRequests((prevList) =>
          prevList.filter((person) => person.ID !== userID)
        );
      }
    } catch (error) {
      console.error("Error accepting follow from user:", error);
    }
  };

  // const confirmFollowRequest = async (userID: number) => {
  //   try {
  //     const response = await fetchFromServer(`/user/${userID}/accept`, {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       setFollowRequests((prevList) =>
  //         prevList.map((person) =>
  //           person.ID === userID
  //             ? {
  //                 ...person,
  //                 followInfo: {
  //                   ...person.followInfo,
  //                   youToMePending: false,
  //                 },
  //               }
  //             : person
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error accepting follow from user:", error);
  //   }
  // };

  const denyFollowRequest = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/reject`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setFollowRequests((prevList) =>
          prevList.filter((person) => person.ID !== userID)
        );
      }
    } catch (error) {
      console.error("Error rejecting follow from user:", error);
    }
  };

  // const denyFollowRequest = async (userID: number) => {
  //   try {
  //     const response = await fetchFromServer(`/user/${userID}/reject`, {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       setFollowRequests((prevList) =>
  //         prevList.map((person) =>
  //           person.ID === userID
  //             ? {
  //                 ...person,
  //                 followInfo: {
  //                   ...person.followInfo,
  //                   youToMePending: false,
  //                 },
  //               }
  //             : person
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error accepting follow from user:", error);
  //   }
  // };

  return (
    <>
      {activeTab === "Requests" ? (
        <Box>
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

                    {request.followInfo.meToYou ? (
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
                    }}
                  >
                    <Image
                      src={request.image ? request.image : noPhoto}
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
            <Typography sx={{ fontSize: "30px" }}>
              No {activeTab} Yet!
            </Typography>
          )}
        </Box>
      ) : (
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

                    {follower.followInfo.meToYou ? (
                      <SpeedDialAction
                        onClick={(event) =>
                          unfollowHandler(
                            event,
                            follower.firstName,
                            follower.ID
                          )
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
                    }}
                  >
                    <Image
                      src={follower.image ? follower.image : noPhoto}
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
                  follower.followInfo.meToYou ? (
                    <ConfirmBtn
                      onClick={(event) =>
                        unfollowHandler(event, follower.firstName, follower.ID)
                      }
                      backgroundImage={errorBtn.src}
                      text="Unfollow"
                    />
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
            <Typography sx={{ fontSize: "30px" }}>
              No {activeTab} Yet!
            </Typography>
          )}
        </>
      )}
      <AlertDialog
        title={`Unfollow ${followerName}`}
        dialogText="Are you sure you want to unfollow?"
        open={open}
        setOpen={setOpen}
        onConfirm={confirmUnfollow}
      />
    </>
  );
}
