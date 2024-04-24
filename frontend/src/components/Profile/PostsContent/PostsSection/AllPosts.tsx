import { Box } from "@mui/material";
import PostsSection from "./PostsSection";

interface Props {
  posts: Array<string>;
}

export default function AllPosts({ posts }: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: 9998,
        bgcolor: "#0000003b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box id="posts-section" onClick={(e) => e.stopPropagation()}>
        {posts?.map((post, index) => (
          <PostsSection key={index} />
        ))}
      </Box>
    </Box>
  );
}
