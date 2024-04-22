import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";
import CreatePost from "./CreatePost";
import ContactInfo from "./ContactInfo";
import Education from "./Education";
import PostsSection from "./PostsSection";

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
          width: "50%",
        }}
      >
        <CreatePost />
        <PostsSection />
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
