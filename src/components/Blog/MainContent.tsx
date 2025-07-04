import Image from "next/image";
import React from "react";

const MainContent: React.FC = () => {
  return (
    <div className="w-full md:w-2/3">
      <img
        src="/Blog/main-image.png"
        alt="Elderly care"
        className="rounded-lg w-full mb-4"
      />
      <div className="flex items-center gap-x-2">
        <div className="relative w-6 h-6 rounded-full border border-[var(--navy)] overflow-hidden">
          <Image
            src="/Blog/avatar_img.png"
            width={24}
            height={24}
            alt="Profile Picture"
            className="object-cover"
          />
        </div>

        <p className="text-gray-500 text-sm mb-1">
          Nandy Birch • 11 January 2025
        </p>
      </div>

      <h1 className="text-4xl font-medium mb-4 text-[var(--navy)] leading-[120%]">
        Elderly Care at Home: How to Ensure Comfort and Well-being
      </h1>
      <div className="space-y-4 text-[#667085] text-base leading-relaxed">
        <p>
          Caring for elderly loved ones at home is a heartfelt responsibility
          that requires attention, patience, and compassion. Ensuring comfort
          goes beyond physical needs—it includes emotional support, safety, and
          a sense of independence. Start by creating a safe and accessible
          environment.
        </p>
        <p>
          This could mean installing grab bars in bathrooms, removing trip
          hazards like loose rugs, and ensuring proper lighting throughout the
          home.Regular health monitoring and medication management are crucial.
          Scheduling routine check-ups and organizing medications can prevent
          potential health risks. Nutrition also plays a key role—offer balanced
          meals tailored to their dietary needs and encourage hydration.
        </p>
        <p>
          Beyond physical care, emotional well-being is just as important.
          Encourage social interaction, whether through visits from friends and
          family or engaging in community activities. Hobbies, light exercise,
          and mental stimulation through games or reading can greatly enhance
          quality of life.
        </p>
        <p>
          Lastly, consider professional home care services if additional support
          is needed. Caregivers can assist with daily tasks while providing
          companionship and peace of mind for family members. With the right
          approach, elderly care at home can be a rewarding experience that
          brings comfort, dignity, and happiness to your loved ones.
        </p>

        <p>
          This could mean installing grab bars in bathrooms, removing trip
          hazards like loose rugs, and ensuring proper lighting throughout the
          home.Regular health monitoring and medication management are crucial.
          Scheduling routine check-ups and organizing medications can prevent
          potential health risks. Nutrition also plays a key role—offer balanced
          meals tailored to their dietary needs and encourage hydration.
        </p>
        <p>
          Beyond physical care, emotional well-being is just as important.
          Encourage social interaction, whether through visits from friends and
          family or engaging in community activities. Hobbies, light exercise,
          and mental stimulation through games or reading can greatly enhance
          quality of life.
        </p>
        <p>
          Lastly, consider professional home care services if additional support
          is needed. Caregivers can assist with daily tasks while providing
          companionship and peace of mind for family members. With the right
          approach, elderly care at home can be a rewarding experience that
          brings comfort, dignity, and happiness to your loved ones.
        </p>
      </div>
    </div>
  );
};

export default MainContent;
