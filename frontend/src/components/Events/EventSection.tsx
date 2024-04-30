import { Item } from "../shared/Item";
import {
  Box,
  Button,
  SpeedDialAction,
  Typography,
  SpeedDial,
} from "@mui/material";
import Image from "next/image";
import mockBg from "../../../public/mockBG.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Event } from "./mock";

interface EventSectionProps {
  sectionName: string;
  events: Event[];
}

export default function EventSection({
  sectionName,
  events,
}: EventSectionProps) {
  return (
    <Item radius="8px" sx={{ p: "20px" }}>
      <Typography variant="h4" component="h5">
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
              cursor: "pointer",
              width: "360px",
              height: "420px",
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
                icon={
                  event.interested ? <NotInterestedIcon /> : <StarOutlineIcon />
                }
                tooltipTitle={
                  event.interested ? "NOT INTERESTED" : "INTERESTED"
                }
              />
            </SpeedDial>
            <Box
              sx={{
                height: "230px",
                width: "100%",
              }}
            >
              <Image src={mockBg} alt="" />
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
                  }}
                >
                  {event.title}
                </Typography>
                <Typography sx={{ color: "#2a2a2a6c" }}>
                  {event.location}
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{
                width: "200px",
                alignSelf: "center",
              }}
              component="label"
              variant={event.interested ? "contained" : "outlined"}
              tabIndex={-1}
              startIcon={<StarOutlineIcon />}
            >
              Interested
            </Button>
          </Item>
        ))}
      </Box>
      <Box></Box>
    </Item>
  );
}
