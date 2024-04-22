"use client";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

interface ItemProps {
  radius: string;
}

export const Item = styled(Paper)<ItemProps>(({ radius }) => ({
  boxShadow: "0 2px 2px #0000003f",
  borderRadius: radius,
}));
