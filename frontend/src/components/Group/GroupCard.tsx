import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { Item } from "../shared/Item";
import ConfirmBtn from "../shared/ConfirmBtn";
import cardBg from "../../../public/icons/cardBG.svg";

import confirmBtn from "../../../public/icons/confirmButton.svg";
import successBtn from "../../../public/icons/successBtn.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import copyIcon from "../../../public/icons/copy.svg";
import CreatePost from "../shared/CreatePost";
import PostsSection from "../shared/PostsSection";
import EventSection from "../Events/EventSection";
import { yourEvents } from "../Events/mock";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

const StyledTab = styled(Tab)`
  font-family: Gloria Hallelujah, sans-serif;
  font-size: 18px;
`;

interface GroupCardProps {
  groupTitle: string;
  activeTab: string;
  setActiveTab: React.Dispatch<string>;
  setOpenPostModal: React.Dispatch<boolean>;
}

export default function GroupCard({
  groupTitle,
  activeTab,
  setActiveTab,
  setOpenPostModal,
}: GroupCardProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "600px" }}>
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
            p: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <StyledTypography>{groupTitle}</StyledTypography>
          <Typography sx={{ color: "#979797" }}>98327 members</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "23px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "120px" }}>
              <ConfirmBtn backgroundImage={confirmBtn.src} text="Invite" />
            </Box>
            <Box sx={{ width: "190px" }}>
              <ConfirmBtn
                backgroundImage={successBtn.src}
                text="Create Event"
              />
            </Box>
          </Box>
          <SpeedDial
            sx={{
              position: "absolute",
              top: "20px",
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
              gap: "23px",
            }}
          >
            <CreatePost setOpenPostModal={setOpenPostModal} />
            <PostsSection />
            <PostsSection />
            <PostsSection />
            <PostsSection />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mt: "23px",
            display: "flex",
            flexDirection: "column",
            gap: "23px",
          }}
        >
          <EventSection events={yourEvents} />
        </Box>
      )}
    </Box>
  );
}
