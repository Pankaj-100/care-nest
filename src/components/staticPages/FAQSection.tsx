"use client";
import * as React from "react";
import { ApiFaqItem } from "./ServiceTemplate";

export default function FAQSection({ faqData }: { faqData: ApiFaqItem }) {
  const [openFAQ, setOpenFAQ] = React.useState(0);
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };
  return (
    <div className="w-full bg-[#F7F7F3] py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="flex-1 lg:pr-8">
          
          <h2 className="text-4xl lg:text-2xl mb-3 font-bold text-[#F2A307] leading-tight">
            General FAQ's
          </h2>
          <p className="text-[#233D4D] font-semibold text-4xl mb-4">
            {faqData.sectionTitle}
          </p>
        </div>
        <div className="flex-1 bg-[#233D4D0A] space-y-4">
          {faqData.faqItems.map((faq, index) => (
            <div key={faq.id} className="bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <span className="font-semibold text-[#233D4D] text-lg pr-4">
                  {faq.question}
                </span>
                <span className="text-[#233D4D] text-2xl font-light flex-shrink-0">
                  {openFAQ === index ? '−' : '+'}
                </span>
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
