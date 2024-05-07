import { IconButton, InputBase, Box } from "@mui/material";
import search from "../../../public/icons/search.svg";
import Image from "next/image";

export default function SearchHeader() {
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 35,
        bgcolor: "transparent",
        border: "1px solid #4b4b4b",
        borderRadius: "10px",
      }}
    >
      <IconButton
        type="button"
        sx={{ p: "10px", pointerEvents: "none" }}
        aria-label="search"
      >
        <Image style={{ width: 25 }} src={search} alt="search" />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "black",
          fontFamily: "Schoolbell",
          fontSize: "20px",
        }}
        placeholder="Search SketchSphere"
        inputProps={{ "aria-label": "search through the website" }}
      />
    </Box>
  );
}
