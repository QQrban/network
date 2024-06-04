import { Badge, Box, IconButton } from "@mui/material";
import TooltipStyled from "../shared/TooltipStyled";
import ProfileMenu from "./ProfileMenu";
import mailIcon from "../../../public/icons/mail.svg";
import notificationIcon from "../../../public/icons/bell.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HeaderMenu() {
  const senderIds = useSelector(
    (state: any) => state.notificationsReducer.senderIds
  );
  const groupIds = useSelector(
    (state: any) => state.notificationsReducer.groupIds
  );
  const hasNewMessage = senderIds.length > 0 || groupIds.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "22px",
      }}
    >
      <TooltipStyled title="Chat">
        <Link href="/chat">
          <IconButton>
            <Badge badgeContent={hasNewMessage ? "!" : 0} color="error">
              <Image
                style={{ width: "32px", height: "32px" }}
                src={mailIcon}
                alt="Profile"
              />
            </Badge>
          </IconButton>
        </Link>
      </TooltipStyled>
      <TooltipStyled title="Notifications">
        <Link href={`/notifications/`}>
          <IconButton>
            <Badge badgeContent={0} color="error">
              <Image
                style={{ width: "32px", height: "32px" }}
                src={notificationIcon}
                alt="Profile"
              />
            </Badge>
          </IconButton>
        </Link>
      </TooltipStyled>
      <ProfileMenu />
    </Box>
  );
}
