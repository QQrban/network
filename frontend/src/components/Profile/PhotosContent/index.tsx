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
    <Box sx={{ mt: "23px", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
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
          {photos.length > 0 ? (
            isMainBoard ? (
              photos
                .slice(0, 4)
                .map((photo, index) => (
                  <PhotoItem index={index} key={index} photo={photo} />
                ))
            ) : (
              photos.map((photo, index) => (
                <PhotoItem index={index} key={index} photo={photo} />
              ))
            )
          ) : (
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "40px",
                fontFamily: "Gloria Hallelujah !important",
              }}
            >
              This user has no photos
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

interface PhotoItemProps {
  index: number;
  photo: {
    postID: number;
    image: string;
  };
}

function PhotoItem({ photo, index }: PhotoItemProps) {
  return (
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
            style={{ objectFit: "cover" }}
          />
        </Item>
      </Box>
    </Link>
  );
}
