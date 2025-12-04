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
    <div className="flex lg:flex-row flex-col bg-[var(--navy)] lg:px-18 px-8 lg:py-18 py-12">
      <div>
        <div className="relative w-full h-48 lg:w-38 sm:ml-8">
          <Image
            src={"/care-provider-cta.png"}
            alt="faq"
            fill
            className="rounded-t-[3rem] rounded-b-[3rem] object-cover"
          />
        </div>
        <h1 className="mt-6 text-[var(--yellow)] font-medium lg:text-5xl text-3xl lg:w-2/3">
          {faq?.sectionTitle || "Curious About Caregiving on Our Platform? We’ve Got Answers!"}
        </h1>
      </div>
      <div className="lg:w-1/2 lg:mt-0 mt-4">
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
