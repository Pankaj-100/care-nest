"use client";

import React from "react";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <div className="w-full flex flex-col items-center bg-white">
      {/* Top Section */}
      <div className="w-full max-w-7xl mt-15 flex flex-col md:flex-row items-start justify-between mb-16">
        <h1 className="text-6xl md:text-7xl font-bold text-[#233D4D] mb-8 md:mb-0 md:mr-12 whitespace-pre-line">
          Who We Are
        </h1>
        <div className="text-[#233D4D] text-lg md:text-xl max-w-2xl leading-relaxed">
          At CareWorks, we believe in honoring those who once cared for us by providing compassionate, reliable support that allows seniors to live with dignity in the comfort of their own homes. For over 17 years, we have served families across the Greater Houston area, helping loved ones age safely at home with the respect and attention they deserve.
          <br /><br />
          CareWorks is legally registered with the Texas Health and Human Services Commission under the name SilverCare LLC. This ensures that we operate with full compliance, transparency, and accountability, giving families the confidence that their loved ones are in safe, trusted hands.
        </div>
      </div>
      {/* Images Section */}
      <div className="w-full mt-15 max-w-6xl flex flex-wrap justify-center gap-8">
        <Image
          src="/whoWeAre/image1.png"
          alt="CareWorks support 1"
          width={250}
          height={450}
          className="w-60 h-80 object-cover shadow-md"
        />
        <Image
          src="/whoWeAre/image2.png"
          alt="CareWorks support 2"
          width={260}
          height={300}
          className=" object-cover shadow-md"
        />
        <Image
          src="/whoWeAre/image3.png"
          alt="CareWorks support 3"
          width={260}
          height={300}
          className=" object-cover shadow-md"
        />
        <Image
          src="/whoWeAre/image4.png"
          alt="CareWorks support 4"
          width={260}
          height={300}
          className="w-60 h-80 object-cover shadow-md"
        />
      </div>

      {/* Our Caregiver Network Section */}
      <section className="w-full bg-[#F7F7F3] py-15 flex flex-col items-center mt-20">
        <h2 className="text-6xl font-bold text-[#233D4D] mb-10 text-center">
          Our Caregiver Network
        </h2>
        <p className="text-[#233D4D] text-2xl max-w-5xl text-center mb-8 leading-snug">
          We empower clients to choose the caregiver who best fits their family&apos;s needs from a list of enrolled professionals. Each caregiver is carefully verified and screened through background checks and eligibility checks to ensure they meet our standards of safety, professionalism, and compassion.
        </p>
        <p className="text-[#233D4D] text-2xl max-w-5xl text-center leading-snug">
          If the caregivers you select are not available, we&apos;ll connect you with more options until you find the one most suitable to your loved one&apos;s needs. Our goal is to make the process simple, supportive, and centered on your family.
        </p>
      </section>
      <div className="w-full flex justify-center">
        <Image
          src="/whoWeAre/image5.png"
          alt="Caregiver with senior outdoors"
          width={1600}
          height={800}
          className="w-full max-w-9xl h-[580px] object-cover shadow"
          priority
        />
      </div>

      {/* Our Promise Section */}
      <section className="w-full max-w-7xl flex flex-col md:flex-row items-start justify-between mt-25 mb-19 px-4">
        <h2 className="text-6xl font-bold text-[#233D4D] mb-8 md:mb-0 md:mr-12 whitespace-pre-line md:w-1/3">
          Our Promise
        </h2>
        <div className="text-[#233D4D] text-2xl max-w-3xl leading-relaxed md:w-2/3">
          What sets us apart is our personal connection to caregiving. We understand the challenges families face because we&apos;ve lived them ourselves. That&apos;s why every service we provide is rooted in compassion, respect, and the belief that quality care should always feel personal.
          <br /><br />
          At CareWorks, we are more than caregivers — we are partners in supporting your family&apos;s journey.
        </div>
      </section>

      {/* Contact Banner Section */}
      <section className="w-full relative flex justify-start items-center py-20">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/whoWeAre/image6.png"
            alt="Contact Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay - covers entire image with #000000B2 */}
          <div
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #000000B2 0%, #00000099 100%, #00000000 100%)"
            }}
          />
        </div>
        {/* Rectangle Design Overlay - inset */}
        <div className="absolute z-20 pointer-events-none left-15 right-15 top-15 bottom-15">
          <Image
            src="/whoWeAre/rectangle-design.png"
            alt="Rectangle Design"
            fill
            className="object-fill"
          />
        </div>
        {/* Content - left aligned and moved left */}
        <div className="relative z-30 max-w-2xl px-8 py-12 flex flex-col items-start ml-25">
          <h2 className="text-[#F2A307] text-5xl font-bold mb-8">
            Contact Us Today For More Information
          </h2>
          <p className="text-white text-2xl mb-8">
            Make The Call That Can Improve Your Life Or That Of A Loved One. Contact Us Today To Inquire About Our Houston Based Home Care Services And To Find A Solution That Fits Your Budgetary Needs And Your Lifestyle.
          </p>
          <button   onClick={() => { window.location.href = '/contact'; }} className="bg-[#F2A307] text-[#233D4D] text-xl font-semibold px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#d89a06] transition">
            Contact Us <span className="ml-2">&#8594;</span>
          </button>
        </div>
      </section>
    </div>
  );
}