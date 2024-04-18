import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Paper, InputBase } from "@mui/material";

export default function SearchHeader() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 270,
        height: 35,
        bgcolor: "#325187d1",
        borderRadius: "10px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon sx={{ color: "white", fontSize: "30px" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder="Search netWork"
        inputProps={{ "aria-label": "search through the website" }}
      />
    </Paper>
  );
}
