"use client";

import { Item } from "@/components/shared/Item";
import { Box, Divider, IconButton, Typography } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentsPost from "./CommentsPost";

import AddComment from "./AddComment";
import { createRef, useRef, useState } from "react";
import { CommentProps, ContactsProps, PostProps } from "@/types/types";
import dayjs from "dayjs";
import PostImage from "./PostImage";
import PostImageDialog from "./PostImageDialog";
import Link from "next/link";
import ProfileImage from "../ProfileImage";
import { useSelector } from "react-redux";
import { fetchFromServer } from "@/lib/api";
import GiveLike from "./GiveLike";

interface PostsSectionProps {
  posts: PostProps[];
  addCommentToPost: (postID: number, comment: CommentProps) => void;
  addLikeToPost: (postID: number, like: ContactsProps) => void;
}

export default function PostsSection({
  posts,
  addCommentToPost,
  addLikeToPost,
}: PostsSectionProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const userData = useSelector((state: any) => state.authReducer.value);
  const inputRefs = useRef<{
    [key: number]: React.RefObject<HTMLTextAreaElement>;
  }>({});

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  return (
    <>
      {posts?.map((post) => {
        if (!inputRefs.current[post.postID]) {
          inputRefs.current[post.postID] = createRef<HTMLTextAreaElement>();
        }

        const postImages = post.images && post.images.split(",");

        if (post.postID !== 0) {
          return (
            <Item
              key={post.postID}
              sx={{
                overflow: "hidden",
                width: "600px",
              }}
              radius="8px"
            >
              <Box
                sx={{
                  p: "5px 17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link href={`/profile/${post.authorID}`}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <ProfileImage
                      width={40}
                      height={40}
                      image={userData.image}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#2a2a2a",
                          fontFamily: "Gloria Hallelujah !important",
                        }}
                      >
                        {post.author.firstName} {post.author.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#BEBEBE",
                          fontSize: "14px",
                        }}
                      >
                        {dayjs(post.created).format("MMM D, YYYY")}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
                <IconButton
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <MoreHorizIcon
                    sx={{
                      color: "#8F8F8F",
                      fontSize: "35px",
                    }}
                  />
                </IconButton>
              </Box>
              <Box
                sx={{
                  p: "5px 17px",
                }}
              >
                <Typography>{post.content}</Typography>
              </Box>
              {postImages && postImages.length > 0 && (
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ overflow: "hidden" }}>
                    <PostImage
                      onClick={() => handleClickOpen(postImages[0])}
                      height="300px"
                      width={postImages.length === 1 ? "600px" : "400px"}
                      image={postImages[0]}
                    />
                  </Box>
                  {postImages.length > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: postImages.length === 2 ? "300px" : "150px",
                          overflow: "hidden",
                        }}
                      >
                        <PostImage
                          onClick={() => handleClickOpen(postImages[1])}
                          height="100%"
                          width="200px"
                          image={postImages[1]}
                        />
                      </Box>
                      {postImages.length > 2 && (
                        <Box sx={{ height: "150px", overflow: "hidden" }}>
                          <PostImage
                            onClick={() => handleClickOpen(postImages[2])}
                            height="100%"
                            width="200px"
                            image={postImages[2]}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              )}
              <GiveLike addLikeToPost={addLikeToPost} post={post} />
              <Divider />
              <CommentsPost comments={post.comments} />
              <AddComment
                postID={post.postID}
                inputRef={inputRefs.current[post.postID]}
                addComment={addCommentToPost}
              />
            </Item>
          );
        }
      })}
      <PostImageDialog
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
    </>
  );
}
