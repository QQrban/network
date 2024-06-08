"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import ChattersList from "@/components/Chat/ChattersList";
import { Item } from "@/components/shared/Item";
import { fetchFromServer } from "@/lib/api";
import { ContactsProps, GroupProps, MessageProps } from "@/types/types";
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
import {
  addNewMessage,
  removeSenderId,
  resetNewMessage,
  setNewNotification,
} from "@/redux/features/notifications/notificationsSlice";
import { useWebSocketContext } from "@/context/WebSocketContext";

export default function Chat() {
  const [tabValue, setTabValue] = useState<string>("private");
  const [chatters, setChatters] = useState<ContactsProps[]>([]);
  const [groupChats, setGroupChats] = useState<GroupProps[]>([]);
  const [text, setText] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [chatReceiverID, setChatReceiverID] = useState<number | undefined>(
    undefined
  );
  const [groupID, setGroupID] = useState<number>(0);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [activeChatName, setActiveChatName] = useState<string>("");
  const [initChat, setInitChat] = useState<ContactsProps>();

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const authID = useSelector((state: any) => state.authReducer.value.id);
  const senderIds = useSelector(
    (state: any) => state.notificationsReducer.senderIds
  );
  const dispatch = useDispatch();

  const pathname = usePathname().split("/").pop();
  const router = useRouter();

  const { lastMessage, processedMessage, setProcessedMessage, sendMessage } =
    useWebSocketContext();

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

  const handleClick = useCallback(
    (chatterID: number, chatName: string) => {
      setChatReceiverID(chatterID);
      setActiveChatName(chatName);
      dispatch(removeSenderId({ senderId: chatterID }));
      if (senderIds && senderIds.length === 0) {
        resetNewMessage();
      }
    },
    [dispatch, senderIds]
  );

  const handleGroupClick = (groupID: number, groupChatName: string) => {
    setGroupID(groupID);
    setActiveChatName(groupChatName);
    dispatch(removeSenderId({ senderId: groupID, isGroup: true }));
  };

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
    if (authID === chatReceiverID) return;
    try {
      const body =
        tabValue === "group"
          ? { receiverID: groupID, isGroup: true }
          : { receiverID: chatReceiverID };

      const response = await fetchFromServer(`/message/history`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [chatReceiverID, authID, groupID, tabValue]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetchFromServer(`/user/${chatReceiverID}`, {
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
  }, [chatReceiverID]);

  useEffect(() => {
    fetchChatters();
  }, [fetchChatters]);

  useEffect(() => {
    if (authID !== chatReceiverID && chatReceiverID !== undefined) {
      fetchUser();
      fetchHistory();
    }
    if (groupID !== 0) fetchHistory();
  }, [fetchUser, authID, chatReceiverID, fetchHistory, groupID]);

  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetchFromServer(`/message/groups`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setGroupChats(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      const pathID = Number(pathname);
      if (!isNaN(pathID)) {
        setChatReceiverID(pathID);
        console.log("pathID", pathID);
      } else {
        router.push(`/chat`);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    if (tabValue === "group") {
      fetchGroups();
    }
  }, [tabValue, fetchGroups]);

  useEffect(() => {
    if (lastMessage && lastMessage !== processedMessage) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.type === "message_personal") {
          const newMessage = data.payload;
          const { receiverID, senderID, ID } = newMessage;
          if (
            (chatReceiverID === receiverID || chatReceiverID === senderID) &&
            activeChatName
          ) {
            const messageWithID = { ...newMessage, ID: ID };
            setMessages((prevMessages) => [...prevMessages, messageWithID]);

            const messagePayload = {
              type:
                tabValue === "group"
                  ? "read_group_message"
                  : "read_personal_message",
              payload: {
                messageID: messageWithID.ID,
                senderID: tabValue === "group" ? groupID : chatReceiverID,
                readerID: authID,
              },
            };
            sendMessage(JSON.stringify(messagePayload));
          } else {
            dispatch(
              addNewMessage({
                senderId: data.payload.senderID,
                isGroup: false,
              })
            );
          }
        } else if (data.type === "message_group") {
          const newMessage = data.payload;
          const { receiverID, senderID, ID } = newMessage;
          if (groupID === receiverID || groupID === senderID) {
            const messageWithID = { ...newMessage, ID: ID };
            setMessages((prevMessages) => [...prevMessages, messageWithID]);
          } else {
            if (receiverID !== groupID) {
              dispatch(
                addNewMessage({
                  senderId: data.payload.receiverID,
                  isGroup: true,
                })
              );
            }
          }
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
      setProcessedMessage(lastMessage);
    }
  }, [
    lastMessage,
    dispatch,
    authID,
    chatReceiverID,
    groupID,
    processedMessage,
    setProcessedMessage,
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Smooth Scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Adding Messages
  const chatContent = useMemo(() => {
    return (
      <>
        {authID && activeChatName
          ? messages?.map((message, index) => (
              <MessageItem
                tabValue={tabValue}
                key={`${message.ID}-${index}`}
                message={message}
                authID={authID}
              />
            ))
          : ""}
        <div ref={messagesEndRef} />
      </>
    );
  }, [authID, activeChatName, messages, tabValue]);

  const resetChatState = useCallback(() => {
    setActiveChatName("");
    setGroupID(0);
    setChatReceiverID(undefined);
    setInitChat(undefined);
    setMessages([]);
    if (tabValue === "group") {
      fetchGroups();
    } else if (tabValue === "private") {
      fetchChatters();
    }
  }, [fetchChatters, fetchGroups, tabValue]);

  return (
    <ChatBoxStyles>
      <ItemStyles radius="8px">
        <ChatTabs
          resetChatState={resetChatState}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <ChattersList
          groupID={groupID}
          tabValue={tabValue}
          groups={groupChats}
          chatReceiverID={chatReceiverID}
          handleClick={handleClick}
          handleGroupClick={handleGroupClick}
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
            initChat={initChat}
            chatReceiverID={chatReceiverID}
            activeChatName={activeChatName}
          />
        ) : (
          <CenterTextStyles>Please select a Chat</CenterTextStyles>
        )}
        <ChatContentStyles
          sx={{
            mt: tabValue === "group" ? "12px" : "0px",
          }}
        >
          {chatContent}
        </ChatContentStyles>
        {tabValue === "private" ? (
          activeChatName && chatReceiverID !== undefined && initChat?.access ? (
            <ChatTextArea
              tabValue={tabValue}
              initChat={initChat}
              text={text}
              setText={setText}
              chatters={chatters}
              messages={messages}
              setChatters={setChatters}
              chatReceiverID={chatReceiverID}
              groupID={groupID}
              setMessages={setMessages}
              openEmoji={openEmoji}
              setOpenEmoji={setOpenEmoji}
              emojiPickerRef={emojiPickerRef}
              handleEmojiSelect={handleEmojiSelect}
            />
          ) : (
            authID !== Number(pathname) &&
            activeChatName && (
              <ErrorTextStyles color="error">
                This account is private. To send a message, you need to follow
                it first
              </ErrorTextStyles>
            )
          )
        ) : (
          activeChatName && (
            <ChatTextArea
              tabValue={tabValue}
              initChat={initChat}
              text={text}
              setText={setText}
              messages={messages}
              chatters={chatters}
              setChatters={setChatters}
              chatReceiverID={chatReceiverID}
              groupID={groupID}
              setMessages={setMessages}
              openEmoji={openEmoji}
              setOpenEmoji={setOpenEmoji}
              emojiPickerRef={emojiPickerRef}
              handleEmojiSelect={handleEmojiSelect}
            />
          )
        )}
      </Item>
    </ChatBoxStyles>
  );
}
