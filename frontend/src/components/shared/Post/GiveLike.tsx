import { fetchFromServer } from "@/lib/api";
import { ContactsProps, PostProps } from "@/types/types";
import { useRef, useState } from "react";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReactionToPost from "./ReactionToPost";
import likeIcon from "../../../../public/icons/like.svg";
import commentIcon from "../../../../public/icons/comment.svg";
import { Box, Divider, Typography } from "@mui/material";

interface Props {
  addLikeToPost: (postID: number, like: ContactsProps) => void;
  post: PostProps;
}

export default function GiveLike({ addLikeToPost, post }: Props) {
  const [likesAmount, setLikesAmount] = useState<{ [key: number]: number }>({});
  const inputRefs = useRef<{
    [key: number]: React.RefObject<HTMLTextAreaElement>;
  }>({});

  const giveLike = async (postID: number) => {
    try {
      const response = await fetchFromServer(`/post/${postID}/like`, {
        method: "PUT",
        credentials: "include",
      });
      if (response.ok) {
        const likes = await response.json();
        addLikeToPost(postID, likes);
        setLikesAmount((prevLikes) => ({
          ...prevLikes,
          [postID]: likes,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const focusInput = (postID: number) => {
    if (inputRefs.current[postID]?.current) {
      inputRefs.current[postID].current?.focus();
    }
  };

  return (
    <>
      {post.likes?.length > 0 && likesAmount[post.postID] !== 0 && (
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
            {likesAmount[post.postID] !== undefined
              ? likesAmount[post.postID]
              : post.likes.length}
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
          onClick={() => giveLike(post.postID)}
        />
        <ReactionToPost
          icon={<Image src={commentIcon} alt="comment" />}
          label="Comment"
          onClick={() => focusInput(post.postID)}
        />
      </Box>
    </>
  );
}
