import { Item } from "../shared/Item";
import HeaderMenu from "./HeaderMenu";
import SearchHeader from "./SearchHeader";

export default function Header() {
  return (
    <Item
      radius="28px 28px 0 0"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "56px",
        gap: "20px",
        padding: "12px 20px",
      }}
    >
      <SearchHeader />
      <HeaderMenu />
    </Item>
  );
}
