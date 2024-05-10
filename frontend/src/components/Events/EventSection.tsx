"use client";

import { Item } from "../shared/Item";
import { Box, SpeedDialAction, Typography, SpeedDial } from "@mui/material";
import Image from "next/image";
import mockBg from "../../../public/mockBG.png";
import eventBg from "../../../public/eventBG.svg";
import noSign from "../../../public/icons/noSign.svg";
import confirmedBtn from "../../../public/icons/confirmButton.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Event } from "./mock";
import ConfirmBtn from "../shared/ConfirmBtn";
import AlertDialog from "../shared/Dialog";
import { useState } from "react";

interface EventSectionProps {
  sectionName: string;
  events: Event[];
}

export default function EventSection({
  sectionName,
  events,
}: EventSectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("");

  const handleClick = (name: string) => {
    setOpen(true);
    setEventName(name);
  };

  return (
    <>
      <Typography
        sx={{ fontFamily: "Gloria Hallelujah !important" }}
        variant="h4"
        component="h5"
      >
        {sectionName}
      </Typography>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          flexWrap: "wrap",
          gap: "23px",
          justifyContent: "center",
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
              width: "320px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pb: "10px",
              position: "relative",
              "&:hover": {
                filter: "brightness(97%)",
              },
            }}
            radius="12px"
          >
            <SpeedDial
              sx={{
                position: "absolute",
                top: "6px",
                right: "-2px",
              }}
              ariaLabel="SpeedDial openIcon example"
              icon={<MoreVertIcon sx={{ color: "grey" }} />}
              direction="down"
              FabProps={{
                sx: {
                  backgroundColor: "#ffffffe0",
                  width: "36px",
                  height: "32px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  "&:active": {
                    backgroundColor: "white",
                    boxShadow: "none",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                },
              }}
            >
              <SpeedDialAction
                onClick={() => handleClick(event.title)}
                icon={
                  <Image
                    style={{ width: "20px", height: "20px" }}
                    src={noSign}
                    alt="noSign"
                  />
                }
                tooltipTitle={
                  <Typography sx={{ fontFamily: "Schoolbell !important" }}>
                    Not Interested
                  </Typography>
                }
              />
            </SpeedDial>
            <Box
              sx={{
                height: "230px",
                width: "100%",
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
            <ConfirmBtn
              onClick={() => handleClick(event.title)}
              backgroundImage={confirmedBtn.src}
              text="Interested"
            />
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
