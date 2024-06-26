"use client";

import ShowPost from "@/components/Post/ShowPost";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Post() {
  const pathname = usePathname().split("/").pop();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "32px 29px 0 29px",
        gap: "23px",
      }}
      component="section"
    >
      <ShowPost pathname={pathname} />
    </Box>
  );
}
