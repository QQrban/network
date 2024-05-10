import { Box } from "@mui/material";
import EventSection from "@/components/Events/EventSection";
import { yourEvents } from "@/components/Events/mock";

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
      <EventSection events={yourEvents} sectionName="Your Events" />
    </Box>
  );
}
