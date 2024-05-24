"use client";

import { Box, Typography } from "@mui/material";
import EventSection from "@/components/Events/EventSection";
import { useEffect, useState } from "react";
import { EventProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";

interface Props {
  groupID: number;
}

export default function Events({ groupID }: Props) {
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
  }, [groupID]);

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
        <Box sx={{ mt: "23px", display: "flex", gap: "23px" }}>
          <EventSection
            statusHandler={statusHandler}
            groupID={groupID}
            events={events}
          />
        </Box>
      ) : (
        <Typography sx={{ fontSize: "30px" }}>
          You are not currently participating in any events.
        </Typography>
      )}
    </Box>
  );
}
