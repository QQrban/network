"use client";

import { Item } from "../shared/Item";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import eventBg from "../../../public/eventBG.svg";
import Link from "next/link";
import { NotificationProps } from "@/types/types";
import like from "../../../public/icons/give-love.svg";
import event from "../../../public/icons/calendar.svg";
import follow from "../../../public/icons/profile.svg";
import followReq from "../../../public/icons/personAdd.svg";
import followAcc from "../../../public/icons/contacts.svg";
import { fetchFromServer } from "@/lib/api";
import { boolean } from "yup";

interface NotificationSectionProps {
  notifications: NotificationProps[];
  page?: string;
}

export default function NotificationsSection({
  notifications,
}: NotificationSectionProps) {
  let img = follow;
  let msgVal = "";
  function getNotificationLink(notification: NotificationProps): string {
    console.log(notification);
    const {
      action,
      type,
      userName,
      userID,
      groupID,
      eventTitle,
      groupTitle,
      postID,
    } = notification.content;
    switch (type) {
      case "event":
        return handleEventNotification(groupID, eventTitle, groupTitle);
      case "follow":
        return handleFollow(action, userName, userID);
      case "group":
        return handleGroupRequest(action, groupID);
      case "post":
        return handlePosts(action, userName, postID);
      default:
        return ``;
    }
  }

  function handleEventNotification(
    groupID: number,
    eventTitle: string,
    groupTitle: string
  ): string {
    img = event;
    msgVal = `New Event: ${eventTitle} in group ${groupTitle}`;
    //  Right now it just directs to the group page idk how to make it switch to the "Events" tab from the redirect
    return `/groups/${groupID}`;
  }

  function handleFollow(
    action: string,
    userName: string,
    userID: number
  ): string {
    switch (action) {
      case "request":
        img = followReq;
        msgVal = `${userName} sent you a follow request!`;
        // Would be nice to switch to the requests tab
        return `/contacts`;
      case "follow":
        msgVal = `${userName} followed you!`;
        return `/profile/${userID}`;
      case "accept":
        img = followAcc;
        msgVal = `${userName} accepted your follow request!`;
        return `/profile/${userID}`;
      default:
        return ``;
    }
  }

  // wrong endpoints rn help
  function handleGroupRequest(action: string, groupID: number): string {
    switch (action) {
      case "request":
        fetchFromServer(`/groups/${groupID}/accept/`, {
          method: "POST",
          credentials: "include",
        });
        return `/groups/${groupID}`;
      case "invite":
        fetchFromServer(`/groups/${groupID}/accept/`, {
          method: "POST",
          credentials: "include",
        });
        return `/groups/${groupID}`;
      default:
        return ``;
    }
  }

  function handlePosts(
    action: string,
    userName: string,
    postID: number
    // postContent: string
  ): string {
    switch (action) {
      // this doesn't exist nvm
      // case "create":
      //   msgVal = `${userName} posted: ${postContent}`;
      //   return `/post/${postID}`;
      case "like":
        img = like;
        msgVal = `${userName} liked your post!`;
        return `/post/${postID}`;
      default:
        return ``;
    }
  }

  function fetchFromServer(endpoint: string, options: object): void {
    fetch(endpoint, options)
      .then((response) => response.json())
      .then((data) => console.log("Request successful", data))
      .catch((error) => console.error("Request failed", error));
  }

  return (
    <>
      {notifications.map((notification) => (
        <Item
          key={notification.ID}
          sx={{
            backgroundImage: `url(${eventBg.src})`,
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            p: "10px",
            position: "relative",
          }}
          radius="12px"
        >
          <Link href={getNotificationLink(notification)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <Image
                  src={img}
                  alt={notification.content.action}
                  width={28}
                  height={28}
                />
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 600,
                    fontFamily: "Schoolbell !important",
                    textTransform: "capitalize",
                  }}
                >
                  {notification.content.action}
                </Typography>{" "}
              </Box>
              <Typography sx={{ fontSize: "16px" }}>{msgVal}</Typography>
            </Box>
          </Link>
        </Item>
      ))}
    </>
  );
}
