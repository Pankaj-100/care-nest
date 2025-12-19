"use client";

import React from "react";
import { YellowButton } from "../common/CustomButton";
import Image from "next/image";

const cardBase =
  "flex flex-col items-center text-center gap-4 bg-white rounded-xl shadow-sm p-8 w-full max-w-[380px] transition hover:shadow-md";

const ChoosingPath: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3]">
      <main className="flex-1 w-full">
        <section className="max-w-5xl mx-auto px-4 pt-14 pb-24">
          {/* Extended heading section with background */}
          <div className=" mx-4 px-4 py-6 mb-6 rounded-none">
            <h1 className="text-center text-3xl sm:text-4xl font-semibold mb-1">
              Choose The Path That Suits Your Needs Best.
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            {/* Card 1 */}
            <div className={cardBase}>
              <div className="h-32 flex items-center">
                <Image
                  src="/old-age-caregiver.png"
                  alt="Find caregiver illustration"
                  width={112}
                  height={112}
                  className="w-24 h-24 object-contain"
                  sizes="96px"
                />
              </div>
              <h2 className="font-semibold text-2xl">Find Trusted Caregivers</h2>
              <p className="text-md text-[#747d8d] leading-relaxed max-w-[270px]">
                Search for trusted caregivers near you  it&apos;s free and easy.
              </p>
              <YellowButton
                onClick={() => (window.location.href = "/zip-code")}
                className="mt-2 px-8 py-6 min-w-[200px] text-md font-semibold"
              >
                Find Caregiver
              </YellowButton>
            </div>

            {/* Card 2 */}
            <div className={cardBase}>
              <div className="h-32 flex items-center">
                <Image
                  src="/girl-caregiver.png"
                  alt="Caregiver working illustration"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain"
                  sizes="112px"
                />
              </div>
              <h2 className="font-semibold text-2xl">Work As A Caregiver</h2>
              <p className="text-md text-[#747d8d] leading-relaxed max-w-[270px]">
                Build your profile and explore job <br /> opportunities.
              </p>
              <YellowButton
                onClick={() => (window.location.href = "https://carenest-caregiver.vercel.app/signup")}
                className="mt-2 px-8 py-6 min-w--[200px] text-md font-semibold"
              >
                Find caregiving job
              </YellowButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChoosingPath;