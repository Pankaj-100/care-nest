"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Add usePathname
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCareseekerZipcode } from "@/store/slices/bookingSlice";
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
              Easily connect with trusted professionals in the Houston community who provide personal care and support tailored to your family’s needs.
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
              title="Contact Us"
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname(); // Add this import
  
  // Get the stored zipcode from Redux
  const storedZipcode = useAppSelector(state => state.booking.careseekerZipcode);

  // Dynamic redirect path based on current page
  // const redirectPath = pathname === "/care-giver" ? "/care-giver" : "/find-job";

  // Initialize zipcode from Redux state on component mount
  useEffect(() => {
    if (storedZipcode) {
      setZipCode(String(storedZipcode));
    }
  }, [storedZipcode]);

  function handleRedirect(e?: React.MouseEvent | React.FormEvent) {
    if (e) e.preventDefault();
    if (zipCode.trim()) {
      dispatch(setCareseekerZipcode(Number(zipCode.trim()))); // Store in redux
      
      if (pathname === "/care-giver") {
        // If already on caregiver page, just update the zipcode - the page will auto-refresh
        // No need to navigate, the useEffect in caregivers.tsx will handle the new search
        return;
      } else {
        // From landing page or other pages, go to find-job
        router.push("/find-job");
      }
    }
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 lg:p-6 w-full mx-auto lg:w-[70vw] xl:max-w-6xl
      ${noDescription ? "lg:grid lg:grid-cols-12 lg:gap-6" : "lg:grid lg:grid-cols-12 lg:gap-6"}`}
    >
      {!noDescription && (
        <div className="col-span-5 space-y-2">
          <h3 className="font-semibold text-lg">
            {title ?? "Browse A Caregivers"}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {description ?? "Create your free profile to discover verified, compassionate caregivers."}
          </p>
        </div>
      )}

      <form
        onSubmit={handleRedirect}
        className={`flex flex-col gap-4 col-span-12 ${
          !noDescription ? "lg:col-span-7" : "lg:col-span-12"
        } lg:grid lg:grid-cols-12`}
      >
        <div
          className={`flex flex-col col-span-7 ${
            !noDescription ? "lg:col-span-7" : "lg:col-span-8"
          }`}
        >
          <label className="mb-2 font-semibold text-base" htmlFor="zip-input">
            Provide Zip code
          </label>
          <input
            id="zip-input"
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full rounded-full outline-none border border-gray-300 py-3 px-5 text-gray-900 text-sm focus:border-gray-400 focus:ring-0"
            maxLength={10}
          />
        </div>
        <div
          className={`col-span-5 flex items-end ${
            !noDescription ? "lg:col-span-4" : "lg:col-span-4"
          }`}
        >
          <button
            type="submit"
            className={`w-full justify-center px-5 py-3 h-[46px] cursor-pointer rounded-3xl text-base font-semibold transition whitespace-nowrap
              ${!zipCode.trim() ? " cursor-not-allowed pointer-events-none" : ""}
              bg-[#FFA726] text-[#233D4D]`}
            disabled={!zipCode.trim()}
          >
            Search Caregiver
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
