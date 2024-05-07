import { Box, Typography } from "@mui/material";
import logo from "../../../public/icons/globalNet.svg";
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
        variant="h1"
        component="h1"
        sx={{
          fontFamily: "Schoolbell",
          fontSize: "38px",
        }}
      >
        SketchSphere
      </Typography>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          mt: "8px",
          fontFamily: "Schoolbell",
          fontSize: "28px",
        }}
      >
        Where you want to meet people, chat, and don&apos;t want to leave!
      </Typography>
    </Box>
  );
}
