import { Box, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TooltipStyled from "../shared/TooltipStyled";

export default function NavigationMenu() {
  const pathname = usePathname();
  const isActive = (currentPath: String, targetPath: String) =>
    currentPath === targetPath;

  const iconStyles = (targetPath: String) => ({
    fontSize: 45,
    color: "#8F8F8F",
    cursor: "pointer",
    "&:hover": {
      color: "#6495ED",
      overflow: "visible",
    },
    ...(isActive(pathname, targetPath) && {
      color: "#6495ED",
    }),
  });

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
        display: "flex",
        gap: "90px",
      }}
      component="nav"
    >
      <TooltipStyled title="Home">
        <Link href="/" passHref>
          <HomeIcon sx={iconStyles("/")} />
        </Link>
      </TooltipStyled>
      <TooltipStyled title="Followers">
        <Link href="/followers" passHref>
          <GroupIcon sx={iconStyles("/followers")} />
        </Link>
      </TooltipStyled>
      <TooltipStyled title="Events">
        <Link href="/events" passHref>
          <CalendarMonthIcon sx={iconStyles("/events")} />
        </Link>
      </TooltipStyled>
      <TooltipStyled title="Groups">
        <Link href="/groups" passHref>
          <GroupsIcon sx={iconStyles("/groups")} />
        </Link>
      </TooltipStyled>
    </Box>
  );
}
