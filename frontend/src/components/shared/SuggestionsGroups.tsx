import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Item } from "./Item";
import mockBg from "../../../public/icons/google.svg";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function SuggestionsGroups() {
  return (
    <Box
      sx={{
        top: "90px",
      }}
    >
      <Box>
        <Typography sx={{ color: "#2a2a2a" }} variant="h5">
          This might interest you
        </Typography>
        <Item
          sx={{
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
            {[0, 1, 2, 3].map((_, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", gap: "9px" }}>
                  <Avatar
                    alt="Google"
                    src={mockBg}
                    sx={{ width: 56, height: 56 }}
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
                        fontWeight: 600,
                        color: "#2a2a2a",
                        fontSize: "14px",
                      }}
                    >
                      Google
                    </Typography>
                    <Typography sx={{ color: "#a2a1a1", fontSize: "13px" }}>
                      Software Development
                    </Typography>
                  </Box>
                </Box>
                <Tooltip placement="right" title="Join Group">
                  <IconButton>
                    <AddCircleIcon color="primary" fontSize="large" />
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
