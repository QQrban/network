"use client";

import { Item } from "@/components/shared/Item";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

import { useEffect, useState } from "react";
import { PostProps } from "@/types/types";
import Link from "next/link";

interface PhotosContentProps {
  posts: PostProps[];
  isMainBoard: boolean;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}

interface PhotosProps {
  postID: number;
  image: string;
}

export default function PhotosContent({
  isMainBoard,
  setSelectedTab,
  posts,
}: PhotosContentProps) {
  const [photos, setPhotos] = useState<PhotosProps[]>([]);
  console.log(posts);

  useEffect(() => {
    const allPhotos: PhotosProps[] = [];

    posts.forEach((post) => {
      const photosArr = post.images.split(",");
      photosArr.forEach((image) => {
        image !== "" && allPhotos.push({ postID: post.postID, image });
      });
    });

    setPhotos(allPhotos);
  }, [posts]);

  return (
    <Box sx={{ mt: "23px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Gloria Hallelujah !important",
            fontSize: "30px",
            p: `${!isMainBoard && "0 60px"}`,
          }}
        >
          Photos
        </Typography>
        {isMainBoard && (
          <Button onClick={() => setSelectedTab("Photos")}>
            <Typography
              sx={{
                fontFamily: "Gloria Hallelujah !important",
                fontSize: "18px",
              }}
            >
              View All Photos &#x2192;
            </Typography>
          </Button>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          mt: "18px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "23px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {photos.slice(0, 4).map((photo, index) => (
            <Link href={`/post/${photo.postID}`} key={index}>
              <Box
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    filter: "brightness(96%)",
                  },
                }}
              >
                <Item
                  sx={{
                    width: "220px",
                    height: "270px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  radius="8px"
                >
                  <Image
                    src={`http://localhost:8888/file/${photo.image}`}
                    alt={`Photo from post ${photo.postID}`}
                    fill
                    objectFit="cover"
                  />
                </Item>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
