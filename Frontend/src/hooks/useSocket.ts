// frontend/hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = "http://localhost:8000";

export const useSocket = (
  conversationId: number | null,
  onMessage: (msg: any) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    if (!socketRef.current) {
      socketRef.current = io(API_URL, { withCredentials: true });
    }

    const socket = socketRef.current;

    socket.emit("joinConversation", conversationId);

    socket.on("receiveMessage", (msg) => {
      console.log("New message via socket:", msg);
      onMessage(msg);
    });

    return () => {
      socket.emit("leaveConversation", conversationId);
      socket.off("receiveMessage");
    };
  }, [conversationId, onMessage]);

  return socketRef.current;
};
