import { Box, Typography, styled } from "@mui/material";
import { Item } from "../shared/Item";
import Link from "next/link";
import Image from "next/image";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

interface GroupAddInfoProps {
  description: string;
  ownerID: number;
  profileIcon: string;
  ownerName: string;
}

export default function GroupAddInfo({
  description,
  ownerID,
  profileIcon,
  ownerName,
}: GroupAddInfoProps) {
  return (
    <Box
      sx={{
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
        <Typography sx={{ mt: "9px" }}>{description}</Typography>
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
      <Item
        sx={{
          position: "sticky",
          top: "90px",
          alignSelf: "flex-start",
          width: "100%",
          p: "14px",
        }}
        radius="8px"
      >
        <StyledTypography>Top Group Members</StyledTypography>
        {[0, 1, 2, 3, 4].map((_, index) => (
          <Link key={index} href="#">
            <Box
              sx={{
                mt: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px",
                "&:hover": {
                  backgroundColor: "#cacaca49",
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
                  Albert Einstein
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Item>
    </Box>
  );
}
