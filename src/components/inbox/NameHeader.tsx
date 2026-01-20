import React from "react";
import Image from "next/image";

interface NameHeaderProps {
  otherUserDetails?: {
    name?: string;
    avatar?: string | null;
  };
}

function NameHeader({ otherUserDetails }: NameHeaderProps) {
  const userName = otherUserDetails?.name || "Admin";
  const userAvatar = otherUserDetails?.avatar || "/admin.png";

  return (
    <div className="flex justify-between items-center border-b border-dashed border-[#EEEEEE] pb-4">
      <div className="flex gap-3 items-center">
        <div className="relative w-10 h-10">
          <Image
            src={userAvatar}
            alt={userName}
            fill
            className="object-cover rounded-full"
            sizes="40px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/admin.png";
            }}
          />
        </div>
        <div className="text-lg font-medium">{userName}</div>
      </div>
    </div>
  );
}

export default NameHeader;