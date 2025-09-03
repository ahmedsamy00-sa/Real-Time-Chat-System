import { useEffect, useRef } from "react";
import { HiChat } from "react-icons/hi";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import Avatar from "./Avatar";
import { Conversation } from "@/hooks/useConversations";
import { useMessages, Message } from "@/hooks/useMessages";
import { User } from "@/lib/auth";

interface ChatWindowProps {
  conversation: Conversation | null;
  currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  currentUser,
}) => {
  console.log("ChatWindow - currentUser:", currentUser);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useMessages(
    conversation?.id || null,
    currentUser
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center text-text-secondary">
          <div className="mx-auto h-16 w-16 text-primary-300 mb-4">
            <HiChat className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            لا توجد محادثة محددة
          </h3>
          <p className="text-text-secondary">
            اختر محادثة من الشريط الجانبي لبدء الدردشة
          </p>
        </div>
      </div>
    );
  }

  const otherParticipant = conversation.participants[0] || {
    id: 0,
    name: conversation.other_user_name || "مستخدم غير معروف",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      conversation.other_user_name || "مستخدم"
    )}&background=0ea5e9&color=fff`,
  };

  if (!otherParticipant) {
    return (
      <div className="flex-1 flex items-center justify-center bg-primary-50">
        <div className="text-center text-text-secondary">
          <p>خطأ: لا يمكن العثور على المشارك في المحادثة</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (content?: string, image?: File) => {
    if (!otherParticipant) return;
    await sendMessage(content, image);
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar
              src={otherParticipant.avatar}
              name={otherParticipant.name}
              size="md"
              className="m-3 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-text-primary truncate">
                {otherParticipant.name}
              </h2>
              <p className="text-sm text-text-secondary truncate">
                {otherParticipant.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-primary-50 to-white">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-text-secondary">جاري تحميل الرسائل...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-center text-text-secondary">
              <p className="mb-2 text-text-primary font-medium">
                لا توجد رسائل بعد
              </p>
              <p className="text-sm">ابدأ المحادثة بإرسال رسالة</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: any) => {
              // Debug log to see the message structure
              console.log("Message data:", message);
              console.log("Current user ID:", currentUser?.id);

              const messageSenderId = message.sender_id || message.sender_id;
              const isOwnMessage =
                messageSenderId === currentUser?.id ||
                messageSenderId === undefined;
              const sender = isOwnMessage ? currentUser : otherParticipant;

              console.log(
                "Message sender ID:",
                messageSenderId,
                "isOwnMessage:",
                isOwnMessage
              );

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={isOwnMessage}
                  senderName={sender?.name || "مستخدم غير معروف"}
                  senderAvatar={sender?.avatar}
                />
              );
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0">
        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
