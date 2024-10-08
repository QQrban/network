"use client";

import { Box, Typography, styled } from "@mui/material";
import { Item } from "../shared/Item";
import ConfirmBtn from "../shared/ConfirmBtn";
import cardBg from "../../../public/icons/cardBG.svg";
import stopSign from "../../../public/icons/stop-sign.svg";
import confirmBtn from "../../../public/icons/confirmButton.svg";
import successBtn from "../../../public/icons/successBtn.svg";

import { fetchFromServer } from "@/lib/api";
import { useState } from "react";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

interface GroupCardProps {
  id: number;
  groupTitle: string;
  pendingRequest: boolean;
  matchesLG: boolean;
}

export default function JoinGroupCard({
  groupTitle,
  id,
  pendingRequest,
  matchesLG,
}: GroupCardProps) {
  const [requestStatus, setRequestStatus] = useState<boolean>(pendingRequest);

  const handleJoinGroup = async () => {
    try {
      const response = await fetchFromServer(`/group/${id}/join`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setRequestStatus(true);
      } else {
        throw new Error("Failed to send join request.");
      }
    } catch (error) {
      console.error("Failed to join group:", error);
    }
  };

  return (
    <Box sx={{ width: matchesLG ? "600px" : "100%" }}>
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
            {requestStatus
              ? `Pending join approval.`
              : `You are not part of this group. Click "Join Group" and an Admin will
              approve your request to join.`}
          </Box>
          <Box sx={{ width: "200px", alignSelf: "flex-end" }}>
            {requestStatus ? (
              <ConfirmBtn backgroundImage={successBtn.src} text="Pending" />
            ) : (
              <ConfirmBtn
                onClick={handleJoinGroup}
                backgroundImage={confirmBtn.src}
                text="Join Group"
              />
            )}
          </Box>
        </Box>
      </Item>
      <Box
        sx={{
          mt: "46px",
          backgroundImage: `url(${stopSign.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "400px",
          width: "100%",
        }}
      ></Box>
    </Box>
  );
}
