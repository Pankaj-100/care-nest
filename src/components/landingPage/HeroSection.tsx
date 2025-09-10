"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RedirectButton } from "../common/CustomButton";


const HeroSection = () => {
  return (
    <div className="relative h-[550px]">
      <div className="h-full w-full relative ">
        <div className="w-full h-[550px] absolute right-0 ">
          <div className=" w-3/4 h-[550px] absolute right-0 ">
            <Image
              src={"/hero-background.png"}
              alt="hero background"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className="absolute top-0 left-0 h-full w-2/3 pointer-events-none "
            style={{
              background:
                "linear-gradient(to left, #233d4d00 0%, #233d4d 50%, #233d4d 100%)",
            }}
          />
        </div>

        <div className="absolute lg:left-28 left-8 sm:top-1/7 top-1/2 sm:-translate-y-0 -translate-y-1/2 hyphens-auto text-white sm:w-[500px] break-words w-[calc(100vw-8rem)]">
          <h1 className="font-semibold sm:text-4xl text-4xl sm:leading-11 ">
            Find Trusted, Compassionate Home Care Services for Your Loved Ones.
          </h1>
          <div className="my-5">
            <p className="font-light">
              Easily connect with trusted professionals who provide personal
              care and support tailored to your family’s needs.
            </p>
          </div>

          {/* Button + Reviews Badge */}
          <div className="flex flex-col items-start gap-5">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/google-reviews-badge.png"
                alt="5.0 rating - 20+ Google Reviews"
                width={200}
                height={48}
                className="h-auto w-[200px] object-contain"
                priority
              />
            </a>
            {/* Button with arrow after text (hover slides arrow) */}
            <RedirectButton
              className="px-6 py-6 text-sm after:content-['→'] after:ml-2 after:inline-block after:transition-transform hover:after:translate-x-1"
              path="/contact"
              title="Contact us"
            />
          </div>
        </div>
      </div>

      <div className="lg:flex hidden items-center justify-center absolute sm:-bottom-12 -bottom-[18rem] -translate-x-1/2 left-1/2">
        <BrowseCaregiver />
      </div>
    </div>
  );
};

interface Props {
  noDescription?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const BrowseCaregiver = ({ noDescription, title, description }: Props) => {
  const [zipCode, setZipCode] = useState<string>("");

  const redirectPath = zipCode
    ? `/care-giver?zipcode=${encodeURIComponent(zipCode)}`
    : "/care-giver";

  const hasDescription = !noDescription;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (zipCode.trim()) {
      window.location.href = redirectPath;
    }
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 lg:p-6 w-full mx-auto lg:w-[55vw] xl:max-w-4xl
      ${hasDescription ? "lg:grid lg:grid-cols-12 lg:gap-6" : "lg:grid lg:grid-cols-12 lg:gap-6"}`}
    >
      {hasDescription && (
        <div className="col-span-5 space-y-2">
          <h3 className="font-semibold text-lg">
            {title ?? "Browse Caregivers"}
          </h3>
          <p className="text-xs leading-relaxed text-gray-600">
            {description ?? "Create your free profile to discover verified, compassionate caregivers."}
          </p>
        </div>
      )}

      {/* Form: input + button now occupy the SAME horizontal space that used to sit between
         the description and the button, by splitting remaining columns */}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 col-span-12 ${
          hasDescription ? "lg:col-span-7" : "lg:col-span-12"
        } lg:grid lg:grid-cols-12`}
      >
        {/* ZIP input */}
        <div
          className={`flex flex-col col-span-8 ${
            hasDescription ? "lg:col-span-8" : "lg:col-span-8"
          }`}
        >
          <label className="mb-2 font-semibold text-sm" htmlFor="zip-input">
            Provide Zip code
          </label>
            <input
              id="zip-input"
              type="text"
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full rounded-3xl outline-none border border-gray-300 py-3 px-5 text-gray-900 text-sm focus:border-gray-400 focus:ring-0"
              maxLength={10}
            />
        </div>

        {/* Button shares the horizontal space (remaining columns) */}
        <div
          className={`col-span-4 flex items-end ${
            hasDescription ? "lg:col-span-4" : "lg:col-span-4"
          }`}
        >
          <RedirectButton
            className={`w-full justify-center px-8 py-3 h-[46px] rounded-3xl text-sm font-medium transition ${
              !zipCode.trim()
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
            path={redirectPath}
            title="Search Caregiver"
          />
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
