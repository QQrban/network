"use client";

import { Item } from "../shared/Item";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import mockBg from "../../../public/mockBG.png";
import eventBg from "../../../public/eventBG.svg";
import confirmedBtn from "../../../public/icons/confirmButton.svg";
import errorBtn from "../../../public/icons/errorBtn.svg";
import { Event } from "./mock";
import ConfirmBtn from "../shared/ConfirmBtn";
import AlertDialog from "../shared/Dialog";
import { useState } from "react";

interface EventSectionProps {
  events: Event[];
  page?: string;
}

export default function EventSection({ events, page }: EventSectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("");

  const handleClick = (name: string, interested: boolean) => {
    if (interested) {
      setOpen(true);
      setEventName(name);
    } else {
      return false;
    }
  };

  return (
    <>
      {events.map((event) => (
        <Item
          key={event.id}
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
                <Typography sx={{ fontWeight: 600 }}>{event.date}</Typography>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 600,
                    fontFamily: "Schoolbell !important",
                  }}
                >
                  {event.title}
                </Typography>
                <Typography sx={{ color: "#2a2a2a6c" }}>
                  {event.location}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: "300px",
              fontSize: "16px",
            }}
          >
            {event.description}
          </Box>
          <Box sx={{ maxWidth: "200px" }}>
            <ConfirmBtn
              onClick={() => handleClick(event.title, event.interested)}
              backgroundImage={
                event.interested ? confirmedBtn.src : errorBtn.src
              }
              text={event.interested ? "Interested" : "Not Interested"}
            />
          </Box>
        </Item>
      ))}
      <AlertDialog
        title={`*${eventName.toUpperCase()}?*`}
        dialogText="Are you sure you don't want to go to this event?"
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
