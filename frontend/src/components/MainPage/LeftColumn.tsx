import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { Item } from "../shared/Item";
import noProfilePic from "../../../public/icons/profile.svg";
import { styled } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileImage from "../shared/ProfileImage";

const StatisticsItemText = styled(Typography)`
  width: 100px;
  font-size: 16px;
  color: #878787;
  font-family: "Comic Neue, cursive";
  text-align: left;
`;

const StatisticsItemsContainer = styled(Box)`
  display: flex;
  gap: 70px;
`;

const StatisticsItemNumber = styled(Typography)`
  font-size: 16px;
  font-family: "Comic Neue, cursive";
  color: #325187;
`;

export default function LeftColumn() {
  const userData = useSelector((state: any) => state.authReducer.value);

  return (
    <Item
      sx={{
        position: "sticky",
        top: "90px",
        width: "290px",
        alignSelf: "flex-start",
        pb: "10px",
      }}
      radius="8px"
    >
      <Link href={`/profile/${userData.id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "17px 50px",
          }}
        >
          <ProfileImage width={72} height={72} image={userData.image} />
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontFamily: "Schoolbell",
              }}
              component="h4"
            >
              {`${userData.firstName} ${userData.lastName}`}
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
        <StatisticsItemsContainer>
          <StatisticsItemText>Followers</StatisticsItemText>
          <StatisticsItemNumber>126</StatisticsItemNumber>
        </StatisticsItemsContainer>
        <StatisticsItemsContainer>
          <StatisticsItemText>Following</StatisticsItemText>
          <StatisticsItemNumber>191</StatisticsItemNumber>
        </StatisticsItemsContainer>
      </Box>
    </Item>
  );
}
