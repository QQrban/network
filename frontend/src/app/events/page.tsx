import {
  Box,
  Button,
  SpeedDialAction,
  Typography,
  SpeedDial,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Item } from "@/components/shared/Item";
import Image from "next/image";
import mockBg from "../../../public/mockBG.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import EventSection from "@/components/Events/EventSection";
import { suggestions, yourEvents } from "@/components/Events/mock";

export default function Events() {
  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "23px",
      }}
    >
      <Item
        radius="8px"
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2" variant="h4">
          Events
        </Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<EditCalendarIcon />}
        >
          Create an event
        </Button>
      </Item>
      <EventSection events={yourEvents} sectionName="Your Events" />
      <EventSection
        events={suggestions}
        sectionName="This might interest you"
      />
    </Box>
  );
}
