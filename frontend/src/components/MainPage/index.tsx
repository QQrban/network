import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { Item } from "../shared/Item";
import noProfilePic from "../../../public/icons/noPhoto.svg";
import { styled } from "@mui/material";
import Link from "next/link";

const StatisticsItemText = styled(Typography)`
  width: 100px;
  font-size: 14px;
  color: #878787;
  text-align: left;
`;

const StatisticsItemsContainer = styled(Box)`
  display: flex;
  gap: 70px;
`;

const StatisticsItemNumber = styled(Typography)`
  font-size: 14px;
  color: #325187;
`;

export default function LeftColumnMainPage() {
  let id: number = 10561654311;

  return (
    <Item
      sx={{
        border: "1.5px solid #00000011",
        maxHeight: "430px",
        pb: "10px",
      }}
      radius="8px"
    >
      <Link href={`/profile/${id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "17px 50px",
          }}
        >
          <Box
            sx={{
              width: "72px",
              height: "72px",
            }}
          >
            <Image src={noProfilePic} alt="profile pic" />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
              }}
              component="h4"
            >
              Kurban Ramazanov
            </Typography>
            <Typography
              sx={{
                color: "#7F7F7F",
                fontSize: "12px",
              }}
              component="div"
            >
              React, Next.js developer
            </Typography>
          </Box>
        </Box>
      </Link>

      <Divider />
      <Box
        sx={{
          p: "17px 50px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* DATA FROM API */}
        <StatisticsItemsContainer>
          <StatisticsItemText>Profile views</StatisticsItemText>
          <StatisticsItemNumber>590</StatisticsItemNumber>
        </StatisticsItemsContainer>
        <StatisticsItemsContainer>
          <StatisticsItemText>Post reactions</StatisticsItemText>
          <StatisticsItemNumber>13</StatisticsItemNumber>
        </StatisticsItemsContainer>
        <StatisticsItemsContainer>
          <StatisticsItemText>Followers</StatisticsItemText>
          <StatisticsItemNumber>126</StatisticsItemNumber>
        </StatisticsItemsContainer>
        <StatisticsItemsContainer>
          <StatisticsItemText>Following</StatisticsItemText>
          <StatisticsItemNumber>191</StatisticsItemNumber>
        </StatisticsItemsContainer>
      </Box>
      <Divider />
      <Box>
        <Typography
          sx={{
            textAlign: "left",
            p: "10px 50px 5px 50px",
          }}
        >
          Your shortcuts
        </Typography>
        <Box
          sx={{
            p: "0 50px 0 50px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6495ED",
            }}
          >
            Ctrl + Alt + Delete Club
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#6495ED",
            }}
          >
            JS Gladiators
          </Typography>
        </Box>
      </Box>
    </Item>
  );
}
