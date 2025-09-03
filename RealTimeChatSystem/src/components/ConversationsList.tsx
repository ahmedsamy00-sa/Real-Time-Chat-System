import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import ConversationItem from "./ConversationItem";
import { AddFriendForm } from "./AddFriendForm";
import { Conversation } from "@/hooks/useConversations";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversationId: number | null;
  onSelectConversation: (conversation: Conversation) => void;
  currentUserId: number;
  isLoading: boolean;
  onRefreshConversations?: () => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  currentUserId,
  isLoading,
  onRefreshConversations,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipant = conversation.participants.find(
      (p) => p.id !== currentUserId
    );
    if (!otherParticipant) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      otherParticipant.name.toLowerCase().includes(searchLower) ||
      (conversation.last_message &&
        conversation.last_message.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) {
    return (
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex items-center justify-center">
        <div className="text-text-secondary">جاري تحميل المحادثات...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-text-primary">الرسائل</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="البحث في المحادثات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200 bg-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-text-secondary" />
          </div>
        </div>
      </div>

      {/* Add Friend Form */}
      <div className="p-4 border-b border-gray-200">
        <AddFriendForm onFriendAdded={onRefreshConversations} />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-text-secondary">
            {searchTerm ? "لا توجد محادثات مطابقة" : "لا توجد محادثات بعد"}
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversationId === conversation.id}
              onClick={() => onSelectConversation(conversation)}
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationsList;
