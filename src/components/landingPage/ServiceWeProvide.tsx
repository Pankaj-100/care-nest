import Image from "next/image";
import React from "react";
import { RedirectButton, TransparentButton } from "../common/CustomButton";

const ServiceWeProvide = () => {
  return (
    <div className="flex flex-col justify-center w-full sm:pt-[5.5rem] pt-[2.5rem] pb-[2.5rem] bg-[var(--cream)] sm:px-28 px-4">
      <h1 className="sm:font-medium font-semibold sm:text-5xl text-3xl text-center mb-10">
        Services We Provide
      </h1>

      {/* Responsive grid for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
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
    <div className="p-2">
      <div className="h-60 rounded-2xl mb-3 relative">
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
