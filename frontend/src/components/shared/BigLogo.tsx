import { Box, Typography } from "@mui/material";
import logo from "../../../public/icons/big-logo.svg";
import Image from "next/image";

export default function BigLogo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image src={logo} alt="big logo" />
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: "28px",
        }}
      >
        Connect, Discover, Advance – Your Career Network
      </Typography>
    </Box>
  );
}
