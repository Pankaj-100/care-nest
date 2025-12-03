import Image from "next/image";
import React from "react";

interface Props {
  title?: string;
  textClasses?: string;
}

const HeroSectionCareProvider = ({ title, textClasses }: Props) => {
  return (
    <div className="relative h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-care-provider.jpg"
          alt="hero care provider"
          fill
          style={{ objectFit: "cover", objectPosition: "right" }}
          priority
        />
        {/* Overlay: mobile/tablet vertical, desktop horizontal */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              // Mobile & tablet: vertical gradient (top to bottom)
              'linear-gradient(to top, #233d4d 0%, #233d4dcc 45%, #233d4d00 100%)',
          }}
        />
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background:
              // Desktop: horizontal gradient (left to right)
              'linear-gradient(90deg, #233d4d 0%, #233d4d 20%, rgba(35,61,77,0.7) 40%, rgba(35,61,77,0) 80%)',
          }}
        />
      </div>

      <h1
        className={`${textClasses} absolute text-xl sm:text-3xl lg:text-5xl text-white left-1/2 lg:left-24 -translate-x-1/2 lg:translate-x-0 bottom-6 lg:bottom-10 text-center lg:text-left font-medium px-4 sm:px-6 whitespace-nowrap max-w-none`}
      >
        {title ? title : "Become A Caregiver"}
      </h1>
    </div>
  );
};

export default HeroSectionCareProvider;
