"use client";

import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { RedirectButton, YellowButton } from "../common/CustomButton";
import Image from "next/image";
import Link from "next/link";

const cardBase =
  "flex flex-col items-center text-center gap-4 bg-white rounded-xl shadow-sm p-8 w-full max-w-[340px] transition hover:shadow-md";

const ChoosingPath: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">

      <main className="flex-1 w-full">
        <section className="max-w-5xl mx-auto px-4 pt-14 pb-24">
          <h1 className="text-center text-lg sm:text-xl font-semibold text-[var(--navy)] mb-12">
            Choose the path that suits your needs best.
          </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              {/* Card 1 */}
              <div className={cardBase}>
                <div className="h-32 flex items-center">
                  <Image
                    src="/old-age-caregiver.png"
                    alt="Find caregiver illustration"
                    width={140}
                    height={140}
                    className="w-auto h-auto"
                  />
                </div>
                <h2 className="font-semibold text-md">Find trusted caregivers</h2>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[270px]">
                  Search for trusted caregivers near you —<br /> it&apos;s free and easy.
                </p>
                <YellowButton
                  onClick={() => (window.location.href = "/zip-code")}
                  className="mt-2 px-6 py-2 text-xs font-medium"
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
                    width={140}
                    height={140}
                    className="w-auto h-auto"
                  />
                </div>
                <h2 className="font-semibold text-md">Work as a caregiver</h2>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[270px]">
                  Build your profile and explore job <br /> opportunities.
                </p>
                <YellowButton
                  onClick={() => (window.location.href = "/care-provider")}
                  className="mt-2 px-6 py-2 text-xs font-mediu"
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