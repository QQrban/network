import { Badge, Box } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/Nophoto.jpg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import TooltipStyled from "../shared/TooltipStyled";

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
      <Badge badgeContent={4} color="error">
        <MailIcon sx={{ fontSize: "29px" }} color="primary" />
      </Badge>
      <Badge badgeContent={999} color="error">
        <NotificationsIcon sx={{ fontSize: "29px" }} color="primary" />
      </Badge>
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
