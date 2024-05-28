"use client";

import ChattersList from "@/components/Chat/ChattersList";
import { Item } from "@/components/shared/Item";
import ProfileImage from "@/components/shared/ProfileImage";
import { TextareaAutosize } from "@/components/shared/styles";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import sendIcon from "../../../public/icons/send.svg";
import { useState, useEffect, useRef } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import EmojiPicker from "emoji-picker-react";
import { messages } from "@/components/Chat/mock";
import dayjs from "dayjs";

export default function Chat() {
  const [value, setValue] = useState("private");

  const [text, setText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab
              value="private"
              label={
                <Typography sx={{ fontFamily: "SchoolBell !important" }}>
                  Private Chats
                </Typography>
              }
            />
            <Tab
              value="group"
              label={
                <Typography sx={{ fontFamily: "SchoolBell !important" }}>
                  Group Chats
                </Typography>
              }
            />
          </Tabs>
        </Box>
        <ChattersList content={value} />
      </Item>
      <Item
        radius="8px"
        sx={{ width: "100%", position: "relative", overflow: "hidden" }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            zIndex: "555",
            top: "0",
            p: "10px",
            backgroundColor: "white",
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
              {value === "private" ? "Firstname Lastname" : "Groupname"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            p: "80px 10px",
            height: "560px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d0d0d0",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#dbdbdb",
            },
          }}
        >
          {messages.map((message, index) =>
            message.me ? (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
                key={index}
              >
                <ProfileImage image="" width={30} height={30} />
                <Typography
                  sx={{
                    p: "4px",
                    borderRadius: "6px",
                    bgcolor: "#dedede5d",
                  }}
                >
                  {message.message}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#a4a4a4",
                  }}
                >
                  {dayjs(message.time).format("MMM DD, YYYY, hh:mm")}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  alignSelf: "flex-end",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
                key={index}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#a4a4a4",
                  }}
                >
                  {dayjs(message.time).format("MMM DD, YYYY, hh:mm")}
                </Typography>
                <Typography
                  sx={{
                    p: "4px",
                    borderRadius: "6px",
                    bgcolor: "#add5fd5d",
                  }}
                >
                  {message.message}
                </Typography>
                <ProfileImage image="" width={30} height={30} />
              </Box>
            )
          )}
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
