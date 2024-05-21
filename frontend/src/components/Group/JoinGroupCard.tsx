"use client";

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { Item } from "../shared/Item";
import ConfirmBtn from "../shared/ConfirmBtn";
import cardBg from "../../../public/icons/cardBG.svg";

import confirmBtn from "../../../public/icons/confirmButton.svg";
import successBtn from "../../../public/icons/successBtn.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import copyIcon from "../../../public/icons/copy.svg";
import EventSection from "../Events/EventSection";
import { yourEvents } from "../Events/mock";
import GroupPostsSection from "./GroupPostsSection";
import { useState } from "react";
import CreateEventModal from "./CreateEventModal";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

const StyledTab = styled(Tab)`
  font-family: Gloria Hallelujah, sans-serif;
  font-size: 18px;
`;

interface GroupCardProps {
  groupTitle: string;
}

export default function GroupCard({ groupTitle }: GroupCardProps) {
  return (
    <Box sx={{ width: "600px" }}>
      <Item
        sx={{
          overflow: "hidden",
          position: "relative",
          alignSelf: "flex-start",
          backgroundImage: `url(${cardBg.src})`,
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        radius="8px"
      >
        <Box
          sx={{
            p: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <StyledTypography>{groupTitle}</StyledTypography>
          <Box sx={{ mt: "9px" }}>
            You are not part of this group. Click "Join Group" and an Admin will
            approve your request to join.
          </Box>

          <Box sx={{ width: "200px", alignSelf: "flex-end" }}>
            <ConfirmBtn backgroundImage={confirmBtn.src} text="Join Group" />
          </Box>
        </Box>
      </Item>
    </Box>
  );
}
