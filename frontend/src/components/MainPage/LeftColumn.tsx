import { Box, Button, Divider, Typography } from "@mui/material";
import { Item } from "../shared/Item";
import { styled } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileImage from "../shared/ProfileImage";
import { useCallback, useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";

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

interface UserStats {
  commented: number;
  comments: number;
  events: number;
  followers: number;
  following: number;
  groups: number;
  liked: number;
  likes: number;
  posts: number;
}

const statsMapping = {
  followers: "Followers",
  following: "Following",
  groups: "Groups",
  events: "Events",
  posts: "Posts",
};

const statsLinks = {
  followers: "/contacts",
  following: "/contacts",
  groups: "/groups",
  events: "/events",
};

export default function LeftColumn() {
  const [userStats, setUserStats] = useState<UserStats>();
  const userData = useSelector((state: any) => state.authReducer.value);
  const id = userData.id;

  const fetchFollowersStats = useCallback(async () => {
    try {
      const response = await fetchFromServer(`/stats/user/${id}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserStats(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      fetchFollowersStats();
    }, 1000);
  }, [fetchFollowersStats]);

  const getLink = (key: string) => {
    if (key === "posts") {
      return `/profile/all-posts/${id}`;
    }
    return statsLinks[key as keyof typeof statsLinks] || "#";
  };

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
      {userStats ? (
        <Box
          sx={{
            p: "17px 50px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {Object.entries(statsMapping).map(([key, label]) => (
            <Link key={key} href={getLink(key)}>
              <Button
                color="success"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                <StatisticsItemsContainer>
                  <StatisticsItemText>{label}</StatisticsItemText>
                  <StatisticsItemNumber>
                    {userStats[key as keyof UserStats]}
                  </StatisticsItemNumber>
                </StatisticsItemsContainer>
              </Button>
            </Link>
          ))}
        </Box>
      ) : (
        <Typography
          sx={{
            p: "20px",
            textAlign: "center",
            fontSize: "20px",
            fontFamily: "Gloria Hallelujah !important",
          }}
        >
          Loading Statistics
        </Typography>
      )}
    </Item>
  );
}
