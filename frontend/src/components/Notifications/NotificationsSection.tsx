"use client";

import { Item } from "../shared/Item";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import eventBg from "../../../public/eventBG.svg";
import Link from "next/link";
import { NotificationProps } from "@/types/types";

interface NotificationSectionProps {
  notifications: NotificationProps[];
  page?: string;
}

export default function NotificationsSection({
  notifications,
}: NotificationSectionProps) {
  function getNotificationLink(notification: NotificationProps): string {
    switch (notification.content.type) {
      case "follow":
        return `/profile/${notification.content.userID}`;
      case "group":
        return `/groups/${notification.content.groupID}`;
      case "event":
        return "/groups/${notification.content.groupID}/events";
      case "post":
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
          {/* type: "follow" | "event" | "group" | "post"; 
          follow - should link to `/profile/${userID}`
          event - forget about it for now
          group - `/groups/${groupID}`
          post - /post/${notification.postId}
          */}
          <Link href={getNotificationLink(notification)}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                {/* <Image
                  src={`/icons/${notification.content.action}.svg`}
                  alt={notification.content.action}
                  width={28}
                  height={28}
                /> */}
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 600,
                    fontFamily: "Schoolbell !important",
                    textTransform: "capitalize",
                  }}
                >
                  {notification.content.action}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "16px" }}>
                {notification.content.userName} {notification.content.action}
              </Typography>
            </Box>
          </Link>
        </Item>
      ))}
    </>
  );
}
