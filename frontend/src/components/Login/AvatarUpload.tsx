import { useState } from "react";
import { Avatar, Box, Input } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import profileIcon from "../../../public/icons/profile.svg";

interface AvatarUploadProps {
  onChange: (file: File | null) => void;
}

export default function AvatarUpload({ onChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
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
              width: 170,
              height: 170,
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </label>
    </Box>
  );
}
