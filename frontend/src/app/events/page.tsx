"use client";

import EventSection from "@/components/Events/EventSection";
import { fetchFromServer } from "@/lib/api";
import { EventProps } from "@/types/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState<EventProps[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetchFromServer(`/events`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const filteredEvents = data.filter(
            (event: any) => event.myStatus === "Going"
          );
          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
  }, []);

  const statusHandler = (eventID: number, status: "Going" | "Not Going") => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.ID === eventID ? { ...event, myStatus: status } : event
      )
    );
  };

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
        <Box
          sx={{ mt: "23px", display: "flex", gap: "23px", flexWrap: "wrap" }}
        >
          <EventSection statusHandler={statusHandler} events={events} />
        </Box>
      ) : (
        <Typography sx={{ fontSize: "30px" }}>
          You are not currently participating in any events.
        </Typography>
      )}
    </Box>
  );
}
