import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import BigLogo from "./BigLogo";
import { Item } from "./Item";

export default function LoadingScreen() {
  return (
    <Item
      radius="8px"
      sx={{
        border: "4px solid #4a4a4a",
        background: "#fff",
        width: "100%",
        height: "calc(100vh - 40px)",
        m: "0 auto",
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
    </Item>
  );
}
