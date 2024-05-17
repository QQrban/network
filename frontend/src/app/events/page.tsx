"use client";

import { Box, Typography } from "@mui/material";
import EventSection from "@/components/Events/EventSection";
import { Event, yourEvents } from "@/components/Events/mock";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const filteredEvents = yourEvents.filter((event) => event.interested);
    setEvents(filteredEvents);
  }, []);

  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{ fontFamily: "Gloria Hallelujah !important", fontSize: "50px" }}
      >
        Your Events
      </Typography>
      {events.length > 0 ? (
        <Box sx={{ mt: "23px", display: "flex", gap: "23px" }}>
          <EventSection events={events} />
        </Box>
      ) : (
        <Typography sx={{ fontSize: "30px" }}>
          You are not currently participating in any events.
        </Typography>
      )}
    </Box>
  );
}
