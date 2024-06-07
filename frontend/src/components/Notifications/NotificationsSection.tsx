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
import groupReq from "../../../public/icons/groups.svg";
import cross from "../../../public/icons/cross.svg";
import { fetchFromServer } from "@/lib/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNewNotification } from "@/redux/features/notifications/notificationsSlice";
import ConfirmBtn from "../shared/ConfirmBtn";
import confirmBtn from "../../../public/icons/confirmButton.svg";
import TooltipStyled from "../shared/TooltipStyled";

interface NotificationSectionProps {
  notifications: NotificationProps[];
  deleteNotification: (notificationID: number) => void;
}

const getNotificationDetails = (notification: NotificationProps) => {
  const { action, type, userName, eventTitle, groupTitle } =
    notification.content;
  let img = follow;
  let msgVal = "";

  switch (type) {
    case "event":
      img = event;
      msgVal = `New Event: ${eventTitle} in group ${groupTitle}`;
      break;
    case "follow":
      switch (action) {
        case "request":
          img = followReq;
          msgVal = `${userName} sent you a follow request!`;
          break;
        case "follow":
          msgVal = `${userName} followed you!`;
          break;
        case "accept":
          img = followAcc;
          msgVal = `${userName} accepted your follow request!`;
          break;
        default:
          break;
      }
      break;
    case "post":
      if (action === "like") {
        img = like;
        msgVal = `${userName} liked your post!`;
      }
      break;
    default:
      break;
  }
  return { img, msgVal };
};

export default function NotificationsSection({
  notifications,
  deleteNotification,
}: NotificationSectionProps) {
  const dispatch = useDispatch();

  function getNotificationLink(notification: NotificationProps): string {
    const { action, type, userID, groupID, postID } = notification.content;
    switch (type) {
      case "event":
        return `/groups/${groupID}`;
      case "follow":
        return action === "request" ? `/contacts` : `/profile/${userID}`;
      case "post":
        return `/post/${postID}`;
      default:
        return ``;
    }
  }

  const handleGroupRequest = async (
    userID: number,
    groupID: number,
    action: string,
    notificationID: number
  ) => {
    try {
      const endpoint =
        action === "request"
          ? `/group/${groupID}/accept/${userID}`
          : `/group/${groupID}/join`;
      const response = await fetchFromServer(endpoint, {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        console.log(response);
        deleteNotification(notificationID);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(setNewNotification(false));
  }, [dispatch]);

  return (
    <>
      {notifications.map((notification) => {
        const { img, msgVal } = getNotificationDetails(notification);
        return (
          <Item
            key={notification.ID}
            sx={{
              backgroundImage: `url(${eventBg.src})`,
              width: "100%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              display: "flex",
              flexDirection: "column",
              p: "10px",
              position: "relative",
            }}
            radius="12px"
          >
            {notification.content.type !== "group" ? (
              <Link href={getNotificationLink(notification)}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
                  >
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
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "16px" }}>{msgVal}</Typography>
                </Box>
              </Link>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <Image
                      src={groupReq}
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
                    </Typography>
                  </Box>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {notification.content.action === "request"
                      ? `${notification.content.userName} wants to join your group (${notification.content.groupTitle})`
                      : `${notification.content.userName} sent you a group invitation (${notification.content.groupTitle})`}
                  </Typography>
                </Box>
                <Box sx={{ width: "110px" }}>
                  <ConfirmBtn
                    onClick={() =>
                      handleGroupRequest(
                        notification.content.userID,
                        notification.content.groupID,
                        notification.content.action,
                        notification.ID
                      )
                    }
                    backgroundImage={confirmBtn.src}
                    text="accept"
                  />
                </Box>
              </Box>
            )}
            <TooltipStyled title="Delete Notification">
              <Box
                onClick={() => deleteNotification(notification.ID)}
                sx={{
                  position: "absolute",
                  right: "-12px",
                  top: "-12px",
                  cursor: "pointer",
                }}
              >
                <Image src={cross} alt="delete" width={28} height={28} />
              </Box>
            </TooltipStyled>
          </Item>
        );
      })}
    </>
  );
}
