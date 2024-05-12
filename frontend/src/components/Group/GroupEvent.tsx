import { Item } from "../shared/Item";
import { Box, Typography } from "@mui/material";
import mockBG from "../../../public/mockBG.png";
import confirmBtn from "../../../public/icons/confirmButton.svg";
import ConfirmBtn from "../shared/ConfirmBtn";

export default function GroupEvent() {
  return (
    <Item
      radius="8px"
      sx={{ display: "flex", justifyContent: "space-between" }}
    ></Item>
  );
}
