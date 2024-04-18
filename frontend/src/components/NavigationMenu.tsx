import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationMenu() {
  const pathname = usePathname();
  const isActive = (currentPath: String, targetPath: String) =>
    currentPath === targetPath;

  const iconStyles = (targetPath: String) => ({
    fontSize: 69,
    padding: "5px",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "#325187",
      backgroundColor: "white",
      borderRadius: "50%",
      overflow: "visible",
    },
    ...(isActive(pathname, targetPath) && {
      color: "#325187",
      backgroundColor: "white",
      borderRadius: "50%",
      overflow: "visible",
    }),
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "23px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
      component="nav"
    >
      <Link href="/" passHref>
        <HomeIcon sx={iconStyles("/")} />
      </Link>
      <Link href="/followers" passHref>
        <GroupIcon sx={iconStyles("/followers")} />
      </Link>
      <Link href="/events" passHref>
        <CalendarMonthIcon sx={iconStyles("/events")} />
      </Link>
      <Link href="/groups" passHref>
        <GroupsIcon sx={iconStyles("/groups")} />
      </Link>
    </Box>
  );
}
