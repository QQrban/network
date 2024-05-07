"use client";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

interface ItemProps {
  radius: string;
}

export const Item = styled(Paper)<ItemProps>(({ radius }) => ({
  border: "2px solid #b0b0b0",
  borderRadius: radius,
}));
