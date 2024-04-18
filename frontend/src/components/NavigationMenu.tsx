import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function NavigationMenu() {
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
      <HomeIcon sx={iconStyles} />
      <GroupIcon sx={iconStyles} />
      <CalendarMonthIcon sx={iconStyles} />
      <GroupsIcon sx={iconStyles} />
    </Box>
  );
}

const iconStyles = {
  fontSize: 69,
  padding: "5px",
  color: "white",
  cursor: "pointer",
  "&:hover": {
    color: "#6494ed",
    backgroundColor: "white",
    borderRadius: "50%",
    overflow: "visible",
  },
};
