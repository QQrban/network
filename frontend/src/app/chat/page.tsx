"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import { Box, IconButton, Typography, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSelector } from "react-redux";

import ChattersList from "@/components/Chat/ChattersList";
import { Item } from "@/components/shared/Item";
import ProfileImage from "@/components/shared/ProfileImage";
import { TextareaAutosize } from "@/components/shared/styles";
import sendIcon from "../../../public/icons/send.svg";
import { fetchFromServer } from "@/lib/api";
import { ContactsProps, MessageProps } from "@/types/types";
import MessageItem from "@/components/Chat/MessageItem";

export default function Chat() {
  const [value, setValue] = useState<string>("private");
  const [chatters, setChatters] = useState<ContactsProps[]>([]);
  const [text, setText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [receiverID, setReceiverID] = useState<number | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [activeChatName, setActiveChatName] = useState<string>("");

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const authID = useSelector((state: any) => state.authReducer.value.id);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleEmojiSelect = (emoji: EmojiClickData) => {
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

  const addNewMessage = (newMessage: MessageProps) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendMessage = async () => {
    try {
      const response = await fetchFromServer(`/message/send`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ receiverID: receiverID, content: text.trim() }),
      });
      if (response.ok) {
        setText("");
        const newMessage: MessageProps = await response.json();
        addNewMessage(newMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() !== "") {
        sendMessage();
      }
    }
  };

  useEffect(() => {
    const fetchChatters = async () => {
      try {
        const response = await fetchFromServer(`/message/contacts`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setChatters(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatters();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetchFromServer(`/message/history`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ receiverID: receiverID }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory();
  }, [receiverID]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        <ChattersList
          setActiveChatName={setActiveChatName}
          setReceiverID={setReceiverID}
          chatters={chatters}
          content={value}
        />
      </Item>
      <Item
        radius="8px"
        sx={{ width: "100%", position: "relative", overflow: "hidden" }}
      >
        {messages.length > 0 ? (
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
                {activeChatName}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "42px",
              fontFamily: "SchoolBell !important",
            }}
          >
            Please select a Chat
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            p: "80px 10px",
            height: "90%",
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
          {authID &&
            messages?.map((message) =>
              message.receiverID === authID || message.senderID === authID ? (
                <MessageItem
                  key={message.ID}
                  message={message}
                  authID={authID}
                />
              ) : null
            )}
          <div ref={messagesEndRef} />
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
            onKeyDown={handleKeyPress}
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
            {text.trim().length > 0 && (
              <IconButton onClick={sendMessage}>
                <Image width={25} height={25} src={sendIcon} alt="send" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Item>
    </Box>
  );
}
