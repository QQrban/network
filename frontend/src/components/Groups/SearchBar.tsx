import { Box, InputBase, IconButton } from "@mui/material";
import Image from "next/image";
import searchIcon from "../../../public/icons/search.svg";

export default function SearchBar() {
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        border: "2px solid #4a4a4a",
        borderRadius: "16px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontFamily: "Schoolbell", fontSize: "21px" }}
        placeholder="Search for Groups"
        inputProps={{ "aria-label": "search groups" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Image
          style={{ width: "25px", height: "25px" }}
          src={searchIcon}
          alt="search"
        />
      </IconButton>
    </Box>
  );
}
