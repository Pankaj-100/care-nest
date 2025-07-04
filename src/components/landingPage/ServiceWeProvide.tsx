import Image from "next/image";
import React from "react";
import { RedirectButton, TransparentButton } from "../common/CustomButton";

const ServiceWeProvide = () => {
  return (
    <div className=" flex flex-col justify-center flex-wrap w-full  sm:pt-[5.5rem] pt-[2.5rem] pb-[2.5rem] bg-[var(--cream)] sm:px-28 px-8">
      <h1 className="sm:font-medium font-semibold sm:text-5xl text-3xl sm:text-center sm:mb-10 mb-6">
        Services We Provide
      </h1>

      <div className="flex  item-center sm:justify-between justify-center gap-y-8  w-full  lg:px-20">
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
    <div className="sm:p-2 sm:w-58">
      <div className="sm:w-58 h-58 rounded-2xl mb-3 relative">
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
