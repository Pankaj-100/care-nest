"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { YellowButton } from "../common/CustomButton";
import { useAppDispatch } from "@/store/hooks"; // Adjust path if needed
import { setServiceIds } from "@/store/slices/bookingSlice"; // Add this action in your slice
import { useGetServiceHighlightsQuery } from "@/store/api/bookingApi";

const cardBase =
  "relative flex flex-col items-center text-center gap-4 bg-white rounded-xl shadow-sm p-8 w-full max-w-[340px] border transition hover:shadow-md";

const FindCareGiver: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Fetch services from backend
  const { data, isLoading, error } = useGetServiceHighlightsQuery();

  console.log("FindCareGiver mounted");

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleNext() {
    if (!selected.length) return;
    console.log("Selected service IDs for booking:", selected);
    dispatch(setServiceIds(selected));
    router.push("/need-service");
  }

  // If you need to prepend your backend URL:
  const backendUrl = process.env.NEXT_PUBLIC_API_URL; // e.g., "https://your-backend.com"

  return (
    <main className="w-full px-4 py-14 md:py-16 bg-[#F7F7F3]">
      <h1 className="text-center text-[22px] md:text-[30px] font-semibold text-[var(--navy)] mb-12 leading-snug">
        Pick the right service for your home care needs.
      </h1>

      {isLoading ? (
        <div className="text-center py-10">Loading services...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Failed to load services.
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 md:gap-x-10 md:gap-y-12 md:grid-cols-3 lg:grid-cols-3 place-items-start">
          {data?.services.map((s) => {
            const active = selected.includes(s.id);
            const iconUrl = `${backendUrl}${s.icon}`;
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
                <div className="h-28 flex items-center">
                  <Image
                    src={iconUrl}
                    alt={s.name}
                    width={140}
                    height={140}
                    className="w-auto h-auto"
                  />
                </div>
                <h2 className="font-semibold text-sm md:text-base text-[#233D4D]">
                  {s.name}
                </h2>
                <p className="text-[11px] leading-relaxed whitespace-pre-line text-[#98A2B3] max-w-[270px]">
                  {s.highlight}
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
      )}

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