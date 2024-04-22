import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";

import CreatePost from "./CreatePost";

export default function PostsContent() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "23px",
      }}
    >
      <Box
        sx={{
          width: "35%",
        }}
      >
        <CreatePost />
        <Item
          sx={{
            mt: "23px",
            height: "1400px",
          }}
          radius="8px"
        >
          POST
        </Item>
      </Box>
      <Box>
        <Item radius="8px">contact info</Item>
        <Item radius="8px">education</Item>
      </Box>
    </Box>
  );
}
