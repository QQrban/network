import { Box, Typography } from "@mui/material";
import mockBG from "../../../../public/mockBG.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function ProfileBackground() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${mockBG.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "250px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "70px",
          p: "6px 10px",
          position: "absolute",
          right: "10px",
          bottom: "10px",
          borderRadius: "8px",
        }}
      >
        <BorderColorIcon sx={{ fontSize: "20px" }} />
        <Typography
          component="span"
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: "2A2A2A",
          }}
        >
          Edit
        </Typography>
      </Box>
    </Box>
  );
}
