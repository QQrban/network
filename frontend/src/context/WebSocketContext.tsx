"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8888/ws");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
