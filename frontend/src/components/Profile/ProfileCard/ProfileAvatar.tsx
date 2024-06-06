import { Box } from "@mui/material";
import noPhoto from "../../../../public/icons/profile.svg";
import cameraIcon from "../../../../public/icons/photo.svg";
import Image from "next/image";
import TooltipStyled from "@/components/shared/TooltipStyled";

interface ProfileAvatarProps {
  avatar: string;
  isYourProfile: boolean;
  handleAvatarChange: (file: File | null) => void;
}

export default function ProfileAvatar({
  avatar,
  isYourProfile,
  handleAvatarChange,
}: ProfileAvatarProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {isYourProfile ? (
        <TooltipStyled title="Change Avatar">
          <Box
            sx={{
              position: "relative",
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              backgroundImage: avatar
                ? `url(http://localhost:8888/file/${avatar})`
                : `url(${noPhoto.src})`,
              backgroundSize: "cover",
              backgroundColor: "#fff",
              backgroundRepeat: "no-repeat",
              border: "6px solid #408ac7",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("avatar-upload")?.click()}
          >
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                handleAvatarChange(file);
              }}
            />
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
              <Image
                width={40}
                height={40}
                src={cameraIcon}
                alt="Camera icon"
              />
            </Box>
          </Box>
        </TooltipStyled>
      ) : (
        <Box
          sx={{
            width: "170px",
            height: "170px",
            borderRadius: "50%",
            backgroundImage: avatar
              ? `url(http://localhost:8888/file/${avatar})`
              : `url(${noPhoto.src})`,
            backgroundSize: "cover",
            backgroundColor: "#fff",
            backgroundRepeat: "no-repeat",
            border: "6px solid #408ac7",
            backgroundPosition: "center",
            position: "relative",
          }}
        />
      )}
    </Box>
  );
}
