"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { YellowButton } from "../common/CustomButton";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Adjust path if needed
import { setRequiredBy } from "@/store/slices/bookingSlice"; // Add this action in your slice

const RECIPIENT_OPTIONS = [
  "Mother",
  "Father",
  "Spouse / Partner",
  "Siblings",
  "Grandparents",
  "Child",
  "Myself",
];

const NeedService: React.FC = () => {
  const [selected, setSelected] = useState<string>(RECIPIENT_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const requiredBy = useAppSelector(state => state.booking.requiredBy);

  console.log("NeedService Redux requiredBy:", requiredBy);

  const handleSelect = useCallback((val: string) => {
    setSelected(val);
  }, []);

  const handleNext = async () => {
    if (!selected) return;
    setSubmitting(true);
    dispatch(setRequiredBy(selected)); // Store only requiredBy in redux
    if (isAuthenticated) {
      router.push("/care-giver");
    } else {
      router.push("/signin");
    }
    setSubmitting(false);
  };

  // Keyboard arrow navigation for accessibility
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const idx = RECIPIENT_OPTIONS.indexOf(selected);
      if (idx === -1) return;
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (idx + dir + RECIPIENT_OPTIONS.length) % RECIPIENT_OPTIONS.length;
      const nextVal = RECIPIENT_OPTIONS[nextIndex];
      setSelected(nextVal);
      const btn = itemRefs.current[nextIndex];
      btn?.focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  return (
    <div className="w-full bg-[#F7F7F3] min-h-screen flex justify-center px-4">
      <div className="w-full max-w-[560px] mx-auto pt-14 pb-24">
        <h1 className="text-center font-semibold text-[#233D4D] text-[26px] sm:text-[30px] leading-snug tracking-[0.2px]">
          To personalize your care, tell us who
          <br className="hidden sm:block" /> needs assistance.
        </h1>

        <div
          role="radiogroup"
          aria-label="Care recipient"
          className="mt-12 space-y-4"
        >
          {RECIPIENT_OPTIONS.map((item, i) => {
            const isActive = item === selected;
            return (
              <button
                key={item}
                ref={el => { itemRefs.current[i] = el; }}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => handleSelect(item)}
                className={`w-full h-14 rounded-full px-6 flex items-center justify-between text-[15px] font-medium transition outline-none
                  ${
                    isActive
                      ? "bg-white border border-[#233D4D] text-[#233D4D] shadow-sm"
                      : "bg-white border border-transparent text-[#233D4D] hover:border-gray-300 focus:border-gray-300"
                  }`}
              >
                <span>{item}</span>
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold transition
                    ${
                      isActive
                        ? "border border-[#233D4D] text-[#233D4D]"
                        : "border border-transparent"
                    }`}
                >
                  {isActive ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <YellowButton
            onClick={handleNext}
            disabled={submitting}
            className={`px-65 py-6 text-md font-medium rounded-full ${
            !selected.length
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : ""
          }`}
          >
            {submitting ? (
              <>
                <svg
                  role="status"
                  className="w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 100.795C77.6142 100.795 100 78.409 100 50.795C100 23.1809 77.6142 0.795898 50 0.795898C22.3858 0.795898 0 23.1809 0 50.795C0 78.409 22.3858 100.795 50 100.795Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9706 50.795C93.9706 76.0491 76.0491 93.9706 50.795 93.9706C25.5409 93.9706 7.61938 76.0491 7.61938 50.795C7.61938 25.5409 25.5409 7.61938 50.795 7.61938C76.0491 7.61938 93.9706 25.5409 93.9706 50.795Z"
                    stroke="white"
                    strokeWidth="8.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Next"
            )}
          </YellowButton>
        </div>
      </div>
    </div>
  );
};

export default NeedService;