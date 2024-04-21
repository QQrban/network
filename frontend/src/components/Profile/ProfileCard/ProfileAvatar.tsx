import { Box } from "@mui/material";
import noPhoto from "../../../../public/Nophoto.jpg";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function ProfileAvatar() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box
        sx={{
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundImage: `url(${noPhoto.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          border: "6px solid #fff",
          backgroundPosition: "center",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bgcolor: "#6495ED",
          p: "6px",
          right: "10px",
          bottom: "10px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "35px",
          height: "35px",
        }}
      >
        <PhotoCameraIcon sx={{ color: "#fff" }} />
      </Box>
    </Box>
  );
}
