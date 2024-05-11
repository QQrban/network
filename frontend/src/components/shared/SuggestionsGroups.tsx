import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Item } from "./Item";
import mockBg from "../../../public/icons/google.svg";
import addIcon from "../../../public/icons/add.svg";
import Image from "next/image";

export default function SuggestionsGroups() {
  return (
    <Box
      sx={{
        top: "90px",
      }}
    >
      <Box>
        <Typography
          sx={{ color: "#2a2a2a", fontFamily: "Schoolbell", fontSize: "26px" }}
          variant="h5"
        >
          This might interest you
        </Typography>
        <Item
          sx={{
            boxShadow: "none",
            mt: "8px",
            p: "10px",
          }}
          radius="8px"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {[0, 1, 2].map((_, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", gap: "9px" }}>
                  <Avatar
                    alt="Cats"
                    src={mockBg}
                    sx={{
                      border: "2px solid #4a4a4a",
                      width: 56,
                      height: 56,
                      fontSize: "28px",
                      fontFamily: "Schoolbell !important",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Schoolbell, cursive",
                        fontWeight: 600,
                        color: "#2a2a2a",
                        fontSize: "17px",
                      }}
                    >
                      CuteCatsClub
                    </Typography>
                    <Typography
                      sx={{
                        color: "#a2a1a1",
                        fontSize: "15px",
                        fontFamily: "Comic Neue",
                      }}
                    >
                      Animal lovers
                    </Typography>
                  </Box>
                </Box>
                <Tooltip
                  placement="right"
                  title={
                    <Typography
                      sx={{
                        fontFamily: "Schoolbell !important",
                        letterSpacing: "2px",
                      }}
                      fontSize={16}
                    >
                      Join Group
                    </Typography>
                  }
                >
                  <IconButton>
                    <Image
                      style={{ width: "30px", height: "30px" }}
                      src={addIcon}
                      alt="add"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Box>
        </Item>
      </Box>
    </Box>
  );
}
