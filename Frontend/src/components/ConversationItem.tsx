import Avatar from "./Avatar";
import { Conversation } from "@/hooks/useConversations";
import { formatDate } from "@/utils/date";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
  currentUserId: number;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onClick,
  currentUserId,
}) => {
  // Get the other participant from the conversation data
  const otherParticipant = {
    id: 999, // Use a placeholder ID
    name: conversation.other_user_name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      conversation.other_user_name
    )}&background=0ea5e9&color=fff`,
  };

  return (
    <div
      onClick={onClick}
      className={`
        conversation-item smooth-transition flex items-start  p-4 cursor-pointer border-b border-gray-200
        ${isSelected ? "conversation-item-active" : "hover:bg-gray-50"}
      `}
    >
      <Avatar
        src={otherParticipant.avatar}
        name={otherParticipant.name}
        size="md"
        className="ml-3 flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-medium text-text-primary truncate">
            {otherParticipant.name}
          </h3>
        </div>

        {conversation.last_message && (
          <p className="text-sm text-text-secondary truncate">
            {conversation.last_message}
          </p>
        )}
      </div>
      <div className="flex flex-col justify-between gap-2">
        <span className="text-xs text-text-secondary flex-shrink-0 ">
          {formatDate(conversation.last_message_time)}
        </span>
        {conversation.unreadCount && conversation.unreadCount > 0 ? (
          <div className="unread-badge w-[5px] mr-auto text-white text-xs font-medium rounded-full min-w-[20px] h-5 flex items-center justify-center px-2 flex-shrink-0">
            {conversation.unreadCount}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ConversationItem;
