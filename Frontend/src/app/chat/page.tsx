"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiMenu, HiLogout } from "react-icons/hi";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useConversations";
import ConversationsList from "@/components/ConversationsList";
import ChatWindow from "@/components/ChatWindow";
import { Conversation } from "@/hooks/useConversations";

export default function ChatPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  console.log("ChatPage - user:", user);
  console.log("ChatPage - authLoading:", authLoading);

  const {
    conversations,
    isLoading: conversationsLoading,
    fetchConversations,
  } = useConversations();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsSidebarOpen(false); // Close sidebar on mobile when conversation is selected
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-text-secondary">جاري التحميل...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="h-screen max-h-screen bg-primary-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="nav-button p-2 rounded-md text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <HiMenu className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-semibold text-text-primary">الدردشة</h1>

        <button
          onClick={handleLogout}
          className="btn-danger nav-button p-2 rounded-md text-text-secondary focus:outline-none focus:ring-2 focus:ring-error-500"
        >
          <HiLogout className="w-6 h-6" />
        </button>
      </div>

      <div className="flex h-full max-h-screen">
        {/* Sidebar */}
        <div
          className={`
          ${isSidebarOpen ? "block" : "hidden"} 
          md:block 
          fixed 
          md:relative 
          inset-y-0 
          left-0 
          z-50 
          md:z-auto
          ${isSidebarOpen ? "w-full" : "w-auto"}
          h-full
        `}
        >
          <ConversationsList
            conversations={conversations}
            selectedConversationId={selectedConversation?.id || null}
            onSelectConversation={handleSelectConversation}
            currentUserId={user?.id}
            isLoading={conversationsLoading}
            onRefreshConversations={fetchConversations}
          />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop Header */}
          <div className="hidden md:flex  bg-white border-b border-gray-200 px-6 py-4 justify-end items-center shadow-sm">
            <button
              onClick={handleLogout}
              className="btn-danger nav-button flex items-center px-4 py-2 text-sm text-text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-error-500"
            >
              <HiLogout className="w-4 h-4 ml-2" />
              تسجيل الخروج
            </button>
          </div>

          {/* Chat Window */}
          <div className="flex-1 min-h-0 flex">
            <ChatWindow
              conversation={selectedConversation}
              currentUser={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
