import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import ProfileImage from "@/components/shared/ProfileImage";
import { MessageProps } from "@/types/types";
import Link from "next/link";

interface MessageItemProps {
  message: MessageProps;
  authID: number;
}

const MessageItem = ({ message, authID }: MessageItemProps) => {
  const isSent = message.senderID === authID;

  const matchesSM = useMediaQuery("(min-width:777px");
  const matchesXS = useMediaQuery("(min-width:659px");

  return (
    <Box
      sx={{
        alignSelf: isSent ? "flex-end" : "flex-start",
        display: "flex",
        position: "relative",
        gap: "12px",
        wordBreak: "break-all",
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
      {!matchesSM && (
        <Typography
          sx={{
            fontSize: "11px",
            color: "#a4a4a4",
            position: "absolute",
            top: "-15px",
            left: isSent ? "" : "42px",
            right: isSent ? "42px" : "0",
            minWidth: "90px",
            textAlign: isSent ? "right" : "left",
          }}
        >
          {dayjs(message.created).format("MMM DD, h:mm A")}
        </Typography>
      )}
      {!isSent && (
        <Link
          style={{ alignSelf: "end" }}
          href={`/profile/${message.senderData?.ID}`}
        >
          <ProfileImage
            image={message.senderData?.image}
            width={30}
            height={30}
          />
        </Link>
      )}
      {isSent && matchesSM && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "#a4a4a4",
            alignSelf: "flex-end",
          }}
        >
          {dayjs(message.created).format("MMM DD, YYYY, h:mm A")}
        </Typography>
      )}
      <Typography
        sx={{
          p: "4px",
          borderRadius: "6px",
          bgcolor: isSent ? "#add5fd5d" : "#dedede5d",
          maxWidth: matchesSM ? "300px" : "250px",
        }}
      >
        {message.content}
      </Typography>
      {isSent && (
        <Link
          style={{ alignSelf: "end" }}
          href={`/profile/${message.senderData?.ID}`}
        >
          <ProfileImage
            image={message.senderData?.image}
            width={30}
            height={30}
          />
        </Link>
      )}
      {!isSent && matchesSM && (
        <Typography
          sx={{
            fontSize: "12px",
            color: "#a4a4a4",
            alignSelf: "flex-end",
          }}
        >
          {dayjs(message.created).format("MMM DD, YYYY, h:mm A")}
        </Typography>
      )}
    </Box>
  );
};

export default MessageItem;
