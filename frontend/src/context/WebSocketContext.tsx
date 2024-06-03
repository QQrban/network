"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<any>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const socketUrl = "ws://localhost:8888/ws";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [processedMessage, setProcessedMessage] = useState<any>(null);

  return (
    <WebSocketContext.Provider
      value={{
        sendMessage,
        lastMessage,
        readyState,
        processedMessage,
        setProcessedMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};
