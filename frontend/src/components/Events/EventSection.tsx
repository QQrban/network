"use client";

import { Item } from "../shared/Item";
import { Box, Typography, useMediaQuery } from "@mui/material";
import eventBg from "../../../public/eventBG.svg";
import confirmedBtn from "../../../public/icons/confirmButton.svg";
import errorBtn from "../../../public/icons/errorBtn.svg";
import ConfirmBtn from "../shared/ConfirmBtn";
import AlertDialog from "../shared/Dialog";
import { useState } from "react";
import { EventProps } from "@/types/types";
import dayjs from "dayjs";
import { fetchFromServer } from "@/lib/api";

interface EventSectionProps {
  events: EventProps[];
  page?: string;
  groupID: number;
  statusHandler: (event: number, status: "Going" | "Not Going") => void;
}

export default function EventSection({
  events,
  statusHandler,
}: EventSectionProps) {
  const [showFull, setShowFull] = useState<boolean>(false);
  const matchesXS = useMediaQuery("(min-width:500px)");

  const myStatusHandler = async (eventID: number, status: boolean) => {
    const eventStatus = status ? "Going" : "Not Going";
    const option: number = eventStatus === "Going" ? 1 : 2;
    try {
      const response = await fetchFromServer(
        `/event/${eventID}/choice/${option}`,
        { credentials: "include", method: "PUT" }
      );
      if (response.ok) {
        statusHandler(eventID, eventStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {events.map((event) => (
        <EventItem
          showFull={showFull}
          setShowFull={setShowFull}
          key={event.ID}
          event={event}
          myStatusHandler={myStatusHandler}
        />
      ))}
    </>
  );
}

interface EventItemProps {
  event: EventProps;
  myStatusHandler: (eventID: number, status: boolean) => void;
  showFull: boolean;
  setShowFull: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventItem({
  event,
  myStatusHandler,
  showFull,
  setShowFull,
}: EventItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleConfirmClick = (status: boolean) => {
    if (status === false && event.myStatus === "Going") {
      setOpen(true);
    } else {
      myStatusHandler(event.ID, status);
    }
  };

  const handleDialogConfirm = () => {
    myStatusHandler(event.ID, false);
    setOpen(false);
  };

  return (
    <Item
      sx={{
        backgroundImage: `url(${eventBg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "23px",
        alignItems: "center",
        justifyContent: "space-between",
        p: "10px",
        position: "relative",
        minWidth: "350px",
        flexShrink: 0,
        maxWidth: "350px",
        minHeight: "300px",
      }}
      radius="12px"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: "20px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 600,
                fontFamily: "Schoolbell !important",
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              {event.title}
            </Typography>
            <Typography sx={{ color: "#7d7d7d", fontSize: "16px" }}>
              {dayjs(event.time).format("MMM D YYYY, HH:mm")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: "300px",
          fontSize: "16px",
          wordBreak: "break-word",
        }}
      >
        {event.description.length > 200 ? (
          <Box>
            {showFull ? event.description : event.description.slice(0, 150)}
            <Typography
              sx={{
                cursor: "pointer",
              }}
              color="primary"
              onClick={() => setShowFull(!showFull)}
              component="span"
            >
              {showFull ? "...Show Less" : "...Show More"}
            </Typography>
          </Box>
        ) : (
          event.description
        )}
      </Box>
      <Box sx={{ maxWidth: "200px" }}>
        <ConfirmBtn
          onClick={() =>
            event.myStatus === "Going"
              ? handleConfirmClick(false)
              : handleConfirmClick(true)
          }
          backgroundImage={
            event.myStatus === "Going" ? confirmedBtn.src : errorBtn.src
          }
          text={event.myStatus === "Going" ? "Interested" : "Not Interested"}
        />
      </Box>
      <AlertDialog
        onConfirm={handleDialogConfirm}
        title={`*${event.title.toUpperCase()}?*`}
        dialogText="Are you sure you don't want to go to this event?"
        open={open}
        setOpen={setOpen}
      />
    </Item>
  );
}
