"use client";
import React, { useEffect, useState } from "react";
import { YellowButton } from "../common/CustomButton";
import Link from "next/link";
import Image from "next/image";

const IntroductionWithCTA = () => {
  const [title, setTitle] = useState(
    "Looking to Provide Care For The Elderly?"
  );
  const [description, setDescription] = useState(
    "If you're searching for a trusted caregiving platform where you can offer compassionate care to seniors, you're in the right place. Join a community dedicated to making a real difference in the lives of elderly individuals. Whether you're an experienced caregiver or just starting out, this is the perfect platform to connect, support, and grow your caregiving journey."
  );

  useEffect(() => {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "";

    const fetchBecomeCaregiver = async () => {
      if (!API_BASE) return;
      try {
        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/become-caregiver`;
        const res = await fetch(endpoint);
        if (!res.ok) return;

        const json = await res.json();
        const data = json?.data?.becomeCaregiver;
        if (data) {
          if (data.title1) setTitle(data.title1);
          if (data.description1) setDescription(data.description1);
        }
      } catch (err) {
        console.error("Failed to fetch become-caregiver content for intro:", err);
      }
    };

    fetchBecomeCaregiver();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col justify-around gap-y-10 relative bg-[var(--whiteSmoke)] lg:h-[495px] h-max lg:p-16 p-8">
      {/* Left Text Section */}
      <div className="text-white lg:w-1/2 w-full">
        <div>
          <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-snug text-[var(--navy)] break-words">
            {title}
          </h1>
        </div>

        {/* Mobile Image Under Heading */}
        <div className="relative mt-6 w-full max-w-[320px] h-64 mx-auto lg:hidden">
          <div className="absolute inset-0 translate-y-3 w-full h-full bg-[var(--navy)] rounded-tl-[6rem] rounded-br-[6rem]"></div>
          <div className="absolute inset-0 z-10">
            <Image
              src={"/care-provider-cta.png"}
              alt="care provider CTA"
              fill
              className="rounded-tl-[6rem] rounded-br-[6rem] object-cover"
            />
          </div>
        </div>

        <div className="my-5 w-full pt-7 lg:max-w-[90%]">
          <p className="text-[var(--navy)] text-base sm:text-lg md:text-xl text-left leading-relaxed" dangerouslySetInnerHTML={{__html: description || description}}>
          </p>

        </div>

        <div className="max-w-3xl">
          <Link href="https://carenest-caregiver.vercel.app/signup">
            <YellowButton className="px-14 py-7 text-xl">Register now</YellowButton>
          </Link>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative hidden lg:block w-full sm:w-2/3 lg:w-1/3 h-80 lg:h-2/3 mx-auto lg:mx-0">
        <div className="absolute right-5 lg:right-20 top-10 w-full h-80 bg-[var(--navy)] rounded-tl-[6rem] rounded-br-[6rem]"></div>
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
