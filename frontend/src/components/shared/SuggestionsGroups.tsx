import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Item } from "./Item";
import addIcon from "../../../public/icons/add.svg";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function SuggestionGroups() {
  const suggestionsGroups = useSelector(
    (state: any) => state.suggestionsReducer.Groups
  );

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
          This Groups might interest you
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
            {suggestionsGroups.map((suggestion: any) => (
              <Box
                key={suggestion.ID}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", gap: "9px" }}>
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
                      {suggestion.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#a2a1a1",
                        fontSize: "15px",
                        fontFamily: "Comic Neue",
                      }}
                    >
                      {suggestion.description.length > 20
                        ? suggestion.description.slice(0, 22) + "..."
                        : suggestion.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Item>
      </Box>
    </Box>
  );
}
