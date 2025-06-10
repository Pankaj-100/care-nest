import React from "react";
import { YellowButton } from "../common/CustomButton";
import Image from "next/image";

const IntroductionWithCTA = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-y-10  relative bg-[var(--whiteSmoke)] lg:h-[475px] h-max lg:p-16 p-8  ">
      <div className=" text-white lg:w-1/2">
        <div>
          <h1 className="font-semibold text-4xl leading-11 text-[var(--navy)] lg:w-2/3">
            Looking to Provide Care for the Elderly?
          </h1>
        </div>
        <div className="my-5 lg:w-3/4">
          <p className="text-[var(--navy)]">
            If you&apos;re searching for a trusted caregiving platform where you
            can offer compassionate care to seniors, you& re in the right place.
            Join a community dedicated to making a real difference in the lives
            of elderly individuals. Whether you&apos;re an experienced caregiver
            or just starting out, this is the perfect platform to connect,
            support, and grow your caregiving journey.
          </p>
        </div>

        <div>
          <YellowButton className="px-10">Register now</YellowButton>
        </div>
      </div>

      <div className="relative w-auto h-90 lg:w-1/2 lg:h-1/2">
        <div className="absolute lg:right-20 right-5 top-10 w-[calc(100%-2rem)] h-78 bg-[var(--navy)] rounded-tl-[6rem] rounded-br-[6rem]"></div>
        <div className="absolute lg:right-28 right-13 w-[calc(100%-3rem)] h-90 z-10">
          <Image
            src={"/care-provider-cta.png"}
            alt="care provider CTA"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-tl-[6rem] rounded-br-[6rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductionWithCTA;
