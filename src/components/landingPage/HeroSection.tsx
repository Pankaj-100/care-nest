"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Add usePathname
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCareseekerZipcode } from "@/store/slices/bookingSlice";
import Image from "next/image";
import { RedirectButton } from "../common/CustomButton";
import { DesignIcon1, DesignIcon2, DesignIcon3 } from "../icons/page";
import { toast } from "react-toastify"; // Add this import at the top


const HeroSection = () => {
  return (
    <div className="relative h-[550px] bg-[#233D4D]">
      <div className="h-full w-full relative">
        {/* Removed the image and gradient - now just solid background color */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main background ellipse */}
          <div className="relative w-full h-full max-w-[1400px] max-h-[500px] mx-auto my-8">
            <Image
              src="/background-ellipse.png" // Your background ellipse image
              alt="ellipse background design"
              fill
              className="object-cover"
              priority
            />
          </div>
         </div>


         <div className="absolute top-0 left-3 w-15 h-15 text-[#FFA726] opacity-80">
          <DesignIcon1 />
        </div>

        <div className="absolute bottom-16 left-0 w-16 h-16 text-[#FFA726] opacity-80">
          <DesignIcon2 />
        </div>
        
        <div className="absolute lg:left-28 left-8 sm:top-[8%] top-[8%] sm:-translate-y-0 -translate-y-1/2 hyphens-auto text-white sm:w-[700px] lg:w-[1050px] break-words w-[calc(100vw-8rem)]">
          <h1 className="font-semibold sm:text-3xl text-5xl lg:text-6xl sm:leading-tight lg:leading-tight">
            Find compassionate{" "}
            <span className="relative inline-block">
              <span className="text-[#FFA726]">home care services</span>
              {/* Yellow underline vector */}
              <div className="absolute -bottom-3 left-0 w-full">
                <Image
                  src="/home-care-underline.png" // Your yellow underline vector
                  alt=""
                  width={410}
                  height={22}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </span>{" "}
            <br className="mb-2" />
            <span className="block mt-4">
            for your loved one</span>
          </h1>
          <div className="my-3">
            <p className="font-light text-lg ">
              Easily connect with trusted professionals in the Houston community who <br/> provide personal care and support tailored to your family&apos;s needs.
            </p>
          </div>

          {/* Button + Reviews Badge - Made Inline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/google-reviews-badge.png"
                alt="5.0 rating - 20+ Google Reviews"
                width={250}
                height={54}
                className="h-auto w-[230px] object-contain"
                priority
              />
            </a>
            {/* Button with arrow after text (hover slides arrow) */}
            <RedirectButton
              className="px-7 py-7 text-lg rounded-4xl font-semibold after:content-['→'] after:ml-2 after:inline-block after:transition-transform hover:after:translate-x-1"
              path="/contact"
              title="Contact Us"
            />
          </div>
        </div>

        {/* Right side hero image */}
        <div className="absolute right-23 lg:right-45 top-[43%] -translate-y-1/2 w-[370px] h-[370px] lg:w-[430px] lg:h-[430px] z-10 hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="/main-hero-section.png" // Your caregiver and elderly person image
              alt="Compassionate home care services"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
       <div className="absolute -top-3 -right-4 w-10 h-10 text-[#FFA726]">
          <DesignIcon3 />
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
  const pathname = usePathname();
  
  // Get the stored zipcode from Redux
  const storedZipcode = useAppSelector(state => state.booking.careseekerZipcode);

  // Check if we're on the caregivers page to apply different styling
  const isCaregiversPage = pathname === "/care-giver";

  // Initialize zipcode from Redux state on component mount
  useEffect(() => {
    if (storedZipcode) {
      setZipCode(String(storedZipcode));
    }
  }, [storedZipcode]);

  useEffect(() => {
  // Clear zipcode when landing page loads
  if (pathname !== "/care-giver") {
    dispatch(setCareseekerZipcode(0));
    setZipCode("");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname]);

  function handleRedirect(e?: React.MouseEvent | React.FormEvent) {
    if (e) e.preventDefault();
    if (!zipCode.trim()) {
      toast.error("You need to enter zipcode");
      return;
    }
    dispatch(setCareseekerZipcode(Number(zipCode.trim())));
    if (pathname === "/care-giver") {
      // If already on caregiver page, just update the zipcode
      return;
    } else {
      // From landing page or other pages, go to find-job
      router.push("/find-job");
    }
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 lg:p-6 w-full mx-auto
      ${isCaregiversPage 
        ? "lg:w-[65vw] xl:max-w-6xl items-center" // Smaller width for caregivers page
        : "lg:w-[63vw] xl:max-w-6xl" // Original width for landing page
      }
      ${noDescription ? "lg:grid lg:grid-cols-12 lg:gap-6" : "lg:grid lg:grid-cols-12 lg:gap-6"}`}
    >
      {!noDescription && (
        <div className="col-span-5 space-y-2 ml-8">
          <h3 className="font-semibold text-xl">
            {title ?? (isCaregiversPage ? "Select 3 Caregivers" : "Browse Caregivers")}
          </h3>
          <p className="text-lg font-medium leading-relaxed text-gray-500">
            {description ?? (isCaregiversPage 
              ? "Select up to three caregivers to continue with your Schedule Your Meeting."
              : "Create your free profile to discover verified, compassionate caregivers."
            )}
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
          <label className="mb-2 font-semibold text-xl" htmlFor="zip-input">
            {isCaregiversPage ? "Provide Zip code" : "Provide Zip code"}
          </label>
          <input
            id="zip-input"
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full lg:w-[350px] rounded-full outline-none border border-gray-400 py-4 px-6 text-gray-900 text-lg focus:border-gray-400 focus:ring-0"
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
            className={`w-full justify-center ml-14 px-3 py-4 cursor-pointer rounded-4xl text-lg font-semibold transition whitespace-nowrap
              bg-[#FFA726] text-[#233D4D]`}
          >
            {isCaregiversPage ? "Search Caregiver" : "Search Caregiver"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
