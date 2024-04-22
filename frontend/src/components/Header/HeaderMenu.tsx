import { Box, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/Nophoto.jpg";
import chatIcon from "../../../public/icons/chat.svg";
import notificationIcon from "../../../public/icons/notification.svg";
import appIcon from "../../../public/icons/app.svg";
import HeaderMenuItem from "./HeaderMenuItem";
import Link from "next/link";
import TooltipStyled from "../shared/TooltipStyled";

export default function HeaderMenu() {
  let id: number = 10561654311;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <HeaderMenuItem logo={appIcon} descr="Menu" showNotification={false} />
      <HeaderMenuItem logo={chatIcon} descr="Chat" showNotification={true} />
      <HeaderMenuItem
        logo={notificationIcon}
        descr="Notifications"
        showNotification={true}
      />
      <Box
        sx={{
          minWidth: "48px",
          height: "48px",
          width: "48px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <TooltipStyled title="Profile">
          <Link href={`/profile/${id}`}>
            <Image src={noPhoto} alt="profilePic" />
          </Link>
        </TooltipStyled>
      </Box>
    </Box>
  );
}
