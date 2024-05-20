"use client";

import { Item } from "@/components/shared/Item";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/icons/profile.svg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReactionToPost from "../Profile/MainBoard/PostsSection/ReactionToPost";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentsPost from "../Profile/MainBoard/PostsSection/CommentsPost";
import mockBg from "../../../public/mockBG.png";
import likeIcon from "../../../public/icons/like.svg";
import commentIcon from "../../../public/icons/comment.svg";
import AddComment from "../Profile/MainBoard/PostsSection/AddComment";
import { createRef, useRef } from "react";
import { PostProps } from "@/types/types";
import dayjs from "dayjs";

interface PostsSectionProps {
  posts: PostProps[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  const inputRefs = useRef<{
    [key: number]: React.RefObject<HTMLTextAreaElement>;
  }>({});

  const focusInput = (postID: number) => {
    if (inputRefs.current[postID]?.current) {
      inputRefs.current[postID].current?.focus();
    }
  };

  const reactions: Array<string> = [
    "Johnny Bravo",
    "Albert Einstein",
    "Toomas Vooglaid",
    "Alexander Gustaffson",
    "Alex Volkanovski",
    "Kersti Kaljulaid",
  ];

  return (
    <>
      {posts?.map((post) => {
        if (!inputRefs.current[post.postID]) {
          inputRefs.current[post.postID] = createRef<HTMLTextAreaElement>();
        }

        return (
          <Item
            key={post.postID}
            sx={{
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Box
                  sx={{
                    width: "36px",
                    height: "36px",
                    overflow: "hidden",
                    border: "2px solid #4a4a4a",
                    borderRadius: "50%",
                  }}
                >
                  <Image src={noPhoto} alt="" />
                </Box>
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
            {post.images && (
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  border: "1px solid grey",
                  m: "0 auto",
                  background: `url(${mockBg.src})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></Box>
            )}
            {post.likes.length > 0 && (
              <Box
                sx={{
                  p: "10px 17px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#6495ED",
                    padding: "3px",
                    borderRadius: "50%",
                    width: "19px",
                    height: "19px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ThumbUpIcon sx={{ color: "#fff", fontSize: "14px" }} />
                </Box>
                <Typography
                  sx={{
                    color: "#8F8F8F",
                    fontSize: "16px",
                    fontFamily: "Schoolbell !important",
                  }}
                >
                  {`${reactions[0]} and ${reactions.length} others`}
                </Typography>
              </Box>
            )}
            <Divider />
            <Box
              sx={{
                p: "10px 17px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "40px",
              }}
            >
              <ReactionToPost
                icon={<Image src={likeIcon} alt="like" />}
                label="Like"
                onClick={() => console.log("Like")}
              />
              <ReactionToPost
                icon={<Image src={commentIcon} alt="comment" />}
                label="Comment"
                onClick={() => focusInput(post.postID)}
              />
            </Box>
            <Divider />
            <CommentsPost />
            <AddComment inputRef={inputRefs.current[post.postID]} />
          </Item>
        );
      })}
    </>
  );
}
