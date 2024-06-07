import { Box, Typography, useMediaQuery } from "@mui/material";
import SuggestionGroups from "../shared/SuggestionsGroups";
import ContactsSection from "../shared/ContactsSection";

export default function RightColumn() {
  const matchesXL = useMediaQuery("(min-width:1389px)");

  return (
    <Box
      sx={{
        position: matchesXL ? "sticky" : "relative",
        top: matchesXL ? "90px" : "0px",
        width: matchesXL ? "350px" : "unset",
        height: "900px",
      }}
    >
      {matchesXL && <SuggestionGroups />}
      <Box sx={{ mt: "23px" }}>
        <Typography
          sx={{
            color: "#2a2a2a",
            fontFamily: "Schoolbell",
            fontSize: matchesXL ? "26px" : "20px",
          }}
          variant="h5"
        >
          You might know them
        </Typography>
        <Box sx={{ mt: "8px" }}>
          <ContactsSection />
        </Box>
      </Box>
    </Box>
  );
}
