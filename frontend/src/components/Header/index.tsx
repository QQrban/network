import NavigationMenu from "./NavigationMenu";
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
        zIndex: "9998",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "56px",
        gap: "20px",
        padding: "0 20px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchHeader />
      </Box>
      <NavigationMenu />
      <HeaderMenu />
    </Item>
  );
}
