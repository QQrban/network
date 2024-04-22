import { Box } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/icons/noPhoto.svg";
import chatIcon from "../../../public/icons/chat.svg";
import notificationIcon from "../../../public/icons/notification.svg";
import appIcon from "../../../public/icons/app.svg";
import HeaderMenuItem from "./HeaderMenuItem";
import Link from "next/link";

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
      <HeaderMenuItem logo={appIcon} descr="app bar" showNotification={false} />
      <HeaderMenuItem logo={chatIcon} descr="chat" showNotification={true} />
      <HeaderMenuItem
        logo={notificationIcon}
        descr="notification"
        showNotification={true}
      />
      <Box
        sx={{
          minWidth: "48px",
          height: "48px",
          width: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Link href={`/profile/${id}`}>
          <Image src={noPhoto} alt="profilePic" />
        </Link>
      </Box>
    </Box>
  );
}
