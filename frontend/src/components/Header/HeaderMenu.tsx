import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import TooltipStyled from "../shared/TooltipStyled";
import ProfileMenu from "./ProfileMenu";
import mailIcon from "../../../public/icons/mail.svg";
import notificationIcon from "../../../public/icons/bell.svg";
import Image from "next/image";

export default function HeaderMenu() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "22px",
      }}
    >
      <TooltipStyled title="Chat">
        <IconButton>
          <Badge badgeContent={4} color="error">
            <Image
              style={{ width: "32px", height: "32px" }}
              src={mailIcon}
              alt="Profile"
            />
          </Badge>
        </IconButton>
      </TooltipStyled>
      <TooltipStyled title="Notifications">
        <IconButton>
          <Badge badgeContent={999} color="error">
            <Image
              style={{ width: "32px", height: "32px" }}
              src={notificationIcon}
              alt="Profile"
            />
          </Badge>
        </IconButton>
      </TooltipStyled>
      <Box
        sx={{
          minWidth: "48px",
          height: "48px",
          width: "48px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <ProfileMenu />
      </Box>
    </Box>
  );
}
