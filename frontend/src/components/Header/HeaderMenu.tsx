import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import TooltipStyled from "../shared/TooltipStyled";
import ProfileMenu from "./ProfileMenu";

export default function HeaderMenu() {
  let id: number = 10561654311;
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
            <MailIcon sx={{ fontSize: "29px" }} color="primary" />
          </Badge>
        </IconButton>
      </TooltipStyled>
      <TooltipStyled title="notifications">
        <IconButton>
          <Badge badgeContent={999} color="error">
            <NotificationsIcon sx={{ fontSize: "29px" }} color="primary" />
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
