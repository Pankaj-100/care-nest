"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { YellowButton } from "../common/CustomButton";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setRequiredBy } from "@/store/slices/bookingSlice";

const RECIPIENT_OPTIONS = [
  "Mother",
  "Father",
  "Spouse / Partner",
  "Siblings",
  "Grandparents",
  "Child",
  "Myself",
];

// Custom SVG component for selected state
const CheckIcon: React.FC = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_2426_32706"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="23"
      height="22"
    >
      <path
        d="M12.5 22C13.8135 22.0016 15.1143 21.7437 16.3278 21.2411C17.5412 20.7384 18.6434 20.0009 19.571 19.071C20.5009 18.1434 21.2384 17.0412 21.7411 15.8278C22.2437 14.6143 22.5016 13.3135 22.5 12C22.5016 10.6866 22.2437 9.38572 21.7411 8.17225C21.2384 6.95878 20.5009 5.85659 19.571 4.92901C18.6434 3.99909 17.5412 3.26162 16.3278 2.75897C15.1143 2.25631 13.8135 1.99839 12.5 2.00001C11.1866 1.99839 9.88572 2.25631 8.67225 2.75897C7.45878 3.26162 6.35659 3.99909 5.42901 4.92901C4.49909 5.85659 3.76162 6.95878 3.25897 8.17225C2.75631 9.38572 2.49839 10.6866 2.50001 12C2.49839 13.3135 2.75631 14.6143 3.25897 15.8278C3.76162 17.0412 4.49909 18.1434 5.42901 19.071C6.35659 20.0009 7.45878 20.7384 8.67225 21.2411C9.88572 21.7437 11.1866 22.0016 12.5 22Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12L11.5 15L17.5 9"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#mask0_2426_32706)">
      <path d="M0.5 0H24.5V24H0.5V0Z" fill="#233D4D" />
    </g>
  </svg>
);

const NeedService: React.FC = () => {
  const [selected, setSelected] = useState<string>(RECIPIENT_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSelect = useCallback((val: string) => {
    setSelected(val);
  }, []);

  const handleNext = async () => {
    if (!selected) return;
    setSubmitting(true);
    dispatch(setRequiredBy(selected)); // Store only requiredBy in redux
    router.push("/care-giver");
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
      const nextIndex =
        (idx + dir + RECIPIENT_OPTIONS.length) % RECIPIENT_OPTIONS.length;
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
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => handleSelect(item)}
                className={`w-full h-14 rounded-full px-6 flex items-center justify-between text-[18px] font-medium transition outline-none
                  ${
                    isActive
                      ? "bg-white border border-[#233D4D] text-[#233D4D] shadow-sm"
                      : "bg-white border border-transparent text-[#233D4D] hover:border-gray-300 focus:border-gray-300"
                  }`}
              >
                <span>{item}</span>
                <span className="flex items-center justify-center">
                  {isActive && <CheckIcon />}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <YellowButton
            onClick={handleNext}
            disabled={submitting}
            className={`px-65 py-6 text-xl font-medium rounded-full ${
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