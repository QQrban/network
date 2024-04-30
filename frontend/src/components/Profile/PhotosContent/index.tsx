"use client";

import { Item } from "@/components/shared/Item";
import {
  Box,
  Grid,
  SpeedDial,
  SpeedDialAction,
  Typography,
} from "@mui/material";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete } from "@mui/icons-material";

export default function PhotosContent() {
  const numDivs = 7;
  return (
    <Box>
      <Typography variant="h5" component="h3">
        Photos
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          mt: "18px",
        }}
      >
        <Grid container spacing={2}>
          {Array.from({ length: numDivs }, (_, index) => (
            <Grid
              sx={{
                cursor: "pointer",
                "&:hover": {
                  filter: "brightness(96%)",
                },
              }}
              key={index}
              item
              md={2.3}
            >
              <Item
                sx={{
                  border: "1px solid #0000001a",
                  width: "220px",
                  height: "270px",
                  position: "relative",
                }}
                radius="8px"
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
                      backgroundColor: "white",
                      width: "36px",
                      height: "32px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#00000014",
                      },
                      "&:active": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                    },
                  }}
                >
                  <SpeedDialAction
                    icon={<Delete />}
                    tooltipTitle="DELETE PHOTO"
                  />
                </SpeedDial>
                <Image src="" alt="" />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
