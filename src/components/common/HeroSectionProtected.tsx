import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  className?: string;
}

const HeroSectionProtected = ({ title, className }: Props) => {
  const heading = title ? title : "Become A Care Provider";

  return (
    <div className="relative">
      <div className="relative h-[220px] sm:h-[260px] lg:h-[320px]">
        <Image
          src={"/hero-section.png"}
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Responsive gradient: vertical on mobile, horizontal on desktop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(35, 61, 77, 0) 0%, rgba(35, 61, 77, 0.35) 45%, rgba(35, 61, 77, 0.85) 85%, rgba(35, 61, 77, 0.95) 100%)",
        }}
      ></div>
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(35, 61, 77, 0.92) 0%, rgba(35, 61, 77, 0.75) 30%, rgba(35, 61, 77, 0.25) 70%, rgba(35, 61, 77, 0) 100%)",
        }}
      ></div>

      <div className="absolute inset-0 flex items-end">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl text-white font-medium px-6 sm:px-8 lg:px-28 pb-6 sm:pb-8 lg:pb-10 leading-tight lg:leading-[1.1] ${className}`}
        >
          {heading}
        </h1>
      </div>
    </div>
  );
};

export default HeroSectionProtected;
