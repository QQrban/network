"use client";

import { Box, Typography } from "@mui/material";
import NotificationsSection from "@/components/Notifications/NotificationsSection";

import { useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import { NotificationProps } from "@/types/types";

export default function Notifications() {
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [iNotifications, setINotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetchFromServer("/notifications/all", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();

        const parsedData = data.map((notification: any) => {
          return {
            ...notification,
            content: JSON.parse(notification.content),
          };
        });
        setINotifications(parsedData);
      }
    };
    fetchNotifications();
  }, []);

  const deleteNotification = async (notificationID: number) => {
    try {
      const response = await fetchFromServer(
        `/notification/${notificationID}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );
      if (response.ok) {
        setINotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.ID !== notificationID
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(iNotifications);

  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h2"
        sx={{ fontFamily: "Gloria Hallelujah !important", fontSize: "50px" }}
      >
        Notifications
      </Typography>
      {iNotifications.length > 0 ? (
        <Box
          sx={{
            mt: "23px",
            display: "flex",
            flexDirection: "column",
            gap: "23px",
            width: "700px",
          }}
        >
          <NotificationsSection
            deleteNotification={deleteNotification}
            notifications={iNotifications}
          />
        </Box>
      ) : (
        <Typography sx={{ fontSize: "30px" }}>
          You have 0 notifications.
        </Typography>
      )}
    </Box>
  );
}
