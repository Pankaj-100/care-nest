"use client";

import React from "react";
import { YellowButton } from "../common/CustomButton";
import Image from "next/image";

const JoinCommunity = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-20 xl:px-28 py-10 bg-[var(--navy)] lg:h-[70vh] h-max flex flex-col sm:flex-row justify-between gap-8 lg:gap-24 items-center">
      <div className="w-full sm:w-1/2 lg:w-2/5 relative sm:order-0 order-1">
        <h1 className="text-[var(--yellow)] font-medium text-2xl sm:text-3xl lg:text-[25px] xl:text-[38px] leading-snug">
          Interested in caregiving opportunities? Join our growing community of trusted professionals helping families every day
        </h1>

        <p className="text-gray-300 my-4 text-md sm:text-md xl:text-lg font-light">
          Become part of a growing community of compassionate caregivers. Offer
          your skills, earn on your terms, and make a meaningful difference in
          the lives of elderly individuals and their families every day.
        </p>

        <YellowButton
          className="px-10 sm:px-8 py-6 sm:py-8 lg:py-7 text-sm sm:text-base lg:text-lg"
          onClick={() =>
            (window.location.href = "https://carenest-caregiver.vercel.app/signup")
          }
        >
          Join our cool community as a Caregiver
        </YellowButton>

        <div className="hidden sm:block w-26 h-9 absolute z-10 left-[450px] bottom-[-12px]">
          <Image src="/dashed arrow.png" alt="arrow image" fill />
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-auto flex sm:mr-7 flex-col items-center justify-center sm:order-1 order-0">
        <div className="flex gap-3">
          <div>
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 -ml-6 sm:-ml-12">
              <Image src={"/yellow 3 line.png"} alt="community" fill />
            </div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-t-2xl rounded-l-2xl">
              <Image
                src={"/community-img-1.png"}
                alt="community"
                fill
                className="rounded-t-2xl rounded-l-2xl object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-t-2xl rounded-r-2xl">
              <Image
                src={"/yellow shape.png"}
                alt="community"
                fill
                className="rounded-t-2xl rounded-r-2xl"
              />
            </div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-34 lg:h-35 rounded-t-2xl rounded-r-2xl">
              <Image
                src={"/community-img-3.png"}
                alt="community"
                fill
                className="rounded-t-2xl rounded-r-2xl object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex mt-3 gap-3">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-35 lg:h-35 rounded-l-2xl rounded-b-2xl ml-2">
            <Image
              src={"/community-img-3.png"}
              alt="community"
              fill
              className="rounded-l-2xl rounded-b-2xl object-cover"
            />
          </div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-r-2xl rounded-b-2xl">
            <Image
              src={"/community-img-1.png"}
              alt="community"
              fill
              className="rounded-r-2xl rounded-b-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
