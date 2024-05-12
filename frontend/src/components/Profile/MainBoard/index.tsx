"use client";

import { Box, Button, Typography } from "@mui/material";
import CreatePost from "../../shared/CreatePost";
import PostsSection from "../../shared/PostsSection";
import { useRouter } from "next/navigation";
import { Item } from "@/components/shared/Item";
import PhotosContent from "../PhotosContent";

interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

export default function MainBoard({ setSelectedTab }: Props) {
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
          width: "600px",
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
                fontFamily: "Gloria Hallelujah",
                fontSize: "18px",
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
      <Box>
        <Item
          radius="8px"
          sx={{
            width: "100%",
            p: "10px 20px",
            alignSelf: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Gloria Hallelujah !important",
              fontWeight: 600,
              fontSize: "28px",
            }}
          >
            About
          </Typography>
          <Typography sx={{ mt: "13px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac porttitor odio. Quisque suscipit neque arcu, non volutpat orci
            condimentum nec. Morbi efficitur a mauris a ultrices. Sed luctus,
            nibh id facilisis ullamcorper, diam purus euismod odio, quis
            fringilla sapien ligula eu dolor. Nunc id tempor mi. Nunc id urna eu
            nisl venenatis aliquet. Donec id urna rutrum, scelerisque ex
            facilisis, rhoncus elit. Nunc tellus felis, aliquam nec pharetra ac,
            rhoncus eu erat. Suspendisse maximus pellentesque pulvinar. In hac
            habitasse platea dictumst. Fusce tempus volutpat felis, vitae
            faucibus eros eleifend nec. Maecenas commodo luctus leo ut ornare.
          </Typography>
        </Item>
        <PhotosContent setSelectedTab={setSelectedTab} isMainBoard={true} />
      </Box>
    </Box>
  );
}
