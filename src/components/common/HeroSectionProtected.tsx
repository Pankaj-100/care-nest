import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  className?: string;
}

const HeroSectionProtected = ({ title, className }: Props) => {
const classes = `absolute text-4xl sm:text-5xl lg:text-7xl text-white lg:left-28 left-6 sm:left-8 font-medium -translate-y-1/2 sm:w-auto w-[90%] top-1/2 lg:whitespace-nowrap ${className}`;

  return (
    <div className="relative">
      <div className="relative h-[241px]">
        <Image
          src={"/hero-section.png"}
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        className="absolute top-0 left-0 h-full w-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(35, 61, 77, 0) 0%, rgba(35, 61, 77, 0.85) 40%, rgba(35, 61, 77, 0.95) 100%)",
        }}
      ></div>

      <h1 className={classes}>{title ? title : "Become A Care Provider"}</h1>
      
    </div>
  );
};

export default HeroSectionProtected;
