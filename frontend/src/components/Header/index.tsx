import { Item } from "../shared/Item";
import HeaderMenu from "./HeaderMenu";
import SearchHeader from "./SearchHeader";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <Item
      radius="0"
      sx={{
        position: "sticky",
        top: "0",
        zIndex: "1051",
        border: "none",
        borderBottom: "3px solid #b0b0b0",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "70px",
        gap: "20px",
        padding: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchHeader />
      </Box>
      <HeaderMenu />
    </Item>
  );
}
