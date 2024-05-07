import { Box } from "@mui/material";
import PostsSection from "../shared/PostsSection";
import CreatePost from "../shared/CreatePost";

export default function MiddleColumn() {
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <CreatePost />
      </Box>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          flexDirection: "column",
          gap: "23px",
        }}
      >
        {[0, 1, 2, 3, 4].map((_, index) => (
          <PostsSection key={index} />
        ))}
      </Box>
    </Box>
  );
}
