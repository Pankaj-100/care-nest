import Image from "next/image";
import React from "react";

interface Props {
  title?: string;
}

const HeroSectionCareProvider = ({ title }: Props) => {
  return (
    <div className="relative h-[300px]">
      <div className="w-full h-[300px] absolute right-0 ">
        <div className="absolute right-0 w-2/3 h-full">
          <Image
            src="/hero-care-provider.jpg"
            alt="hero care provider"
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
      </div>

      <h1 className="absolute lg:text-4xl text-3xl  text-white lg:left-16 left-8 lg:w-auto w-[6rem] text-center font-semibold -translate-y-1/2 lg:top-1/2 top-3/5">
        {title ? title : "Become A Care Giver"}
      </h1>
    </div>
  );
};

export default HeroSectionCareProvider;
