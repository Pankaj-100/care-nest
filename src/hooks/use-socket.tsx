"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

 export interface SocketMessage {
    id: string;
    conversationId: string;
    fromUserId: string;
    toUserId: string;
    message: string;
    createdAt: string;
    hasRead: boolean;
  }

export const useSocket = (token?: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current?.id);
      socketRef.current?.emit("join");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token]);

  const sendMessage = (toUserId: string, message: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("send_message", { toUserId, message });
    } else {
      console.error("Socket not connected yet");
    }
  };

  const onNewMessage = (callback: (msg: SocketMessage) => void) => {
    socketRef.current?.on("new_message", callback);
  };

  return { sendMessage, onNewMessage };
};