"use client";

import { Box, Typography, styled } from "@mui/material";
import { Item } from "../shared/Item";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

interface JoinGroupInfo {
  description: string;
  ownerID: number;
  profileIcon: string;
  ownerName: string;
}

export default function JoinGroupInfo({
  description,
  ownerID,
  profileIcon,
  ownerName,
}: JoinGroupInfo) {
  const [expandAbout, setExpandAbout] = useState<boolean>(false);

  return (
    <Box
      sx={{
        width: "550px",
        position: "sticky",
        top: "90px",
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: "23px",
      }}
    >
      <Item
        sx={{
          p: "14px",
        }}
        radius="8px"
      >
        <StyledTypography>About</StyledTypography>
        <Box sx={{ mt: "9px", wordBreak: "break-word" }}>
          {description.length > 150 ? (
            <Box>
              <Typography component="span">
                {!expandAbout ? description.slice(0, 150) : description}
              </Typography>
              <Typography
                sx={{
                  color: "dodgerblue",
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(86%)",
                  },
                }}
                onClick={() => setExpandAbout(!expandAbout)}
                component="span"
              >
                {" "}
                {!expandAbout ? "...Read More" : "Show Less"}
              </Typography>
            </Box>
          ) : (
            description
          )}
        </Box>
      </Item>
      <Item
        sx={{
          p: "14px",
        }}
        radius="8px"
      >
        <StyledTypography>Admins</StyledTypography>
        <Link href={`/profile/${ownerID}`}>
          <Box
            sx={{
              mt: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              p: "4px",
              "&:hover": {
                background: "#edededc8",
              },
            }}
          >
            <Box
              sx={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #cacacac9",
              }}
            >
              <Image src={profileIcon} alt="profile" />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Schoolbell !important",
                  fontWeight: 600,
                  fontSize: "17px",
                }}
              >
                {ownerName}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Item>
    </Box>
  );
}
