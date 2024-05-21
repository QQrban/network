"use client";

import { Box, Typography } from "@mui/material";
import NotificationsSection from "@/components/Notifications/NotificationsSection";
import {
  Notification,
  yourNotifications,
} from "@/components/Notifications/mock";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const filteredNotifications = yourNotifications.filter(
      (notification) => notification.unread
    );
    setNotifications(filteredNotifications);
  }, []);

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
      {notifications.length > 0 ? (
        <Box
          sx={{
            mt: "23px",
            display: "flex",
            flexDirection: "column",
            gap: "23px",
            width: "700px",
          }}
        >
          <NotificationsSection notifications={notifications} />
        </Box>
      ) : (
        <Typography sx={{ fontSize: "30px" }}>
          You have 0 notifications.
        </Typography>
      )}
    </Box>
  );
}
