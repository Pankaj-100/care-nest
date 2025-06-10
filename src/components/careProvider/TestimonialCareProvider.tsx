import Image from "next/image";
import React from "react";

const TestimonialCareProvider = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-x-16  gap-y-8 items-center justify-start lg:p-18 p-8 ">
      <div>
        <Testimonial />
      </div>

      <div>
        <h1 className="font-semibold lg:text-4xl text-center text-xl text-[var(--navy)]">
          Caregiver’s Testimonial
        </h1>

        <div className="flex items-center gap-x-4 mt-5">
          <div className="relative lg:w-90 w-full lg:h-84 h-48">
            <Image
              src={"/care-provider-testimonial-1.png"}
              alt="testimonial"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative lg:w-90 w-full lg:h-84 h-48">
            <Image
              src={"/care-provider-testimonial-2.png"}
              alt="testimonial"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Testimonial = () => {
  return (
    <div className="max-w-[30rem] ">
      <div>
        <h1 className="text-[5rem] font-bold text-[var(--navy)] tracking-wider">
          ❛❛
        </h1>
      </div>
      <div>
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
    </div>
  );
};

export default TestimonialCareProvider;
