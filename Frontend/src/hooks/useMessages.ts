// frontend/hooks/useMessages.ts
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { User } from "@/lib/auth";
import { useSocket } from "./useSocket";

export interface Message {
  id: number;
  content: string;
  sender_id: number;
  conversation_id: number;
  createdAt: string;
  imagePath?: string;
  isRead: boolean;
}

export const useMessages = (
  conversation_id: number | null,
  currentUser?: User
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformMessage = (msg: any): Message => ({
    id: msg.message_id || msg.id,
    conversation_id: msg.conversation_id,
    sender_id: msg.sender_id,
    content: msg.content || msg.message || "",
    createdAt: msg.created_at || msg.createdAt || new Date().toISOString(),
    imagePath: msg.image ? msg.image.replace(/\\/g, "/") : undefined,
    isRead: true,
  });

  const fetchMessages = useCallback(async () => {
    if (!conversation_id) return;
    try {
      setError(null);
      setIsLoading(true);

      const response = await api.get(`/messages/${conversation_id}`);
      const data = response.data;

      setMessages(data.map(transformMessage));
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
      setIsLoading(false);
    }
  }, [conversation_id]);

  const sendMessage = async (content?: string, image?: File) => {
    if (!conversation_id || (!content && !image)) return;

    const optimisticId = Date.now();
    const optimisticMessage: Message = {
      id: optimisticId,
      content: content || "",
      sender_id: currentUser?.id || 1,
      conversation_id: conversation_id,
      createdAt: new Date().toISOString(),
      imagePath: image ? URL.createObjectURL(image) : undefined, // مؤقت
      isRead: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const formData = new FormData();
      if (content) formData.append("content", content);
      if (image) formData.append("image", image);

      const response = await api.post(
        `/messages/${conversation_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newMessage = transformMessage(response.data.data);

      setMessages((prev) =>
        prev.map((msg) => (msg.id === optimisticId ? newMessage : msg))
      );

      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
      setError(
        error instanceof Error ? error.message : "Failed to send message"
      );
      throw error;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Real-time listener
  useSocket(conversation_id, (msg) => {
    const realMessage = transformMessage(msg);

    setMessages((prev) => {
      const exists = prev.find((m) => m.id === realMessage.id);
      if (exists) return prev;
      return [...prev, realMessage];
    });
  });

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    refetch: fetchMessages,
  };
};
