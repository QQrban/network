import { Box, Button } from "@mui/material";
import CreatePost from "./CreatePost";
import ContactInfo from "./ContactInfo";
import Education from "./Education";
import PostsSection from "./PostsSection/PostsSection";

export default function PostsContent() {
  const posts = ["post", "post", "post", "post"];
  return (
    <Box
      sx={{
        display: "flex",
        gap: "23px",
        overflow: "auto",
        pb: "40px",
      }}
    >
      <Box
        sx={{
          width: "50%",
        }}
      >
        <CreatePost />
        {posts?.length > 1
          ? posts.slice(0, 1).map((post) => (
              <>
                <PostsSection key={post} />
              </>
            ))
          : posts.map((post) => <PostsSection key={post} />)}
        {posts?.length > 2 && (
          <Button
            sx={{
              mt: "20px",
            }}
          >
            View All Posts &#x2192;
          </Button>
        )}
      </Box>
      <Box
        sx={{
          width: "50%",
        }}
      >
        <ContactInfo />
        <Education />
      </Box>
    </Box>
  );
}
