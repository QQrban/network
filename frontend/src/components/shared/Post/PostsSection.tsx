"use client";

import { Item } from "@/components/shared/Item";
import {
  Box,
  Button,
  Divider,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentsPost from "./CommentsPost";
import AddComment from "./AddComment";
import { createRef, useRef, useState } from "react";
import { CommentProps, ContactsProps, PostProps } from "@/types/types";
import dayjs from "dayjs";
import PostImage from "./PostImage";
import PostImageDialog from "./PostImageDialog";
import Link from "next/link";
import Image from "next/image";
import deleteIcon from "../../../../public/icons/delete.svg";
import copyIcon from "../../../../public/icons/copy.svg";
import ProfileImage from "../ProfileImage";
import { useSelector } from "react-redux";
import GiveLike from "./GiveLike";
import AlertDialog from "../Dialog";
import { fetchFromServer } from "@/lib/api";

interface PostsSectionProps {
  posts: PostProps[];
  addCommentToPost: (postID: number, comment: CommentProps) => void;
  addLikeToPost: (postID: number, like: ContactsProps) => void;
  deletePostFromList: (postID: number) => void;
}

export default function PostsSection({
  posts,
  addCommentToPost,
  addLikeToPost,
  deletePostFromList,
}: PostsSectionProps) {
  const [postID, setPostID] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string>("");

  const userData = useSelector((state: any) => state.authReducer.value);

  const matchesLG = useMediaQuery("(min-width:1200px)");
  const matchesSM = useMediaQuery("(min-width:635px)");

  const inputRefs = useRef<{
    [key: number]: React.RefObject<HTMLTextAreaElement>;
  }>({});

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const copyLink = (postID: number) => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${postID}`);
  };

  const deletePost = async (postID: number) => {
    try {
      const response = await fetchFromServer(`/post/${postID}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        deletePostFromList(postID);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (postID: number) => {
    setPostID(postID);
    setOpen(true);
  };

  const focusInput = (postID: number) => {
    if (inputRefs.current[postID]?.current) {
      inputRefs.current[postID].current?.focus();
    }
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
                position: "relative",
                overflow: "hidden",
                width: matchesLG ? "600px" : "100%",
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
                      image={post.author.image}
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
                <SpeedDial
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "6px",
                    right: "-2px",
                  }}
                  ariaLabel="SpeedDial openIcon example"
                  icon={
                    <MoreHorizIcon
                      sx={{
                        color: "#8F8F8F",
                        fontSize: "35px",
                      }}
                    />
                  }
                  direction="down"
                  FabProps={{
                    sx: {
                      backgroundColor: "white",
                      width: "36px",
                      height: "32px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:active": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                    },
                  }}
                >
                  <SpeedDialAction
                    onClick={() => copyLink(post.postID)}
                    icon={
                      <Image
                        width={30}
                        height={30}
                        src={copyIcon}
                        alt="copyLink"
                      />
                    }
                    tooltipTitle={
                      <Typography
                        sx={{
                          fontFamily: "Schoolbell !important",
                          fontSize: "20px",
                        }}
                      >
                        Copy link
                      </Typography>
                    }
                  />
                  {userData.id === post.author.ID && (
                    <SpeedDialAction
                      onClick={() => openModal(post.postID)}
                      icon={
                        <Image
                          width={30}
                          height={30}
                          src={deleteIcon}
                          alt="delete"
                        />
                      }
                      tooltipTitle={
                        <Typography
                          sx={{
                            fontFamily: "Schoolbell !important",
                            fontSize: "20px",
                          }}
                        >
                          Delete Post
                        </Typography>
                      }
                    />
                  )}
                </SpeedDial>
              </Box>
              <Box
                sx={{
                  p: "5px 17px",
                }}
              >
                <Typography sx={{ wordBreak: "break-word" }}>
                  {post.content}
                </Typography>
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
              <GiveLike
                addLikeToPost={addLikeToPost}
                post={post}
                focusInput={focusInput}
              />
              <Divider />
              <CommentsPost
                comments={loadMore ? post.comments : post.comments.slice(0, 3)}
              />
              {post.comments.length > 3 && (
                <Button
                  color="primary"
                  onClick={() => setLoadMore(!loadMore)}
                  sx={{ fontFamily: "Gloria Hallelujah", ml: "55px" }}
                >
                  {loadMore ? "Show Less" : "Load More..."}
                </Button>
              )}
              <AddComment
                postID={post.postID}
                inputRef={inputRefs.current[post.postID]}
                addComment={addCommentToPost}
              />
            </Item>
          );
        }
      })}
      <AlertDialog
        title="Are you sure you want to delete this post?"
        dialogText=""
        open={open}
        setOpen={setOpen}
        onConfirm={() => deletePost(postID)}
      />
      <PostImageDialog
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
    </>
  );
}
