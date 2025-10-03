import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  className?: string;
}

const HeroSectionProtected = ({ title, className }: Props) => {
const classes = `absolute text-7xl text-white lg:left-28 left-8 font-medium -translate-y-1/2 sm:w-auto w-full top-1/2 whitespace-nowrap ${className}`;

  return (
    <div className="relative">
      <div className="relative h-[221px]">
        <Image
          src={"/hero-section.png"}
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        className="absolute  top-0 left-0 h-full w-full pointer-events-none "
        style={{
          background:
            "linear-gradient(to left, #233d4d00 0%, #233d4d 50%, #233d4d 100%)",
        }}
      ></div>

      <h1 className={classes}>{title ? title : "Become A Care Provider"}</h1>
      
    </div>
  );
};

export default HeroSectionProtected;
