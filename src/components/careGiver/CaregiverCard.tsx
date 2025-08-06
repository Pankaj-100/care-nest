import React from "react";

export type CaregiverProps = {
  name: string;
  imgSrc: string;
  specialty: string;
  experience: string;
  rate: string;
  isBookmarked?: boolean;
  heightClass?: string;
  onClick?: () => void;
  onBookmarkToggle?: () => void;
};

const CaregiverCard: React.FC<CaregiverProps> = ({
  name,
  imgSrc,
  specialty,
  experience,
  heightClass,
  rate,
  isBookmarked = false,
  onClick,
  onBookmarkToggle,
}) => {
  const cdnURL = "https://dev-carenest.s3.ap-south-1.amazonaws.com";
  console.log("isBookmarked", onBookmarkToggle);
  return (
    <div
      onClick={onClick}
      className={`relative ${
        heightClass ?? "h-40"
      } flex items-center gap-6 rounded-xl p-4 bg-white shadow border cursor-pointer hover:shadow-lg transition`}
    >
      {/* Bookmark Icon */}
      <div className="absolute top-3 right-3 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-[#233D4D1A] shadow">
        <img
          src={
            isBookmarked
              ? "/care-giver/bookmark-bold.png"
              : "/care-giver/bookmark.png"
          }
          alt="Bookmark"
          className="w-4 h-4"
        />
      </div>

      <div className="relative w-24 h-24 rounded-full">
        <img
        // src={`${cdnURL}/${imgSrc} `}
          src={`/care-giver/boy-icon.png`}
          alt={name}
          className={`lg:w-24 w-20 lg:h-24 h-22 rounded-full object-cover`}
        />
        {isBookmarked && (
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--navy)] opacity-80 rounded-full p-1">
            <img
              src="/care-giver/tick.png"
              alt="Bookmarked"
              className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ transform: "translate(0%, -0%)" }}
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
            {rate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;
