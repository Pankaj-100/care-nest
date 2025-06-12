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
  console.log("isBookmarked", onBookmarkToggle);
  return (
    <div
      onClick={onClick}
className={`relative ${heightClass ?? "h-40"} flex items-center gap-6 rounded-xl p-4 bg-white shadow border cursor-pointer hover:shadow-lg transition`}    >
      {/* Bookmark Icon */}
      <div
        className="absolute top-3 right-3 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-[#233D4D1A] shadow"
       
      >
        <img
          src={isBookmarked ? "/care-giver/bookmark-bold.png" : "/care-giver/bookmark.png"}
          alt="Bookmark"
          className="w-4 h-4"
        />
      </div>

    <div className="relative w-24 h-24 rounded-full">
  <img
    src={imgSrc}
    alt={name}
    className={`w-24 h-24 rounded-full object-cover`}
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
        <h3 className="text-2xl font-bold text-[var(--navy)]">{name}</h3>
        <p className="text-gray-500 text-md font-normal">{specialty}</p>

        <div className="flex flex-row gap-4 mt-2">
          <div className="text-gray-500 text-md font-normal border-2 rounded-full py-2 px-4">
            {experience}
          </div>
          <div className="text-gray-500 text-md font-normal border-2 rounded-full py-2 px-4">
            {rate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;
