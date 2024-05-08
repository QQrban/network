"use client";

import { Box, IconButton, styled } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../../public/icons/profile.svg";
import confirmBtn from "../../../../../public/icons/confirmButton.svg";
import picture from "../../../../../public/icons/picture.svg";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import ConfirmBtn from "@/components/shared/ConfirmBtn";

interface CommentProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export default function AddComment({ inputRef }: CommentProps) {
  const [commentText, setCommentText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
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
        <Box
          sx={{
            maxWidth: "36px",
            height: "36px",
          }}
        >
          <Image src={noPhoto} alt="profile pic" />
        </Box>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: "0",
              gap: "10px",
              bottom: "0",
            }}
          >
            <IconButton>
              <Image
                style={{ width: "32px", height: "32px" }}
                src={picture}
                alt="picture"
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {commentText.trim() && (
        <Box
          sx={{
            p: "0 10px 10px 60px",
          }}
        >
          <ConfirmBtn backgroundImage={confirmBtn.src} text="Comment" />
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
