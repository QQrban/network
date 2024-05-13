/* eslint-disable react/no-unescaped-entities */
"use client";

import { Item } from "@/components/shared/Item";
import {
  Avatar,
  Box,
  SpeedDial,
  SpeedDialAction,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import mockBg from "../../../../public/mockBG.png";
import cardBg from "../../../../public/icons/cardBG.svg";
import profileIcon from "../../../../public/icons/profile.svg";
import noPhoto from "../../../../public/background-svgrepo-com.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SuggestionsGroups from "@/components/shared/SuggestionsGroups";
import Link from "next/link";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import confirmBtn from "../../../../public/icons/confirmButton.svg";
import copyIcon from "../../../../public/icons/copy.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreatePost from "@/components/shared/CreatePost";
import PostsSection from "@/components/shared/PostsSection";
import EventSection from "@/components/Events/EventSection";
import { yourEvents } from "@/components/Events/mock";
import { usePathname } from "next/navigation";
import { fetchFromServer } from "@/lib/api";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

const StyledTab = styled(Tab)`
  font-family: Gloria Hallelujah, sans-serif;
  font-size: 18px;
`;

export default function GroupPage() {
  const [mainInfo, setMainInfo] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("posts");

  const pathname = usePathname().split("/").pop();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetchFromServer(`/group/${pathname}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          throw new Error("Failed to fetch groups");
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    fetchGroup();
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        gap: "23px",
        position: "relative",
      }}
    >
      <Box sx={{ width: "70%" }}>
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
              width: "100%",
              height: "180px",
              backgroundImage: `url(${mockBg.src})`,
            }}
          ></Box>
          <Box
            sx={{
              width: "160px",
              height: "160px",
              border: "4px solid #ffffff",
              backgroundImage: `url(${noPhoto.src})`,
              backgroundColor: "white",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "absolute",
              top: "90px",
              left: "30px",
            }}
          ></Box>
          <Box
            sx={{
              p: "90px 0 6px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <StyledTypography>Green energy lovers</StyledTypography>
            <Typography sx={{ color: "#979797" }}>98327 members</Typography>
            <Box sx={{ maxWidth: "250px" }}>
              <ConfirmBtn
                backgroundImage={confirmBtn.src}
                text="Request to Join Group"
              />
            </Box>
            <SpeedDial
              sx={{
                position: "absolute",
                top: "190px",
                right: "12px",
              }}
              ariaLabel="SpeedDial openIcon example"
              icon={<MoreHorizIcon fontSize="large" sx={{ color: "grey" }} />}
              direction="down"
              FabProps={{
                sx: {
                  backgroundColor: "white",
                  width: "36px",
                  height: "32px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#00000014",
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
                icon={
                  <Image
                    style={{ width: "27px", height: "27px" }}
                    src={copyIcon}
                    alt="copy"
                  />
                }
                tooltipTitle={
                  <Typography
                    sx={{
                      fontFamily: "Schoolbell !important",
                      fontSize: "17px",
                    }}
                  >
                    Copy Group Link
                  </Typography>
                }
              />
            </SpeedDial>
          </Box>
          <Box sx={{ mt: "23px" }}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              aria-label="events tabs"
            >
              <StyledTab label="Posts" value="posts" />
              <StyledTab label="Events" value="events" />
            </Tabs>
          </Box>
        </Item>
        {activeTab === "posts" ? (
          <Box
            sx={{
              display: "flex",
              mt: "23px",
              gap: "23px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "600px",
                gap: "23px",
              }}
            >
              <CreatePost />
              <PostsSection />
              <PostsSection />
              <PostsSection />
              <PostsSection />
            </Box>
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
              {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (
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
        ) : (
          <Box>
            <EventSection events={yourEvents} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "sticky",
          top: "90px",
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: "23px",
          width: "30%",
        }}
      >
        <Item
          sx={{
            p: "14px",
          }}
          radius="8px"
        >
          <StyledTypography>About</StyledTypography>
          <Typography sx={{ mt: "9px" }}>
            Welcome to Green Energy Lovers, the ultimate hangout for those who
            get a buzz from buzzwords like "sustainable", "renewable", and "100%
            organic electricity". This group is for anyone who believes their
            love for Mother Earth can be measured in kilowatt-hours and those
            who dream of dating a wind turbine.
          </Typography>
        </Item>
        <Item
          sx={{
            p: "14px",
          }}
          radius="8px"
        >
          <StyledTypography>Admins</StyledTypography>
          <Link href="/profile/123">
            <Box
              sx={{
                mt: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Avatar src="/broken-image.jpg" />
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
        </Item>
        <SuggestionsGroups />
      </Box>
    </Box>
  );
}
