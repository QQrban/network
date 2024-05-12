"use client";

import { Item } from "@/components/shared/Item";
import {
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  Typography,
} from "@mui/material";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import wall from "../../../../public/mockBG.png";
import deleteIcon from "../../../../public/icons/delete.svg";
import AlertDialog from "@/components/shared/Dialog";
import { useState } from "react";

interface PhotosContentProps {
  isMainBoard: boolean;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function PhotosContent({
  isMainBoard,
  setSelectedTab,
}: PhotosContentProps) {
  const [open, setOpen] = useState<boolean>(false);

  const nums = [0, 1, 2, 3, 4, 5, 6];

  const newNums = isMainBoard ? nums.slice(0, 3) : nums;

  return (
    <Box sx={{ mt: "23px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Gloria Hallelujah !important",
            fontSize: "30px",
            p: `${!isMainBoard && "0 60px"}`,
          }}
        >
          Photos
        </Typography>
        {isMainBoard && (
          <Button onClick={() => setSelectedTab("Photos")}>
            <Typography
              sx={{
                fontFamily: "Gloria Hallelujah !important",
                fontSize: "18px",
              }}
            >
              View All Photos &#x2192;
            </Typography>
          </Button>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          mt: "18px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "23px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {newNums.map((_, index) => (
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": {
                  filter: "brightness(96%)",
                },
              }}
              key={index}
            >
              <Item
                sx={{
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
                        backgroundColor: "white",
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
                    onClick={() => setOpen(true)}
                    icon={
                      <Image
                        width={30}
                        height={30}
                        src={deleteIcon}
                        alt="delete"
                      />
                    }
                    tooltipTitle={
                      <Typography
                        sx={{
                          fontFamily: "Schoolbell !important",
                          fontSize: "20px",
                        }}
                      >
                        Delete Photo
                      </Typography>
                    }
                  />
                </SpeedDial>
                <Image src={wall} alt="photo" />
              </Item>
            </Box>
          ))}
        </Box>
      </Box>
      <AlertDialog
        title="Are you sure you don't want to delete this photo?"
        dialogText=""
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}
