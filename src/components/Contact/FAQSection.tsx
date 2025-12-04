"use client";
import { useEffect, useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
interface FAQData {
  sectionTitle: string;
  faqItems: FAQItem[];
}

const FAQSection = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faq, setFaq] = useState<FAQData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/ContactUs`;
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
            sectionTitle: faqs.sectionTitle || "Have Questions? We Have Answers!",
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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full md:w-1/2 space-y-4">
      <h2 className="lg:text-5xl text-4xl font-medium text-[var(--navy)] font-Urbanist leading-tight">
        {faq?.sectionTitle || "Have Questions?\nWe Have Answers!"}
      </h2>
      <p className="text-lg text-[var(--navy)]/70 ">
        Your Comprehensive CareLinix Guide: Answers to Your Most <br />Common Questions
      </p>
      {loading && <div className="text-[var(--navy)]">Loading FAQs...</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && Array.isArray(faq?.faqItems) && faq.faqItems.length > 0 && faq.faqItems.map((item, index) => (
        <div key={item.id}>
          <button
            onClick={() => toggle(index)}
            className="w-full text-left border-b py-2 flex justify-between items-center text-[var(--navy)] text-lg leading-5 cursor-pointer"
          >
            {item.question}
            <span className="text-[32px]">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="text-lg text-[#98A2B3] leading-5 mt-2">
              {item.answer}
            </p>
          )}
        </div>
      ))}
      {!loading && !error && (!faq?.faqItems || !Array.isArray(faq.faqItems) || faq.faqItems.length === 0) && (
        <div className="text-[var(--navy)]">No FAQs available.</div>
      )}
    </div>
  );
};

export default FAQSection;
