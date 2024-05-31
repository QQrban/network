"use client";

import { Item } from "../shared/Item";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import eventBg from "../../../public/eventBG.svg";
import Link from "next/link";
import { NotificationProps } from "@/types/types";
import like from "../../../public/icons/give-love.svg";
import comment from "../../../public/icons/commenting.svg";
import follow from "../../../public/icons/profile.svg";
import followReq from "../../../public/icons/personAdd.svg";
import followAcc from "../../../public/icons/contacts.svg";
import { fetchFromServer } from "@/lib/api";

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
    switch (notification.content.action) {
      case "follow":
        msgVal = notification.content.userName + " followed you!";
        return `/profile/${notification.content.userID}`;
      case "accept":
        img = followAcc;
        msgVal = notification.content.userName + " accepted your request!";
        return `/profile/${notification.content.userID}`;
      case "request":
        if (notification.content.type === "follow") {
          img = followReq;
          msgVal = `${notification.content.userName} sent you a follow request!`;
          return `/contacts`;
        } else if (notification.content.type === "group") {
          // Can't accept requests yet
          img = followReq;
          msgVal = `${notification.content.userName} wants to join your group!`;
          try {
            fetchFromServer(
              `/groups/${notification.content.groupID}/accept/${notification.content.userID}`,
              {
                method: "PUT",
                credentials: "include",
              }
            );
            return `/groups/${notification.content.groupID}`;
          } catch (error) {
            console.error("Doesn't work: ", error);
          }
        }
      case "invite":
        // Can't accept invites yet
        msgVal = notification.content.userName + " sent you a follow request!";
        return `/groups/${notification.content.groupID}/accept/${notification.content.userID}`;
      case "like":
        img = like;
        msgVal = notification.content.userName + " liked your post!";
        return `/post/${notification.content.postID}`;
      default:
        return "#";
    }
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
