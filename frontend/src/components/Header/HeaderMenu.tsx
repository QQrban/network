import { Box } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/icons/noPhoto.svg";
import chatIcon from "../../../public/icons/chat.svg";
import notificationIcon from "../../../public/icons/notification.svg";
import appIcon from "../../../public/icons/app.svg";
import HeaderMenuItem from "./HeaderMenuItem";

export default function HeaderMenu() {
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
          width: "48px",
          height: "48px",
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={noPhoto} alt="profilePic" />
      </Box>
    </Box>
  );
}
