import { Box, IconButton, styled } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../public/icons/profile.svg";
import confirmBtn from "../../../../public/icons/confirmButton.svg";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import { fetchFromServer } from "@/lib/api";
import { CommentProps } from "@/types/types";
import { useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";

interface AddCommentProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  postID: number;
  addComment: (postID: number, comment: CommentProps) => void;
}

export default function AddComment({
  inputRef,
  postID,
  addComment,
}: AddCommentProps) {
  const [commentText, setCommentText] = useState<string>("");

  const userImage = useSelector((state: any) => state.authReducer.value.image);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      const response = await fetchFromServer(`/post/${postID}/comment`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ content: commentText, images: "" }),
      });
      if (response.ok) {
        const newComment: CommentProps = await response.json();
        addComment(postID, newComment);
        setCommentText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <ProfileImage width={40} height={40} image={userImage} />
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <TextareaAutosize
            ref={inputRef}
            maxLength={1250}
            aria-label="empty textarea"
            placeholder="Type something..."
            value={commentText}
            onChange={handleTextChange}
          />
        </Box>
      </Box>
      {commentText.trim() && (
        <Box
          sx={{
            p: "0 10px 10px 60px",
            width: "180px",
          }}
        >
          <ConfirmBtn
            onClick={handleAddComment}
            backgroundImage={confirmBtn.src}
            text="Comment"
          />
        </Box>
      )}
    </Box>
  );
}

const TextareaAutosize = styled(BaseTextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'Comic Neue', sans-serif;
  font-size: 15px;
  resize: none;
  line-height: 1.5;
  padding: 8px 75px 8px 12px;
  border-radius: 8px;
  color: #1C2025;
  background: #fff;
  border: 2px solid #868686;
  box-shadow: 0px 2px 2px #F3F6F9;
  &:hover {
    border-color: #3399FF;
  }
  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 3px #80BFFF;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
