"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {YellowButton} from "../common/CustomButton";

interface Service {
  id: string;
  title: string;
  desc: string;
  img: string; // placeholder path; replace with real images later
}

const services: Service[] = [
  {
    id: "personal-care",
    title: "Personal care",
    desc: "Mobility, Health-Related Tasks,\nShowering & Toileting",
    img: "/personal-care1.png",
  },
  {
    id: "housekeeping",
    title: "Housekeeping",
    desc: "Cooking, Dish washing,\nVacuuming & Grocery shopping",
    img: "/house-keeping.png",
  },
  {
    id: "companionship",
    title: "Companionship",
    desc: "Emotional Support,\nConversation & Reading",
    img: "/championship.png",
  },
  {
    id: "specialized",
    title: "Specialized care",
    desc: "Behavioral support, Mobility\nassistance",
    img: "/specialized-care.png",
  },
  {
    id: "home-sitter",
    title: "Home Sitter",
    desc: "Assistance with Daily Activities,\nMedication Reminders",
    img: "/home-sitter.png",
  },
  {
    id: "transportation",
    title: "Transportation",
    desc: "Medical Appointment\nTransport, Errand Assistance",
    img: "/transportation.png",
  },
];

const cardBase =
  "relative flex flex-col items-center text-center gap-4 bg-white rounded-xl shadow-sm p-8 w-full max-w-[340px] border transition hover:shadow-md";

const FindCareGiver: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleNext() {
    if (!selected.length) return;
    // Pass selected services to next step (example -> zip-code page)
    router.push(`/need-service?services=${encodeURIComponent(selected.join(","))}`);
  }

  return (
    <main className="w-full px-4 py-14 md:py-16 bg-[#F8F9F7]">
      <h1 className="text-center text-[22px] md:text-[30px] font-semibold text-[var(--navy)] mb-12 leading-snug">
        Pick the right service for your home care needs.
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8 md:gap-x-10 md:gap-y-12 md:grid-cols-3 lg:grid-cols-3 place-items-start">
        {services.map((s) => {
          const active = selected.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              className={`${cardBase} ${
                active
                  ? "border-[var(--navy)]"
                  : "border-transparent hover:border-gray-200"
              }`}
              aria-pressed={active}
            >
              {/* Illustration (replace src images later) */}
              <div className="h-28 flex items-center">
                <Image
                  src={s.img}
                  alt={s.title}
                  width={140}
                  height={140}
                  className="w-auto h-auto"
                />
              </div>
              <h2 className="font-semibold text-sm md:text-base text-[#233D4D]">
                {s.title}
              </h2>
              <p className="text-[11px] leading-relaxed whitespace-pre-line text-[#98A2B3] max-w-[270px]">
                {s.desc}
              </p>

              {active && (
                <span
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--navy)] text-white flex items-center justify-center text-xs"
                  aria-label="Selected"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10.5l3.5 3L15 6.5"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mt-12">
        <YellowButton
          onClick={handleNext}
          className={`px-24 py-6 text-md font-medium rounded-full ${
            !selected.length
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : ""
          }`}
        >
          Next
        </YellowButton>
      </div>
    </main>
  );
};

export default FindCareGiver;