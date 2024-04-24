"use client";

import { Box, Button, styled } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../../public/Nophoto.jpg";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import ImageIcon from "@mui/icons-material/Image";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { useState } from "react";

export default function AddComment() {
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
              right: "10px",
              gap: "10px",
              bottom: "10px",
            }}
          >
            <SentimentSatisfiedIcon sx={{ color: "#8F8F8F" }} />
            <ImageIcon sx={{ color: "#8F8F8F" }} />
          </Box>
        </Box>
      </Box>
      {commentText.trim() && (
        <Box
          sx={{
            p: "0 10px 10px 60px",
          }}
        >
          <Button
            sx={{
              height: "30px",
              textTransform: "capitalize",
            }}
            variant="contained"
          >
            Comment
          </Button>
        </Box>
      )}
    </Box>
  );
}

const TextareaAutosize = styled(BaseTextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  resize: none;
  line-height: 1.5;
  padding: 8px 75px 8px 12px;
  border-radius: 8px;
  color: #1C2025;
  background: #fff;
  border: 1px solid #DAE2ED;
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
