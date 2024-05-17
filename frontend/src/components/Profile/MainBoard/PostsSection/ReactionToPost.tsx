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
      <Box
        sx={{
          width: "30px",
          height: "30px",
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          color: "#4a4a4a",
          fontFamily: "Gloria Hallelujah !important",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
