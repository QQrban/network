"use client";

import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import CreatePost from "./CreatePost";
import ContactInfo from "./ContactInfo";
import EducationSection from "../../shared/EducationSection";
import PostsSection from "./PostsSection/PostsSection";
import { useRouter } from "next/navigation";
import ExperienceSection from "../../shared/ExperienceSection";
import { Item } from "@/components/shared/Item";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function MainBoard() {
  const posts = ["post", "post"];
  const router = useRouter();
  let id: number = 10561654311;

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "13px",
          }}
        >
          <Typography fontSize={22}>Posts</Typography>
          {posts?.length >= 2 && (
            <Button
              onClick={() => router.push(`/profile/${id}/all-posts`)}
              sx={{
                mt: "20px",
              }}
            >
              View All Posts &#x2192;
            </Button>
          )}
        </Box>
        {posts?.length >= 1 ? (
          posts.slice(0, 1).map((post) => <PostsSection key={post} />)
        ) : (
          <Typography
            fontSize={40}
            sx={{
              mt: "23px",
              height: "100px",
            }}
          >
            No Posts Yet
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: "50%",
        }}
      >
        <ContactInfo />
        <Item
          sx={{
            mt: "23px",
          }}
          radius="8px"
        >
          <Box
            sx={{
              p: "10px 17px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={20}>Education</Typography>
            <IconButton>
              <BorderColorIcon sx={{ color: "#2a2a2a" }} />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              p: "10px 17px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <EducationSection size="medium" />
          </Box>
        </Item>
        <Item
          sx={{
            mt: "23px",
          }}
          radius="8px"
        >
          <Box
            sx={{
              p: "10px 17px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={20}>Experience</Typography>
            <IconButton>
              <BorderColorIcon sx={{ color: "#2a2a2a" }} />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              p: "10px 17px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <ExperienceSection size="medium" />
          </Box>
        </Item>
      </Box>
    </Box>
  );
}
