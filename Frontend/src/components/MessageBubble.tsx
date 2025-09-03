import Avatar from "./Avatar";
import { formatMessageTime } from "@/utils/date";
import { Message } from "@/hooks/useMessages";
interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  senderName?: string; // Make optional to handle undefined cases
  senderAvatar?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  senderName,
  senderAvatar,
}) => {
  // Ensure senderName is never undefined
  const safeSenderName = senderName || "مستخدم غير معروف";

  return (
    <div
      className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
          isOwnMessage ? "order-1" : "order-2"
        }`}
      >
        <div
          className={`
            px-4 py-3 rounded-lg
            ${
              isOwnMessage
                ? "message-bubble-sent text-white rounded-bl-sm"
                : "message-bubble-received text-text-primary rounded-br-sm"
            }
          `}
        >
          {/* Image Display */}
          {message.imagePath && (
            <div className="mb-2" role="img" aria-label="رسالة تحتوي على صورة">
              <div className="relative max-w-sm">
                <img
                  src={message.imagePath}
                  alt={`صورة مرسلة في الرسالة من ${safeSenderName}`}
                  className="w-full max-w-[300px] h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(message.imagePath, "_blank")}
                  onError={(e) => {
                    console.error("Image failed to load:", message.imagePath);
                    // Hide the image container if it fails to load
                    const target = e.target as HTMLElement;
                    if (target.parentElement) {
                      target.parentElement.style.display = "none";
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Text Content */}
          {message.content && (
            <p className="text-sm leading-relaxed break-words">
              {message.content}
            </p>
          )}
        </div>

        <div
          className={`flex items-center mt-1 ${
            isOwnMessage ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-xs text-text-secondary">
            {formatMessageTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
