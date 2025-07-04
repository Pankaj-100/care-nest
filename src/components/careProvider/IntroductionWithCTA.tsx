import React from "react";
import { YellowButton } from "../common/CustomButton";
import Image from "next/image";

const IntroductionWithCTA = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-around gap-y-10 relative bg-[var(--whiteSmoke)] lg:h-[475px] h-max lg:p-16 p-8">
      {/* Left Text Section */}
      <div className="text-white lg:w-1/2 w-full">
        <div>
          <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-snug text-[var(--navy)] break-words">
            Looking to Provide Care For <br />
            The Elderly?
          </h1>
        </div>

        <div className="my-5 w-full max-w-[90%]">
          <p className="text-[var(--navy)] text-sm sm:text-base">
            If you're searching for a trusted caregiving platform where you
            can offer compassionate care to seniors, you're in the right place.
            Join a community dedicated to making a real difference in the lives
            of elderly individuals. Whether you're an experienced caregiver
            or just starting out, this is the perfect platform to connect,
            support, and grow your caregiving journey.
          </p>
        </div>

        <div className="max-w-[90%]">
          <YellowButton className="px-10">Register now</YellowButton>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full sm:w-2/3 lg:w-1/3 h-80 lg:h-2/3 mx-auto lg:mx-0">
        <div className="absolute right-5 lg:right-20 top-10 w-full h-78 bg-[var(--navy)] rounded-tl-[6rem] rounded-br-[6rem]"></div>
        <div className="absolute right-8 lg:right-28 w-full h-80 z-10">
          <Image
            src={"/care-provider-cta.png"}
            alt="care provider CTA"
            fill
            className="rounded-tl-[6rem] rounded-br-[6rem] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductionWithCTA;
