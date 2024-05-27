"use client";

import PeopleList from "@/components/Chat/PeopleList";
import { Item } from "@/components/shared/Item";
import ProfileImage from "@/components/shared/ProfileImage";
import { TextareaAutosize } from "@/components/shared/styles";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import sendIcon from "../../../public/icons/send.svg";
import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleEmojiSelect = (emoji: any) => {
    setText((prevText) => prevText + emoji.emoji);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setOpenEmoji(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        p: "30px",
        gap: "40px",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        width: "100%",
        height: "calc(100vh - 160px)",
      }}
    >
      <Item
        radius="8px"
        sx={{
          p: "10px 30px",
          bgcolor: "white",
          zIndex: "4",
          width: "460px",
          overflowX: "none",
          overflowY: "scroll",
          pb: "23px",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <PeopleList />
      </Item>
      <Item radius="8px" sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "0",
            p: "10px",
            borderBottom: "2px solid #b0b0b0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ProfileImage width={45} height={45} image="" />
            <Typography
              sx={{
                fontFamily: "Gloria Hallelujah !important",
                fontSize: "20px",
              }}
            >
              Firstname Lastname
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            p: "10px",
          }}
        >
          <TextareaAutosize
            value={text}
            onChange={handleTextChange}
            placeholder="Type Something..."
            sx={{ maxHeight: "250px", fontSize: "18px" }}
            maxLength={1000}
          />

          <Box
            ref={emojiPickerRef}
            sx={{
              position: "absolute",
              bottom: "50px",
              right: "70px",
            }}
          >
            {openEmoji && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: "15px",
              bottom: "13px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              onClick={() => setOpenEmoji(!openEmoji)}
              sx={{ mt: "4px", zIndex: "50px" }}
              fontSize={29}
            >
              😀
            </Typography>
            {text.length > 0 && (
              <IconButton>
                <Image width={25} height={25} src={sendIcon} alt="" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Item>
    </Box>
  );
}
