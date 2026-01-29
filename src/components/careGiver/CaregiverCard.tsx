import React from "react";
import Image from "next/image";

export type CaregiverProps = {
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  isBookmarked?: boolean;
  isSelected?: boolean;
  heightClass?: string;
  onClick?: () => void;
  onBookmarkToggle?: () => void;
  isVerified?: boolean;                 // NEW
  verifiedIconSrc?: string;             // NEW (override icon path)
};

const CaregiverCard: React.FC<CaregiverProps> = ({
  name,
  avatar,
  specialty,
  experience,
  isBookmarked = false,
  onClick,
  onBookmarkToggle,
  isSelected = false,
  isVerified = false,                  
  verifiedIconSrc = "/care-giver/verified.png", // place this in /public
  heightClass,
}) => {
  const cdnURL = process.env.NEXT_STORAGE_BUCKET || "";
  // Normalize experience: default to 0, show as "X+ Years"
  let experienceDisplay = "0 Years";
  if (
    experience !== null &&
    experience !== undefined &&
    !(typeof experience === "string" && experience.match(/^null|undefined|NaN/i))
  ) {
    const numericExp = typeof experience === "number"
      ? experience
      : parseFloat(String(experience).replace(/[^0-9.]/g, ""));

    if (Number.isFinite(numericExp) && numericExp >= 0) {
      if (numericExp === 99 || numericExp > 10) {
        experienceDisplay = "10+ Years";
      } else if (numericExp === 1) {
        experienceDisplay = "1 Year";
      } else if (numericExp === 0) {
        experienceDisplay = "0 Years";
      } else {
        const years = Math.max(0, Math.floor(numericExp));
        experienceDisplay = `${years} Years`;
      }
    }
  }

  return (
    <div
      onClick={onClick}
      className={`relative ${heightClass ?? "h-32 sm:h-40"} flex flex-row items-center gap-3 sm:gap-6 rounded-2xl p-3 sm:p-4 bg-white shadow border cursor-pointer hover:shadow-lg transition`}
    >
      {/* Avatar with colored background */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
          <Image
            src={
              avatar && avatar.trim() !== "" && avatar !== "/care-giver/boy-icon.png"
                ? avatar.startsWith("http")
                  ? avatar
                  : `${cdnURL}/${avatar.replace(/^\/+/, "")}`
                : "/care-giver/boy-icon.png"
            }
            alt={name}
            width={96}
            height={96}
            className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover"
          />
          {isSelected && (
            <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 bg-[var(--navy)] opacity-80 rounded-full flex items-center justify-center">
              <Image
                src="/care-giver/tick.png"
                alt="Selected"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
          )}
        </div>
      </div>

      {/* Info section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base sm:text-2xl font-semibold text-[var(--navy)] truncate">{name}</h3>
          {isVerified && (
            <Image
              src={verifiedIconSrc}
              alt="Verified caregiver"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          )}
        </div>
        <p className="text-sm sm:text-md font-normal text-[var(--cool-gray)] truncate">
          {specialty}
        </p>
        <div className="flex flex-row gap-2 sm:gap-4 mt-2 h-max text-xs sm:text-sm">
          <div className="font-semibold border border-[var(--navy)] rounded-full px-3 py-0.5 text-[var(--navy)] h-max whitespace-nowrap bg-white">
            {experienceDisplay}
          </div>
        </div>
      </div>

      {/* Bookmark Icon, vertically centered */}
      <div
        className="ml-2 sm:ml-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#233D4D1A] shadow cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onBookmarkToggle) {
            onBookmarkToggle();
          }
        }}
      >
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
    </div>
  );
};

export default CaregiverCard;
