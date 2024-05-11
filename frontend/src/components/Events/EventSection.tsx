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
      <Typography
        sx={{ fontFamily: "Gloria Hallelujah !important" }}
        variant="h4"
        component="h5"
      ></Typography>
      <Box
        sx={{
          mt: "23px",
          gap: "23px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {events.map((event) => (
          <Item
            key={event.id}
            sx={{
              backgroundImage: `url(${eventBg.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              cursor: "pointer",
              overflow: "hidden",
              display: "flex",
              gap: "23px",
              height: "190px",
              alignItems: "center",
              justifyContent: "space-between",
              p: "10px",
              position: "relative",
              "&:hover": {
                filter: "brightness(97%)",
              },
            }}
            radius="12px"
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "180px",
                  height: "120px",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Image src={mockBg} alt="scratches" />
              </Box>
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
                      width: "190px",
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
            <Box sx={{ width: "180px" }}>
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
      </Box>
      <AlertDialog
        title={`*${eventName.toUpperCase()}?*`}
        dialogText="Are you sure you don't want to go to this event?"
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
