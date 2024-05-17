import { Box } from "@mui/material";
import noPhoto from "../../../../public/icons/profile.svg";
import cameraIcon from "../../../../public/icons/photo.svg";
import Image from "next/image";

export default function ProfileAvatar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          backgroundImage: `url(${noPhoto.src})`,
          backgroundSize: "cover",
          backgroundColor: "#fff",
          backgroundRepeat: "no-repeat",
          border: "6px solid #408ac7",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bgcolor: "white",
            p: "6px",
            right: "5px",
            bottom: "-5px",
            border: "2px solid grey",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "45px",
            height: "45px",
          }}
        >
          <Image width={40} height={40} src={cameraIcon} alt="" />
        </Box>
      </Box>
    </Box>
  );
}
