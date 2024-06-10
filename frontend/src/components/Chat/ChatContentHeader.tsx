import { Box, Typography } from "@mui/material";
import ProfileImage from "../shared/ProfileImage";
import Link from "next/link";
import { ContactsProps } from "@/types/types";

interface ChatContentHeaderProps {
  activeChatName: string;
  chatReceiverID: number | undefined;
  initChat: ContactsProps | undefined;
}

export default function ChatContentHeader({
  activeChatName,
  chatReceiverID,
  initChat,
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
      {chatReceiverID ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link href={`/profile/${chatReceiverID}`}>
            <ProfileImage width={45} height={45} image={initChat?.image} />
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
