"use client";

import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import { Item } from "../shared/Item";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ContactsProps } from "@/types/types";
import ProfileImage from "../shared/ProfileImage";
import advertisement from "../../../public/icons/advert.svg";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

interface GroupAddInfoProps {
  description: string;
  profileIcon: string;
  owner: ContactsProps;
  isMember: boolean;
  matchesLG: boolean;
}

export default function GroupAddInfo({
  description,
  profileIcon,
  owner,
  isMember,
  matchesLG,
}: GroupAddInfoProps) {
  const [expandAbout, setExpandAbout] = useState<boolean>(false);
  const matchesMD = useMediaQuery("(min-width:875px)");

  return (
    <Box
      sx={{
        width: matchesLG ? "400px" : matchesMD ? "600px" : "100%",
        position: matchesLG ? "sticky" : "relative",
        top: matchesLG ? "90px" : "0",
        alignSelf: "flex-start",
        m: matchesLG ? "" : "0 auto",
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
        <StyledTypography>Admin</StyledTypography>
        <Link href={`/profile/${owner.ID}`}>
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
            <ProfileImage width={50} height={50} image={owner.image} />
            <Box>
              <Typography
                sx={{
                  fontFamily: "Schoolbell !important",
                  fontWeight: 600,
                  fontSize: "17px",
                }}
              >
                {owner.firstName} {owner.lastName}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Item>
      {isMember && (
        <Item
          sx={{
            position: matchesLG ? "sticky" : "relative",
            top: matchesLG ? "90px" : "0",
            alignSelf: "flex-start",
            width: "100%",
            p: "14px",
          }}
          radius="8px"
        >
          <StyledTypography>Advertisement</StyledTypography>
          <Box sx={{ mt: "23px" }}>
            <Image
              width={500}
              height={250}
              src={advertisement}
              alt="advertisement"
            />
          </Box>
        </Item>
      )}
    </Box>
  );
}
