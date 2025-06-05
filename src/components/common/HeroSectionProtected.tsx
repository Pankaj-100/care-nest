import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  className?: string;
}

const HeroSectionProtected = ({ title, className }: Props) => {
  const classes = `absolute text-4xl text-white left-28 font-semibold -translate-y-1/2 top-1/2 ${className}`;

  return (
    <div className="relative">
      <div className="relative h-[150px]">
        <Image
          src={"/hero-section.png"}
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        className="absolute top-0 left-0 h-full w-2/3 pointer-events-none "
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
