import Image from "next/image";
import React from "react";
import { quotes } from "@/lib/svg_icons";

const TestimonialCareProvider = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-x-16 gap-y-8 items-center justify-start lg:p-18 p-8 w-full">
      {/* Left Section - Testimonial Text */}
      <div className="w-full lg:w-[40%]">
        <Testimonial />
      </div>

      {/* Right Section - Title + Images */}
      <div className="w-full lg:w-[60%]">
        <h1 className="font-semibold lg:text-4xl text-xl text-center lg:text-left text-[var(--navy)]">
          Caregiver’s Testimonial
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
          <div className="relative w-full sm:w-1/2 h-48 lg:h-84">
            <Image
              src={"/care-provider-testimonial-1.png"}
              alt="testimonial"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full sm:w-1/2 h-48 lg:h-84">
            <Image
              src={"/care-provider-testimonial-2.png"}
              alt="testimonial"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Testimonial = () => {
  return (
    <div className="max-w-[30rem] mx-auto lg:mx-0">
      <div className="mb-9">{quotes}</div>
      <p className="text-gray-600">
        I’ve been working as a caregiver for over 5 years, but this platform
        gave me better visibility and more consistent opportunities. Plus, the
        in-app communication and timely payments make the whole experience
        smooth.
      </p>
      <p className="mt-3 font-bold lg:text-lg text-[var(--navy)]">
        David R., Vancouver, BC
      </p>
    </div>
  );
};

export default TestimonialCareProvider;
