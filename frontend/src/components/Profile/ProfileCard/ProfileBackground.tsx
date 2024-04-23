import { Box, Button, Typography, styled } from "@mui/material";
import mockBG from "../../../../public/mockBG.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const StyledBtn = styled(Button)({
  backgroundColor: "white",
  color: "black",
  textTransform: "capitalize",
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
  "&:hover": {
    backgroundColor: "white",
  },
  "&:active": {
    backgroundColor: "white",
  },
});

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
      <StyledBtn>
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
      </StyledBtn>
    </Box>
  );
}
