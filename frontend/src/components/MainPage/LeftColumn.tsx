import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { Item } from "../shared/Item";
import noProfilePic from "../../../public/icons/profile.svg";
import { styled } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

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
          <Box
            sx={{
              width: "72px",
              height: "72px",
              border: "3px solid #6f6f6f",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image src={noProfilePic} alt="profile pic" />
          </Box>
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
      <Divider />
      <Box>
        <Typography
          sx={{
            textAlign: "left",
            p: "10px 50px 5px 50px",
            fontFamily: "Comic Neue",
            fontWeight: 600,
            fontSize: "18px",
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
              fontSize: "18px",
              color: "#6495ED",
              fontFamily: "Schoolbell",
            }}
          >
            Ctrl + Alt + Delete Club
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#6495ED",
              fontFamily: "Schoolbell",
            }}
          >
            JS Gladiators
          </Typography>
        </Box>
      </Box>
    </Item>
  );
}
