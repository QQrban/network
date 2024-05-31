import { Box, Button } from "@mui/material";
import noPhoto from "../../../../public/icons/profile.svg";
import cameraIcon from "../../../../public/icons/photo.svg";
import Image from "next/image";
import AvatarUpload from "@/components/Login/AvatarUpload";
import { useState } from "react";
import { fetchFromServer } from "@/lib/api";
interface ProfileAvatarProps {
  avatar: string;
  isYourProfile: boolean;
}
export default function ProfileAvatar({
  avatar,
  isYourProfile,
}: ProfileAvatarProps) {
  const [avatarUpload, setAvatar] = useState<File | null>(null);
  const handleAvatarChange = (file: File | null) => {
    setAvatar(file);
  };

  const handleSubmitAvatar = async () => {
    if (!avatarUpload) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarUpload);
    console.log("FormData entries:", formData);
    try {
      const response = await fetchFromServer("/user/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Avatar updated successfully:", data);
      } else {
        throw new Error("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {isYourProfile ? (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <AvatarUpload onChange={handleAvatarChange} />
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
              alt=""
              onClick={handleSubmitAvatar}
            />
          </Box>
        </Box>
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
