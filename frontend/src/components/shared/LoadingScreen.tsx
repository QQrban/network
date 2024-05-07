import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Logo } from "../Logo";
import BigLogo from "./BigLogo";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        background: "#fff",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "40%",
          m: "0 auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BigLogo />
        <LinearProgress sx={{ mt: "25px" }} />
      </Box>
    </Box>
  );
}
