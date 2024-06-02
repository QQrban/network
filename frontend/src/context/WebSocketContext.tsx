"use client";

import React, { createContext, useContext, ReactNode } from "react";
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

  return (
    <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};
