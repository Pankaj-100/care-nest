import React from "react";
import Image from "next/image";

export type CaregiverProps = {
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  price: string; // <-- changed from rate
  isBookmarked?: boolean;
  isSelected?: boolean;
  heightClass?: string;
  onClick?: () => void;
  onBookmarkToggle?: () => void;
};

const CaregiverCard: React.FC<CaregiverProps> = ({
  name,
  avatar,
  specialty,
  experience,
  heightClass,
  price, // <-- changed from rate
  isBookmarked = false,
  onClick,
  isSelected = false,
}) => {
  const cdnURL = "https://dev-carenest.s3.ap-south-1.amazonaws.com";
  return (
    <div
      onClick={onClick}
      className={`relative ${heightClass ?? "h-40"} flex items-center gap-6 rounded-xl p-4 bg-white shadow border cursor-pointer hover:shadow-lg transition`}
    >
      {/* Bookmark Icon */}
      <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#233D4D1A] shadow">
        <Image
          src={
            isBookmarked
              ? "/care-giver/bookmark-bold.png"
              : "/care-giver/bookmark.png"
          }
          alt="Bookmark"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </div>

      <div className="relative w-24 h-24 rounded-full">
        <Image
          src={
            avatar && avatar.trim() !== "" && avatar !== "/care-giver/boy-icon.png"
              ? avatar.startsWith("http")
                ? avatar
                : `${cdnURL}/${avatar}`
              : "/care-giver/boy-icon.png"
          }
          alt={name}
          width={96}
          height={96}
          className="lg:w-24 w-20 lg:h-24 h-22 rounded-full object-cover"
        />
        {isSelected && (
          <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--navy)] opacity-80 rounded-full flex items-center justify-center">
            <Image
              src="/care-giver/tick.png"
              alt="Selected"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-medium text-[var(--navy)]">{name}</h3>
        <p className="text-md font-normal text-[var(--cool-gray)]">
          {specialty}
        </p>

        <div className="flex flex-row gap-4 mt-2 h-max text-sm">
          <div className=" text-md font-normal  border-1 border-[var(--navy)] rounded-full px-4 py-1  text-[var(--navy)] h-max whitespace-nowrap">
            {experience}
          </div>
          <div className="text-[var(--navy)] text-md font-normal border-1 border-[var(--navy)] rounded-full px-4 py-1 whitespace-nowrap">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;
