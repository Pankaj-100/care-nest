"use client";
import React from "react";
import Image from "next/image";

export type VeteransApiData = {
  id: string;
  title1: string;
  description1: string;
  image1: string;
  image2: string;
  image3: string;
  title2: string;
  description2: string;
  title3: string;
  points: string[];
  sectionImage: string;
};

export type FaqItem = { id: string; question: string; answer: string };
export type VeteransFaqApi = {
  faqs: Array<{
    id: string;
    faqType: string;
    sectionTitle: string;
    faqItems: FaqItem[];
  }>;
  count: number;
};

interface VeteransFinancialAssistanceProps {
  pageData: VeteransApiData;
  faqSectionTitle: string;
  faqItems: FaqItem[];
}

export default function VeteransFinancialAssistance({ pageData, faqSectionTitle, faqItems }: VeteransFinancialAssistanceProps) {
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const [faqTitle, setFaqTitle] = React.useState(faqSectionTitle);
  const [faqs, setFaqs] = React.useState(faqItems);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  React.useEffect(() => {
    setFaqTitle(faqSectionTitle);
    setFaqs(faqItems);
  }, [faqSectionTitle, faqItems]);

  React.useEffect(() => {
    if (!API_BASE) return;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/Transitional%20Care`;

    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const payload = json?.data;
        const faqBlock = Array.isArray(payload?.faqs) ? payload.faqs[0] : payload;
        const sectionTitle = faqBlock?.sectionTitle;
        const items = faqBlock?.faqItems;
        if (sectionTitle) setFaqTitle(sectionTitle);
        if (Array.isArray(items)) setFaqs(items as FaqItem[]);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        console.error("Failed to fetch Transitional Care FAQs:", err);
      });

    return () => controller.abort();
  }, [API_BASE]);

  const headerTitle = pageData?.title1 || "Veterans Financial Assistance";
  const headerDescription =
    pageData?.description1 ||
    "If you are a Veteran or the Surviving Spouse of a Veteran, you will be pleased to know that CareWorks is a Veteran’s Home Care Specialist. You may be eligible for VA Aid and Attendant pension Benefits that can cover all or most of your home care costs!";

  const benefitsTitle =
    pageData?.title2 || "Veteran’s Benefits And Home Care";
  const benefitsDescription =
    pageData?.description2 ||
    "The approval rate for private individuals who apply directly to the VA on their own is only slightly above 30%. Our approval rate is 95%. You don’t have to worry about all of the paperwork and bureaucratic red tape normally associated with applying for these benefits. With over 60 years of combined geriatric, financial underwriting and assessment experience, our Professional Geriatric Care Managers can help you qualify for these benefits by providing expert advice and consultation services FREE OF CHARGE.";

  const points =
    pageData?.points ?? [
      "Free in-home assessment and application",
      "Financial analysis and underwriting",
      "Underwriting to the Benefit Rules, Regulations and Penalties",
      "Elimination of bureaucratic red tape and constant run-around",
      "Handle the sometimes confusing and voluminous documentation",
      "Eliminate improper, incomplete and inappropriate data",
      "Geriatric assessment and care plan analysis certification",
      "Manage events and activities that impact compliance issues",
      "Proper completion of annual VA audits",
    ];

  const image1Src = pageData?.image1 || "/veterans/image1.png";
  const image2Src = pageData?.image2 || "/veterans/image2.png";
  const image3Src = pageData?.image3 || "/veterans/image3.png";
  const sectionImageSrc = pageData?.sectionImage || "/veterans/image4.png";

  return (
    <div className="flex flex-col items-center pt-6 md:pt-10 pb-0">
      {/* Header Section */}
      <div className="w-full max-w-5xl px-4 md:px-6 lg:px-0 mt-6 md:mt-10 flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10 gap-6 text-center md:text-left">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <div className="text-[#F2A307] font-semibold text-2xl md:text-3xl mb-2">
            Home Care
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#233D4D] mb-3 md:mb-4 leading-tight">
            {headerTitle.split(" ").slice(0, 2).join(" ")}
            <br />
            {headerTitle.split(" ").slice(2).join(" ") || "Assistance"}
          </h1>
        </div>
        <p className="w-full md:w-1/2 text-[#233D4D] text-lg sm:text-lg md:text-xl md:ml-6 text-center md:text-left">
          {headerDescription}
        </p>
      </div>

      {/* Images Section */}
      <div className="flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center items-center mt-8 md:mt-12 mb-10 md:mb-12 px-4">
        <Image
          src={image1Src}
          alt="Veteran 1"
          width={232}
          height={264}
          className="w-28 sm:w-32 md:w-50 h-auto object-cover rounded-xl shadow-md"
        />
        <Image
          src={image2Src}
          alt="Veteran 2"
          width={232}
          height={264}
          className="w-28 sm:w-32 md:w-50 h-auto object-cover rounded-xl shadow-md"
        />
        <div className="relative">
          <Image
            src={image3Src}
            alt="Veteran 3"
            width={232}
            height={264}
            className="w-28 sm:w-32 md:w-50 h-auto object-cover rounded-xl shadow-md"
          />
          {/* Yellow design image, position as needed
          <Image src="/veterans/yellow.png" alt="Yellow Design" width={104} height={104} className="absolute bottom-0 right-1 w-26 h-26" /> */}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-5xl mt-6 md:mt-12 text-center px-4 md:px-6 lg:px-0">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#233D4D] mb-4">
          {benefitsTitle}
        </h2>
        <p className="text-[#233D4D] text-lg sm:text-lg md:text-xl mb-8 md:mb-10">
          {benefitsDescription}
        </p>
      </div>

      {/* Banner Section */}
      <div className="w-full bg-[#F2E9CE] py-10 md:py-12 mt-12 md:mt-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:gap-10 md:flex-row px-4 md:px-6">
          <div className="w-full md:w-1/2">
            <h3 className="mb-4 text-2xl sm:text-2xl font-semibold text-[#233D4D]">
              {pageData?.title3 ||
                "There Is Absolutely No Cost To The Veteran Or Their Surviving Spouse To Assist You With Preparing And Managing Your Application Approval Process With The VA, Including:"}
            </h3>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-lg sm:text-base md:text-lg text-[#233D4D] text-left">
              {points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
          <div className="flex w-full justify-center md:w-1/2 md:justify-end">
            <Image
              src={sectionImageSrc}
              alt="Veterans Banner"
              width={520}
              height={520}
              className="h-auto max-w-lg sm:max-w-lg md:max-w-sm lg:max-w-lg   rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section - dynamic from API */}
      <div className="w-full bg-white mt-0 md:mt-16 py-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-12 md:flex-row px-4 md:px-6 items-start">
          {/* Left: Heading */}
          <div className="w-full md:w-5/12 text-center md:text-left">
            <div className="mb-2 text-lg sm:text-base md:text-xl font-semibold text-[#F2A307]">
              General FAQ&apos;s
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-3xl font-bold leading-tight text-[#233D4D]">
              {faqTitle.split(" ").slice(0, 3).join(" ")}
              <br />
              {faqTitle.split(" ").slice(3).join(" ")}
            </h2>
          </div>
          {/* Right: FAQ Cards */}
          <div className="w-full md:w-7/12 flex flex-col gap-3">
            {faqs.length === 0 ? (
              <div className="rounded-xl bg-[#233D4D0A] p-4 sm:p-5 shadow-sm text-[#233D4D]">No FAQs available.</div>
            ) : (
              faqs.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                const safeHasAnswer = !!(item.answer && item.answer.trim() && item.answer.trim() !== '.');
                return (
                  <div key={`${item.id}-${idx}`} className="rounded-xl bg-[#233D4D0A] p-4 sm:p-5 shadow-sm">
                    <button
                      type="button"
                      className="w-full mb-2 flex items-center justify-between text-md sm:text-base md:text-md font-semibold text-[#233D4D] gap-3 focus:outline-none"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}-${idx}`}
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                    >
                      <span className="text-left flex-1">{item.question}</span>
                      <span className="text-2xl font-bold text-[#233D4D] flex-shrink-0">{isOpen ? '—' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${item.id}-${idx}`}
                        className="text-md sm:text-sm md:text-base leading-relaxed text-[#233D4D] prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: safeHasAnswer ? item.answer : '' }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Contact Banner Section */}
      <div className="w-full bg-[#F2A307] py-10 md:py-14 mt-10 md:mt-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center px-4">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-[#233D4D] leading-snug md:leading-tight">
            Contact Us Today For More Information
          </h2>
          <p className="mb-6 max-w-5xl font-light text-md sm:text-lg md:text-2xl leading-relaxed text-white">
            We Are Proud To Help You Attain The Benefits You Have Earned As{" "}
            <br className="hidden md:block" />
            <span className="font-light text-lg sm:text-xl md:text-2xl text-[#233D4D]">
              An Honored Transitional
            </span>{" "}
            Care
          </p>
          <a href="/contact">
          <button className="inline-flex cursor-pointer items-center gap-2 font-semibold rounded-full bg-[#233D4D] px-8 md:px-12 py-4 md:py-6 text-xl sm:text-xl md:text-xl text-white transition hover:bg-[#1a2c38]">
            Contact Us <span className="ml-1">&#8594;</span>
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}