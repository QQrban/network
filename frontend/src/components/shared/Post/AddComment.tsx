import { Box, IconButton, styled } from "@mui/material";
import confirmBtn from "../../../../public/icons/confirmButton.svg";
import { useState } from "react";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import { fetchFromServer } from "@/lib/api";
import { CommentProps } from "@/types/types";
import { useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import { TextareaAutosize } from "../styles";

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
        <ProfileImage width={35} height={35} image={userImage} />
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
