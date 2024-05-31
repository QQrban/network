"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { EmojiClickData } from "emoji-picker-react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import ChattersList from "@/components/Chat/ChattersList";
import { Item } from "@/components/shared/Item";
import { fetchFromServer } from "@/lib/api";
import { ContactsProps, MessageProps } from "@/types/types";
import MessageItem from "@/components/Chat/MessageItem";
import ChatTabs from "@/components/Chat/ChatTabs";
import ChatContentHeader from "@/components/Chat/ChatContentHeader";
import ChatTextArea from "@/components/Chat/ChatTextArea";
import {
  CenterTextStyles,
  ChatBoxStyles,
  ChatContentStyles,
  ErrorTextStyles,
  ItemStyles,
} from "@/components/Chat/styles";

export default function Chat() {
  const [tabValue, setTabValue] = useState<string>("private");
  const [chatters, setChatters] = useState<ContactsProps[]>([]);
  const [text, setText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [receiverID, setReceiverID] = useState<number | undefined>(undefined);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [activeChatName, setActiveChatName] = useState<string>("");
  const [initChat, setInitChat] = useState<ContactsProps>();

  const socketRef = useRef<WebSocket | null>(null);
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

  const fetchChatters = useCallback(async () => {
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
  }, []);

  const fetchHistory = useCallback(async () => {
    if (authID === receiverID) return;
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
  }, [receiverID, authID]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetchFromServer(`/user/${receiverID}`, {
        credentials: "include",
      });
      if (response.ok) {
        const user: ContactsProps = await response.json();
        setActiveChatName(`${user.firstName} ${user.lastName}`);
        setInitChat(user);
      }
    } catch (error) {
      console.error(error);
    }
  }, [receiverID]);

  useEffect(() => {
    fetchChatters();
  }, [fetchChatters]);

  useEffect(() => {
    if (authID !== receiverID && receiverID !== undefined) {
      fetchUser();
      fetchHistory();
    }
  }, [fetchUser, authID, receiverID, fetchHistory]);

  useEffect(() => {
    if (pathname) {
      const pathID = Number(pathname);
      if (!isNaN(pathID)) {
        setReceiverID(pathID);
      } else {
        router.push(`/chat`);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8888/ws");

    socketRef.current.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        const newMessage = data.payload;
        const lastIndex = messages[messages.length - 1].ID;
        const messageWithID = { ...newMessage, ID: lastIndex + 1 };

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, messageWithID];

          console.log(updatedMessages);
          return updatedMessages;
        });
      } catch (error) {
        console.error(error);
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [fetchHistory, messages]);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const chatContent = useMemo(
    () => (
      <>
        {authID &&
          activeChatName &&
          messages?.map((message, index) => (
            <MessageItem
              key={message.ID || index}
              message={message}
              authID={authID}
            />
          ))}
        <div ref={messagesEndRef} />
      </>
    ),
    [authID, activeChatName, messages]
  );

  return (
    <ChatBoxStyles>
      <ItemStyles radius="8px">
        <ChatTabs tabValue={tabValue} setTabValue={setTabValue} />
        <ChattersList
          receiverID={receiverID}
          handleClick={handleClick}
          chatters={chatters}
          content={tabValue}
        />
      </ItemStyles>
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
          <CenterTextStyles>Please select a Chat</CenterTextStyles>
        )}
        <ChatContentStyles>{chatContent}</ChatContentStyles>
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
            <ErrorTextStyles color="error">
              This account is private. To send a message, you need to follow it
              first
            </ErrorTextStyles>
          )
        )}
      </Item>
    </ChatBoxStyles>
  );
}
