import { Box, Typography } from "@mui/material";
import ProfileImage from "../shared/ProfileImage";
import Link from "next/link";

interface ChatContentHeaderProps {
  activeChatName: string;
  receiverID: number | undefined;
}

export default function ChatContentHeader({
  activeChatName,
  receiverID,
}: ChatContentHeaderProps) {
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        zIndex: "555",
        top: "0",
        p: "10px",
        backgroundColor: "white",
        borderBottom: "2px solid #b0b0b0",
      }}
    >
      {receiverID ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link href={`/profile/${receiverID}`}>
            <ProfileImage width={45} height={45} image="" />
          </Link>
          <Typography
            sx={{
              fontFamily: "Gloria Hallelujah !important",
              fontSize: "20px",
            }}
          >
            {activeChatName}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ProfileImage width={45} height={45} image="" />
          <Typography
            sx={{
              fontFamily: "Gloria Hallelujah !important",
              fontSize: "20px",
            }}
          >
            {activeChatName}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
