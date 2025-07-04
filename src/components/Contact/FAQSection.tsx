"use client";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const questions: FAQItem[] = [
  {
    q: "What is CareLinix?",
    a: "If you have any questions or concerns about CareLinx, please don’t hesitate to reach out using the contact details below.",
  },
  {
    q: "How does CareLinix work?",
    a: "If you have any questions or concerns about CareLinx, please don’t hesitate to reach out using the contact details below.",
  },
  {
    q: "What services do caregivers provide?",
    a: "If you have any questions or concerns about CareLinx, please don’t hesitate to reach out using the contact details below.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className=" w-full md:w-1/2 space-y-4">
      <h2 className="lg:text-6xl text-4xl font-medium text-[var(--navy)] font-Urbanist leading-tight">
        Have Questions?
        <br />
        We Have Answers!
      </h2>
      <p className="text-md  text-[var(--navy)]/70 ">
        Your Comprehensive CareLinix Guide: Answers to Your Most <br></br>Common
        Questions
      </p>

      {questions.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggle(index)}
            className=" w-full text-left font-medium border-b py-2 flex justify-between items-center text-[var(--navy)] text-lg leading-5 cursor-pointer"
          >
            {item.q}
            <span className="text-[32px] font-light">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="text-lg text-[#98A2B3] leading-5 mt-2">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
