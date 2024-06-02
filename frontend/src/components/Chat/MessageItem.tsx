import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import ProfileImage from "@/components/shared/ProfileImage";
import { MessageProps } from "@/types/types";

interface MessageItemProps {
  message: MessageProps;
  tabValue: string;
  authID: number;
}

const MessageItem = ({ message, authID, tabValue }: MessageItemProps) => {
  const isSent = message.senderID === authID;

  return (
    <Box
      sx={{
        alignSelf: isSent ? "flex-end" : "flex-start",
        display: "flex",
        alignItems: "center",
        position: "relative",
        gap: "12px",
      }}
      key={message.ID}
    >
      {message.isGroup && (
        <Box
          sx={{
            position: "absolute",
            right: isSent ? "43px" : "",
            left: !isSent ? "43px" : "",
            top: "-17px",
            fontSize: "12px",
            color: "#565656",
          }}
        >
          {message.senderData?.firstName} {message.senderData?.lastName}
        </Box>
      )}
      {!isSent && <ProfileImage image="" width={30} height={30} />}
      {isSent && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "#a4a4a4",
          }}
        >
          {dayjs(message.created).format("MMM DD, YYYY, hh:mm")}
        </Typography>
      )}
      <Typography
        sx={{
          p: "4px",
          borderRadius: "6px",
          bgcolor: isSent ? "#add5fd5d" : "#dedede5d",
        }}
      >
        {message.content}
      </Typography>
      {isSent && <ProfileImage image="" width={30} height={30} />}
      {!isSent && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "#a4a4a4",
          }}
        >
          {dayjs(message.created).format("MMM DD, YYYY, h:mm A")}
        </Typography>
      )}
    </Box>
  );
};

export default MessageItem;
