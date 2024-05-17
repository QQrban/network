import { Box } from "@mui/material";
import Image from "next/image";
import logo from "../../public/icons/logo.svg";

export function Logo() {
  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
      component="div"
    >
      <Image src={logo} alt="logo" />
    </Box>
  );
}
