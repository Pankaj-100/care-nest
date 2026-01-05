"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CustomAccordion } from "../common/CustomAccordion";


interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
interface FaqData {
  sectionTitle: string;
  faqItems: FaqItem[];
}

const FAQ = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [faq, setFaq] = useState<FaqData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/BecomeCaregiver`;
    setLoading(true);
    fetch(endpoint)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        const faqs = json?.data?.faqs?.[0];
        if (!faqs) {
          setError("No FAQ data found");
        } else {
          setFaq({
            sectionTitle: faqs.sectionTitle || "Curious About Caregiving on Our Platform? We’ve Got Answers!",
            faqItems: faqs.faqItems || [],
          });
        }
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load FAQ");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  return (
    <div className="flex lg:flex-row flex-col bg-[var(--navy)] lg:px-18 px-8 lg:py-18 py-12 relative overflow-hidden">
      {/* Upward Yellow Dotted Line - Top Right */}
      <div className="absolute top-0 right-0 w-32 h-32 lg:block hidden -mr-5 -mt-5">
        <Image
          src="/care-provider/upward.png"
          alt="decorative line"
          fill
          className="object-contain"
        />
      </div>

      {/* Downward Yellow Dotted Line - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-32 h-32 lg:block hidden -ml-5 -mb-5">
        <Image
          src="/care-provider/down.png"
          alt="decorative line"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10">
        <div className="relative w-full max-w-[240px] h-86 sm:h-96 lg:w-38 lg:h-80 lg:ml-15 mx-auto lg:mx-0 overflow-hidden rounded-[4rem]">
          <Image
            src={"/care-provider-cta.png"}
            alt="faq"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mt-6 lg:ml-15 text-[var(--yellow)] font-medium lg:text-5xl text-left text-3xl lg:w-2/3">
          {faq?.sectionTitle || "Curious About Caregiving on Our Platform? We’ve Got Answers!"}
        </h1>
      </div>
      <div className="lg:w-1/2 lg:mr-8 mt-8 lg:mt-0 w-full">
        {loading && <div className="text-white">Loading FAQs...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && Array.isArray(faq?.faqItems) && faq.faqItems.length > 0 && faq.faqItems.map((item, index) => (
          <CustomAccordion
            title={item.question}
            description={item.answer}
            key={item.id}
            value={index}
          />
        ))}
        {!loading && !error && (!faq?.faqItems || !Array.isArray(faq.faqItems) || faq.faqItems.length === 0) && (
          <div className="text-white">No FAQs available.</div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
