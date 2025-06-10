import Image from "next/image";
import React from "react";
import { RedirectButton, TransparentButton } from "../common/CustomButton";

const ServiceWeProvide = () => {
  return (
    <div className=" flex flex-col justify-center flex-wrap w-full  sm:pt-[5.5rem] pt-[3.5rem] pb-[3.5rem] bg-[var(--cream)] sm:px-28">
      <h1 className="font-medium sm:text-5xl text-4xl text-center mb-10">
        Services We Provide
      </h1>

      <div className="flex flex-wrap item-center sm:justify-between justify-center gap-y-4  w-full">
        <Services />
        <Services />
        <Services />
        <Services />
        <Services />
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="p-2 w-58">
      <div className="w-58 h-58 rounded-2xl mb-3 relative">
        <Image
          src={"/service1.png"}
          alt="personal care"
          fill
          className="rounded-2xl object-cover"
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Personal care</h3>
        <p className="text-sm text-gray-600 mb-3">
          Find your professional personal care provider for daily assistance,
          hygiene, mobility, and compassionate support.
        </p>
      </div>

      <RedirectButton
        ButtonCompo={TransparentButton}
        className="w-full"
        title="View more"
        path={`/service/personal-care`}
      />
    </div>
  );
};

export default ServiceWeProvide;
