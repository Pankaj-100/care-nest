import React from "react";
import Image from "next/image";

export default function VeteransFinancialAssistance() {
  return (
    <div className="flex flex-col items-center py-5">
      {/* Header Section */}
      <div className="w-full max-w-4xl mt-10 flex flex-col md:flex-row justify-between items-start mb-10">
        <div>
          <div className="text-[#F2A307] font-semibold text-3xl mb-2">Home Care</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#233D4D] mb-4 leading-tight">
            Veterans Financial<br />Assistance
          </h1>
        </div>
        <p className="md:w-1/2 text-[#233D4D] ml-6 text-xl mt-15 md:mt-13">
          If you are a Veteran or the Surviving Spouse of a Veteran, you will be pleased to know that CareWorks is a Veteran’s Home Care Specialist. You may be eligible for VA Aid and Attendant pension Benefits that can cover all or most of your home care costs!
        </p>
      </div>

      {/* Images Section */}
      <div className="flex gap-8 justify-center mt-15 mb-12">
        <Image src="/veterans/image1.png" alt="Veteran 1" width={232} height={264} className="w-58 h-66 object-cover rounded-xl shadow-md" />
        <Image src="/veterans/image2.png" alt="Veteran 2" width={232} height={264} className="w-58 h-66 object-cover rounded-xl shadow-md" />
        <div className="relative">
          <Image src="/veterans/image3.png" alt="Veteran 3" width={232} height={264} className="w-58 h-66 object-cover rounded-xl shadow-md" />
          {/* Yellow design image, position as needed
          <Image src="/veterans/yellow.png" alt="Yellow Design" width={104} height={104} className="absolute bottom-0 right-1 w-26 h-26" /> */}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-5xl mt-12 text-center">
        <h2 className="text-4xl font-semibold text-[#233D4D] mb-4">Veteran’s Benefits And Home Care</h2>
        <p className="text-[#233D4D] text-xl mb-10">
          The approval rate for private individuals who apply directly to the VA on their own is only slightly above 30%. Our approval rate is 95%. You don’t have to worry about all of the paperwork and bureaucratic red tape normally associated with applying for these benefits. With over 60 years of combined geriatric, financial underwriting and assessment experience, our Professional Geriatric Care Managers can help you qualify for these benefits by providing expert advice and consultation services FREE OF CHARGE.
        </p>
      </div>

      {/* Banner Section */}
      <div className="w-full bg-[#F2E9CE] flex flex-col md:flex-row items-between justify-between py-6 mt-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h3 className="text-2xl md:text-2xl font-semibold text-[#233D4D] mb-6 text-left">
            There Is Absolutely No Cost To The Veteran Or Their Surviving Spouse To Assist You With Preparing And Managing Your Application Approval Process With The VA, Including:
          </h3>
          <ul className="list-disc pl-5 text-[#233D4D] text-md space-y-1 text-left">
            <li>Free in-home assessment and application</li>
            <li>Financial analysis and underwriting</li>
            <li>Underwriting to the Benefit Rules, Regulations and Penalties</li>
            <li>Elimination of bureaucratic red tape and constant run-around</li>
            <li>Handle the sometimes confusing and voluminous documentation</li>
            <li>Eliminate improper, incomplete and inappropriate data</li>
            <li>Geriatric assessment and care plan analysis certification</li>
            <li>Manage events and activities that impact compliance issues</li>
            <li>Proper completion of annual VA audits</li>
          </ul>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <Image
            src="/veterans/image4.png"
            alt="Veterans Banner"
            width={400}
            height={264}
            className="max-w-lg object-cover"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full flex flex-col md:flex-row items-start justify-between mt-16">
        {/* FAQ Left Side */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="text-[#F2A307] font-semibold text-3xl mb-2">General FAQ&apos;s</div>
          <h2 className="text-5xl font-bold text-[#233D4D] leading-tight">
            Some Frequently<br />
            Asked Questions<br />
            About The Veteran&apos;s<br />
            Pension Benefit
          </h2>
        </div>
        {/* FAQ Right Side */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="bg-[#F7F8FA] rounded-xl p-6 text-[#233D4D] shadow-sm">
            <div className="flex justify-between items-center font-semibold text-lg mb-2">
              Does every Veteran or surviving spouse receive this benefit?
              <span className="text-2xl font-bold">—</span>
            </div>
            <div className="text-base">
              Eligibility is determined based on service during a declared war period, income limitations, liquid assets and a medically documented disability by a physician. Our dedicated Veteran&apos;s Care Managers will work closely with you to determine your eligibility.
            </div>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl p-6 text-[#233D4D] shadow-sm flex justify-between items-center font-semibold text-lg">
            What are the costs associated with applying for this benefit?
            <span className="text-2xl font-bold">+</span>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl p-6 text-[#233D4D] shadow-sm flex justify-between items-center font-semibold text-lg">
            What are declared periods of war?
            <span className="text-2xl font-bold">+</span>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl p-6 text-[#233D4D] shadow-sm flex justify-between items-center font-semibold text-lg">
            Do I have to go to a VA physician to be covered by the pension benefits?
            <span className="text-2xl font-bold">+</span>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl p-6 text-[#233D4D] shadow-sm flex justify-between items-center font-semibold text-lg">
            Can I apply for the VA Pension Benefits on my own?
            <span className="text-2xl font-bold">+</span>
          </div>

          {/* Contact Banner Section */}
          <div className="w-full max-w-5xl bg-[#F2A307] flex flex-col items-center justify-center py-5 mt-8 rounded-none">
            <h2 className="text-6xl font-bold text-[#233D4D] mb-8 text-center">
              Contact Us Today For More Information
            </h2>
            <p className="text-white text-3xl mb-10 text-center max-w-4xl leading-snug">
              We Are Proud To Help You Attain The Benefits You Have Earned As<br />
              <span className="text-[#233D4D] font-bold">An Honored Veteran Of The US Armed Forces.</span>
            </p>
            <button className="bg-[#233D4D] text-white text-2xl font-semibold px-10 py-5 rounded-full flex items-center gap-3 hover:bg-[#1a2c38] transition">
              Contact Us <span className="ml-2">&#8594;</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}