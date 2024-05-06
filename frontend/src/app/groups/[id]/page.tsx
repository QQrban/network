/* eslint-disable react/no-unescaped-entities */
import { Item } from "@/components/shared/Item";
import {
  Avatar,
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  Typography,
} from "@mui/material";
import mockBg from "../../../../public/mockBG.png";
import noPhoto from "../../../../public/background-svgrepo-com.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SuggestionsGroups from "@/components/shared/SuggestionsGroups";

export default function GroupPage() {
  return (
    <Box
      sx={{
        p: "40px",
        display: "flex",
        gap: "23px",
        position: "relative",
      }}
    >
      <Item
        sx={{
          width: "70%",
          overflow: "hidden",
          position: "relative",
          alignSelf: "flex-start",
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
        <Box sx={{ p: "90px 0 20px 40px" }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Green energy lovers
          </Typography>
          <Typography sx={{ color: "#979797" }}>98327 members</Typography>
          <Button variant="contained" sx={{ mt: "23px" }}>
            Join Group
          </Button>
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
              icon={<ContentCopyIcon />}
              tooltipTitle="COPY LINK"
            />
          </SpeedDial>
        </Box>
      </Item>
      <Box
        sx={{
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
          <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
            About
          </Typography>
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
          <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
            Admins
          </Typography>
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
                  fontWeight: 600,
                  fontSize: "17px",
                }}
              >
                Albert Einstein
              </Typography>
              <Typography
                sx={{
                  color: "#0000007b",
                  fontSize: "13px",
                }}
              >
                Theoretical physicist
              </Typography>
            </Box>
          </Box>
        </Item>
        <SuggestionsGroups />
      </Box>
    </Box>
  );
}
