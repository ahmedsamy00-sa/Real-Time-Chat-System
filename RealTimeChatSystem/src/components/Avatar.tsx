import Image from "next/image";

interface AvatarProps {
  src?: string;
  name?: string; // Make optional to handle undefined cases
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const getInitials = (name?: string) => {
    if (!name || typeof name !== "string") {
      return "NN"; // Default for "No Name"
    }

    return (
      name
        .trim()
        .split(" ")
        .filter((word) => word.length > 0) // Remove empty strings
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "NN"
    ); // Fallback if no valid characters
  };

  if (src && name) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <Image
          src={src}
          alt={`صورة المستخدم ${name || "غير معروف"}`}
          fill
          className="rounded-full object-cover"
          unoptimized={src.includes("ui-avatars.com")}
          priority={false}
        />
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-primary-500 
        flex 
        items-center 
        justify-center 
        text-white 
        font-medium
        ${className}
      `}
      style={{ backgroundColor: "#0ea5e9" }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
