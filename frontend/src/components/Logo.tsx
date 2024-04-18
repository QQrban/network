import { Box } from "@mui/material";
import Image from "next/image";
import logo from "../../public/icons/logo.svg";

export function Logo() {
  return (
    <Box
      sx={{
        cursor: "pointer",
        position: "absolute",
        left: "23px",
        top: "23px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="div"
    >
      <Image src={logo} alt="logo" />
      <Box
        sx={{
          color: "white",
          fontSize: "15px",
        }}
        component="span"
      >
        netWork
      </Box>
    </Box>
  );
}
