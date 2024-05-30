"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import { useSelector } from "react-redux";
import ChattersList from "@/components/Chat/ChattersList";
import { Item } from "@/components/shared/Item";
import { fetchFromServer } from "@/lib/api";
import { ContactsProps, MessageProps } from "@/types/types";
import MessageItem from "@/components/Chat/MessageItem";
import ChatTabs from "@/components/Chat/ChatTabs";
import ChatContentHeader from "@/components/Chat/ChatContentHeader";
import ChatTextArea from "@/components/Chat/ChatTextArea";
import { usePathname, useRouter } from "next/navigation";

export default function Chat() {
  const [tabValue, setTabValue] = useState<string>("private");
  const [chatters, setChatters] = useState<ContactsProps[]>([]);
  const [text, setText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [receiverID, setReceiverID] = useState<number | undefined>(undefined);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [activeChatName, setActiveChatName] = useState<string>("");
  const [initChat, setInitChat] = useState<ContactsProps>();

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const authID = useSelector((state: any) => state.authReducer.value.id);

  const pathname = usePathname().split("/").pop();

  const router = useRouter();

  const handleEmojiSelect = useCallback((emoji: EmojiClickData) => {
    setText((prevText) => prevText + emoji.emoji);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setOpenEmoji(false);
    }
  }, []);

  const handleClick = useCallback((chatterID: number, chatName: string) => {
    setReceiverID(chatterID);
    setActiveChatName(chatName);
  }, []);

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
    if (receiverID === undefined) return;
    const fetchHistory = async () => {
      try {
        const response = await fetchFromServer(`/message/history`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ receiverID }),
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, [receiverID]);

  useEffect(() => {
    if (pathname) {
      if (!isNaN(Number(pathname))) {
        setReceiverID(Number(pathname));
      } else {
        router.push(`/chat`);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    if (receiverID === undefined || authID === receiverID) return;
    const fetchUser = async () => {
      try {
        const response = await fetchFromServer(`/user/${receiverID}`);
        if (response.ok) {
          const user: ContactsProps = await response.json();
          setActiveChatName(`${user.firstName} ${user.lastName}`);
          setInitChat(user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [receiverID, authID]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
        <ChatTabs tabValue={tabValue} setTabValue={setTabValue} />
        <ChattersList
          receiverID={receiverID}
          handleClick={handleClick}
          chatters={chatters}
          content={tabValue}
        />
      </Item>
      <Item
        radius="8px"
        sx={{ width: "100%", position: "relative", overflow: "hidden" }}
      >
        {activeChatName ? (
          <ChatContentHeader
            receiverID={receiverID}
            activeChatName={activeChatName}
          />
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
            activeChatName &&
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
        {activeChatName && receiverID !== undefined && initChat?.access ? (
          <ChatTextArea
            initChat={initChat}
            text={text}
            setText={setText}
            chatters={chatters}
            setChatters={setChatters}
            receiverID={receiverID}
            setMessages={setMessages}
            openEmoji={openEmoji}
            setOpenEmoji={setOpenEmoji}
            emojiPickerRef={emojiPickerRef}
            handleEmojiSelect={handleEmojiSelect}
          />
        ) : (
          authID !== Number(pathname) && (
            <Typography
              color="error"
              sx={{
                textAlign: "center",
                fontSize: "22px",
                fontFamily: "Gloria Hallelujah !important",
              }}
            >
              This account is private. To send a message, you need to follow it
              first
            </Typography>
          )
        )}
      </Item>
    </Box>
  );
}
