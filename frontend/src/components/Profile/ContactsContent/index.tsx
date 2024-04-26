"use client";

import { Box, Button, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { FollowersProps, followers, followings } from "./mock";
import { Item } from "@/components/shared/Item";
import Image from "next/image";
import noPhoto from "../../../../public/Nophoto.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 12px;
  width: 120px;
  left: 50%;
  transform: translateX(-50%);
`;

export default function ContactsContent() {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [peopleList, setPeopleList] = useState<FollowersProps[]>(followers);

  useEffect(() => {
    activeTab ? setPeopleList(followers) : setPeopleList(followings);
  }, [activeTab]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "26px",
        }}
      >
        <Button
          onClick={() => setActiveTab(true)}
          variant={activeTab ? "contained" : "outlined"}
        >
          Followers
        </Button>
        <Button
          onClick={() => setActiveTab(false)}
          variant={!activeTab ? "contained" : "outlined"}
        >
          Following
        </Button>
      </Box>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          gap: "29px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {peopleList?.length ? (
          peopleList.map((follower, index) => (
            <Item
              sx={{
                width: "225px",
                height: "260px",
                p: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
                border: "1px solid #00000011",
                position: "relative",
              }}
              key={index}
              radius="12px"
            >
              <SpeedDial
                sx={{
                  position: "absolute",
                  top: "6px",
                  right: "-2px",
                }}
                ariaLabel="SpeedDial openIcon example"
                icon={<MoreVertIcon sx={{ color: "grey" }} />}
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
                  icon={<EmailIcon />}
                  tooltipTitle="SEND EMAIL"
                />

                {follower.following ? (
                  <SpeedDialAction
                    icon={<PersonRemoveIcon />}
                    tooltipTitle="UNFOLLOW"
                  />
                ) : (
                  <SpeedDialAction
                    icon={<PersonAddIcon />}
                    tooltipTitle="FOLLOW"
                  />
                )}
              </SpeedDial>
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                }}
              >
                <Image
                  src={follower.avatar ? follower.avatar : noPhoto}
                  alt={follower.name}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontWeight: 600, color: "#2a2a2a", fontSize: "18px" }}
                >
                  {follower.name}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "ThreeDShadow" }}>
                  {follower.position}
                </Typography>
                {follower.following ? (
                  <StyledButton
                    sx={{ opacity: 0.9 }}
                    variant="contained"
                    color="primary"
                  >
                    Unfollow
                  </StyledButton>
                ) : (
                  <StyledButton variant="outlined" color="primary">
                    Follow
                  </StyledButton>
                )}
              </Box>
            </Item>
          ))
        ) : (
          <Typography sx={{ fontSize: "30px" }}>
            {activeTab ? "No followers yet" : "Not following anyone yet."}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
