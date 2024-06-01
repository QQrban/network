import React, { useEffect, useRef, ChangeEvent, MutableRefObject } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { TextareaAutosize } from "../shared/styles";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Image from "next/image";
import { fetchFromServer } from "@/lib/api";
import sendIcon from "../../../public/icons/send.svg";
import { ContactsProps, MessageProps } from "@/types/types";

interface ChatTextAreaProps {
  text: string;
  tabValue: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  receiverID: number | undefined;
  groupID: number;
  setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
  openEmoji: boolean;
  setOpenEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  emojiPickerRef: MutableRefObject<HTMLDivElement | null>;
  handleEmojiSelect: (emoji: EmojiClickData) => void;
  chatters: ContactsProps[];
  initChat: ContactsProps | undefined;
  setChatters: React.Dispatch<React.SetStateAction<ContactsProps[]>>;
  messages: MessageProps[];
}

const ChatTextArea = ({
  text,
  setText,
  receiverID,
  setMessages,
  openEmoji,
  setOpenEmoji,
  groupID,
  tabValue,
  emojiPickerRef,
  chatters,
  initChat,
  setChatters,
  handleEmojiSelect,
}: ChatTextAreaProps) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const addNewMessage = (newMessage: MessageProps) => {
    setMessages((prevMessages) => {
      const lastID =
        prevMessages.length > 0 ? prevMessages[prevMessages.length - 1].ID : 0;
      const newID = lastID + 1;
      return [...prevMessages, { ...newMessage, ID: newID }];
    });
  };

  const sendMessage = async () => {
    try {
      const body =
        tabValue === "group"
          ? { receiverID: groupID, isGroup: true, content: text.trim() }
          : { receiverID: receiverID, content: text.trim() };
      console.log("tabValue", tabValue);
      console.log("groupID", groupID);
      console.log("receiverID", receiverID);
      console.log("text", text);

      const response = await fetchFromServer(`/message/send`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setText("");
        const newMessage: MessageProps = await response.json();
        addNewMessage(newMessage);

        if (receiverID) {
          const receiverExists = chatters.some(
            (chatter) => chatter.ID === receiverID
          );
          if (!receiverExists && initChat) {
            setChatters((prevChatters) => [initChat, ...prevChatters]);
          }
        }
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

  return (
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
  );
};

export default ChatTextArea;
