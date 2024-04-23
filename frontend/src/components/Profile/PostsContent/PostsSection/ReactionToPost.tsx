import { Box, Typography } from "@mui/material";
import { ReactNode, MouseEventHandler } from "react";

interface ReactionProps {
  icon: ReactNode;
  label: string;
  onClick?: MouseEventHandler;
}

export default function ReactionToPost({
  icon,
  label,
  onClick,
}: ReactionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {icon}
      <Typography sx={{ color: "#8F8F8F" }}>{label}</Typography>
    </Box>
  );
}
