import { useState } from "react";
import { Avatar, Box, Input } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import profileIcon from "../../../public/icons/profile.svg";

interface AvatarUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarUpload({ onChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange(e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Input
        id="avatar-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="avatar-upload">
        <Tooltip title="Upload Avatar">
          <Avatar
            src={preview || profileIcon.src}
            sx={{
              mt: "10px",
              border: "4px solid #4a4a4a",
              width: 90,
              height: 90,
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </label>
    </Box>
  );
}
