import {
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  Typography,
  styled,
} from "@mui/material";
import { FollowersProps } from "../Profile/ContactsContent/mock";
import { Item } from "./Item";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import noPhoto from "../../../public/Nophoto.jpg";

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 12px;
  width: 120px;
  left: 50%;
  transform: translateX(-50%);
`;

interface Props {
  peopleList: FollowersProps[];
  activeTab: string | boolean;
}

export default function FollowersSection({ peopleList, activeTab }: Props) {
  return (
    <>
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
              <SpeedDialAction icon={<EmailIcon />} tooltipTitle="SEND EMAIL" />

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
          {activeTab || activeTab === "Followers"
            ? "No followers yet"
            : "Not following anyone yet."}
        </Typography>
      )}
    </>
  );
}
