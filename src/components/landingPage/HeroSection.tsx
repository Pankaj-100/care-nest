"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCareseekerZipcode } from "@/store/slices/bookingSlice";
import Image from "next/image";
import { DesignIcon1, DesignIcon2, DesignIcon3, PhoneIcon, ArrowIcon } from "../icons/page";
import RippleRadio from "../common/RippleRadio";
import { toast } from "react-toastify";

type HeroSectionData = {
  heading: string;
  description: string;
  googleReviewLink: string;
  phoneNumber: string;
};

const HeroSection = () => {
  const [heroData, setHeroData] = useState<HeroSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  useEffect(() => {
    const fetchHeroSection = async () => {
      if (!API_BASE) {
        setLoading(false);
        return;
      }

      try {
        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/hero-section`;
        const res = await fetch(endpoint);

        if (res.ok) {
          const json = await res.json();
          const hero = json?.data?.heroSection;

          if (hero) {
            setHeroData({
              heading: hero.heading || "",
              description: hero.description || "",
              googleReviewLink: hero.googleReviewLink || "",
              phoneNumber: hero.phoneNumber || "",
            });
            console.log("Hero section API response:", hero);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, [API_BASE]);

  // Split the description into two parts for two-line display
  const getDescriptionLines = (desc: string) => {
    // If description contains \n, split by that
    if (desc.includes('\n')) {
      return desc.split('\n');
    }
    // Otherwise, split at a logical point (after "care and support")
    const splitPoint = desc.indexOf('care and support');
    if (splitPoint !== -1) {
      const line1 = desc.substring(0, splitPoint + 16); // Include "care and support"
      const line2 = desc.substring(splitPoint + 16).trim();
      return [line1, line2];
    }
    // Fallback: split roughly in the middle
    const words = desc.split(' ');
    const midPoint = Math.ceil(words.length / 2);
    return [
      words.slice(0, midPoint).join(' '),
      words.slice(midPoint).join(' ')
    ];
  };

  const displayDescription = heroData?.description || 
    "Easily connect with trusted Houston caregivers who offer personal care and support designed around your family's needs";
  
  const descriptionLines = getDescriptionLines(displayDescription);
  
  const googleReviewLink = heroData?.googleReviewLink || "#";
  // Convert any HTML in description to plain text for mobile rendering
  const toPlainText = (html: string) => {
    if (!html) return "";
    try {
      if (typeof window !== "undefined") {
        const el = document.createElement("div");
        el.innerHTML = html;
        return (el.textContent || el.innerText || "").replace(/\s+/g, " ").trim();
      }
    } catch (_) {
      // fallback below
    }
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };
  const mobileDescription = toPlainText(heroData?.description || descriptionLines.join(" "));

  return (
    <div className="relative h-auto min-h-[600px] lg:h-[550px] bg-[#233D4D] pb-20 lg:pb-0">
      {/* Mobile contact banner */}
      <a
        href={`tel:${heroData?.phoneNumber || "8322372273"}`}
        className="flex lg:hidden items-center justify-center gap-3 bg-[#F2E9CE] text-[#233D4D] py-3 px-4 text-lg font-semibold"
      >
        <PhoneIcon className="w-5 h-5" />
        <span>{heroData?.phoneNumber || "832 237 2273"}</span>
      </a>

      <div className="h-full w-full relative">
        {/* Background ellipse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[1400px] max-h-[500px] mx-auto my-8">
            <Image
              src="/background-ellipse.png"
              alt="ellipse background design"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Decorative icons */}
        <div className="absolute top-0 left-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 text-[#FFA726] opacity-80">
          <DesignIcon1 />
        </div>

        <div className="absolute bottom-16 left-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#FFA726] opacity-80 hidden sm:block">
          <DesignIcon2 />
        </div>

        <div className="absolute -top-3 -right-4 w-8 h-8 sm:w-10 sm:h-10 text-[#FFA726]">
          <DesignIcon3 />
        </div>

        {/* Floating phone badge - desktop only */}
        <a
          href={`tel:${heroData?.phoneNumber || "8322372273"}`}
          className="hidden lg:flex items-center gap-4 rounded-full bg-[#F2E9CE] text-[#233D4D] px-10 py-3 text-lg lg:text-lg font-extrabold shadow-md absolute top-0 right-8 z-30"
        >
          
          <RippleRadio />
          <PhoneIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>{heroData?.phoneNumber || "832-237-2273"}</span>
        </a>

        {/* Main content - desktop: absolute positioned, mobile: relative */}
        <div className="relative lg:absolute lg:left-28 lg:top-[2%] px-4 sm:px-8 lg:px-0 pt-12 lg:pt-0 text-white lg:w-[1050px]">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center lg:text-left">
            Find compassionate{" "}
            <span className="relative inline-block">
              <span className="text-[#FFA726]">home care services</span>
              <div className="absolute -bottom-2 sm:-bottom-3 left-0 w-full">
                <Image
                  src="/home-care-underline.png"
                  alt=""
                  width={410}
                  height={22}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </span>{" "}
            <br className="mb-2" />
            <span className="block mt-2 sm:mt-4">for your loved one</span>
          </h1>
          
          <div className="my-4 sm:my-6">
            {loading ? (
              <p className="text-center lg:text-left">
                <span className="inline-block h-4 w-3/4 bg-gray-600/30 rounded animate-pulse" />
                <br />
                <span className="inline-block h-4 w-2/3 bg-gray-600/30 rounded animate-pulse mt-2" />
              </p>
            ) : (
              <>
                {/* Mobile: compact paragraph without hard breaks */}
                <p className="lg:hidden text-[15px] leading-6 font-normal text-white/90 text-center max-w-[36ch] mx-auto">
                  {mobileDescription}
                </p>
                {/* Desktop: preserve author-provided breaks but tighten paragraph spacing */}
                <div className="hidden lg:block font-light text-base lg:text-lg leading-7 text-left [&_p]:mt-0 [&_p]:mb-0 [&_p]:leading-7">
                  <div
                    dangerouslySetInnerHTML={{ __html: heroData?.description || descriptionLines.join('<br />') }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Button + Reviews Badge */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/google-reviews-badge.png"
                alt="5.0 rating - 20+ Google Reviews"
                width={250}
                height={54}
                className="h-auto w-[190px] sm:w-[210px] lg:w-[230px] object-contain"
                priority
              />
            </a>
            <button
              type="button"
              onClick={() => window.location.href = '/contact'}
              className="px-5 py-3 sm:px-6 sm:py-3.5 cursor-pointer lg:px-8 lg:py-4 mb-4 text-md sm:text-base lg:text-lg rounded-4xl font-semibold flex items-center gap-2 bg-[var(--yellow)] text-[var(--navy)] hover:bg-[var(--yellow-light)] transition-all duration-300 ease-in-out shadow-md"
            >
              <span>Contact Us</span>
              <ArrowIcon className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>

        {/* Right side hero image - desktop only */}
        <div className="absolute right-23 lg:right-53 top-[38%] -translate-y-1/2 w-[370px] h-[370px] lg:w-[430px] lg:h-[430px] z-10 hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="/main-hero-section.png"
              alt="Compassionate home care services"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Browse Caregiver - absolute positioned */}
        <div className="lg:flex hidden items-center justify-center absolute -bottom-1 left-1/2 -translate-x-1/2 w-full pointer-events-none z-20">
          <div className="w-full max-w-4xl pointer-events-auto">
            <BrowseCaregiver />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Browse Caregiver - in flow at bottom */}
      <div className="lg:hidden px-4 sm:px-6 mt-8">
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

  const storedZipcode = useAppSelector((state) => state.booking.careseekerZipcode);
  const isCaregiversPage = pathname === "/care-giver";

  useEffect(() => {
    if (storedZipcode) {
      setZipCode(String(storedZipcode));
    }
  }, [storedZipcode]);

  useEffect(() => {
    if (pathname !== "/care-giver") {
      dispatch(setCareseekerZipcode(0));
      setZipCode("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function handleRedirect(e?: React.MouseEvent | React.FormEvent) {
    if (e) e.preventDefault();
    const zipTrimmed = zipCode.trim();
    if (!zipTrimmed) {
      toast.error("You need to enter zipcode");
      return;
    }
    if (!/^[0-9]{5}$/.test(zipTrimmed)) {
      toast.error("Please enter valid 5 digits zipcode");
      return;
    }
    dispatch(setCareseekerZipcode(Number(zipTrimmed)));
    if (pathname === "/care-giver") {
      return;
    } else {
      router.push("/find-job");
    }
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 sm:p-5 lg:p-6 w-full mx-auto
      ${
        isCaregiversPage
          ? "lg:w-[65vw] xl:max-w-6xl items-center"
          : "lg:w-[63vw] xl:max-w-6xl"
      }
      ${noDescription ? "lg:grid lg:grid-cols-12 lg:gap-6" : "lg:grid lg:grid-cols-12 lg:gap-6"}`}
    >
      {!noDescription && (
        <div className="col-span-12 lg:col-span-5 space-y-2 lg:ml-8 mb-4 lg:mb-0 text-center lg:text-left">
          <h3 className="font-semibold text-lg sm:text-xl">
            {title ?? (isCaregiversPage ? "Select Caregivers" : "Browse Caregivers")}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-gray-500">
            {description ??
              (isCaregiversPage
                ? "Choose caregivers to schedule your meeting."
                : "Create your free profile to discover verified, compassionate caregivers.")}
          </p>
        </div>
      )}

      <form
        onSubmit={handleRedirect}
        noValidate
        className={`flex flex-col gap-3 sm:gap-4 col-span-12 ${
          !noDescription ? "lg:col-span-7" : "lg:col-span-12"
        } lg:grid lg:grid-cols-12 items-center lg:items-end text-center lg:text-left`}
      >
        <div
          className={`flex flex-col col-span-12 ${
            !noDescription ? "lg:col-span-7 lg:mr-3" : "lg:col-span-8"
          } w-full`}
        >
          <label className="mb-2 font-semibold text-lg sm:text-xl lg:text-xl text-center lg:text-left" htmlFor="zip-input">
            Provide Zip code
          </label>
          <input
            id="zip-input"
            type="text"
            inputMode="numeric"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => {
              // Only allow digits, max 5
              const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
              setZipCode(val);
            }}
            className="w-full lg:w-[280px] rounded-full outline-none border py-4 px-5 sm:py-4 sm:px-6 lg:py-4 lg:px-6 text-gray-900 text-base sm:text-lg focus:border-gray-400 focus:ring-0 border-gray-400 mx-auto lg:mx-0"
            maxLength={5}
            autoComplete="postal-code"
          />
        </div>
        <div
          className={`col-span-12 flex items-center justify-center ${
            !noDescription ? "lg:col-span-4 lg:justify-end" : "lg:col-span-4"
          } w-full`}
        >
          <button
            type="submit"
            className={`w-full flex items-center justify-center text-center lg:ml-12 px-5 py-4 sm:px-6 sm:py-4 lg:px-6 lg:py-4.8 cursor-pointer rounded-4xl text-base sm:text-lg font-semibold transition whitespace-nowrap
              bg-[#FFA726] text-[#233D4D] hover:brightness-105`}
          >
            Search Caregiver
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
