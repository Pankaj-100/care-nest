"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MapIcon } from "../icons/page";
import { useAppDispatch, useAppSelector } from "../../store/hooks"; // Adjust path as needed
import { setCareseekerZipcode } from "@/store/slices/bookingSlice"; // Adjust path as needed

const ZipCodePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [zip, setZip] = useState("");
  const [touched, setTouched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Only allow exactly 5 digits
  const isValid = /^\d{5}$/.test(zip);

  // Simple static suggestion list; in real-world we could swap with API
  const zipcodeSuggestions = [
    "77001", "77002", "77003", "77004", "77005",
    "77006", "77007", "77008", "77009", "77010",
    "77011", "77012", "77013", "77014", "77015"
  ];

  const filteredSuggestions = zipcodeSuggestions.filter((z) => z.startsWith(zip) && z !== zip).slice(0, 5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) {
      if (zip.length === 0) {
        toast.error("Please fill the zipcode");
      } else if (zip.length < 5) {
        toast.error("Please enter 5 digits zipcode");
      }
      return;
    }
    const cleanZip = zip.trim();
    if (Number(cleanZip) === 0) return;
    dispatch(setCareseekerZipcode(Number(cleanZip))); // Store in redux
    router.push("/find-job"); // Redirect to /find-job
  }

  const careseekerZipcode = useAppSelector(
    (state) => state.booking.careseekerZipcode
  );
  console.log("CaregiversPage Redux zipcode:", careseekerZipcode);

  return (
    <main className="w-full flex flex-col items-center px-4 py-14 md:py-20 bg-[#F9F9F7]">
      <h1 className="text-center text-2xl md:text-[34px] font-semibold leading-tight max-w-2xl text-[var(--navy)] mb-10">
        Enter Your ZIP Code To Search
        <br className="hidden sm:block" /> For Caregivers Near You.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-6"
        noValidate
      >
        <div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapIcon />
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="Enter ZIP Code"
              value={zip}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, "").slice(0, 5);
                setZip(next);
                setShowSuggestions(next.length > 0 && filteredSuggestions.length > 0);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full rounded-full bg-white border border-gray-200 focus:border-gray-300 focus:ring-0 outline-none py-4 pl-12 pr-5 text-lg text-gray-900 transition"
              maxLength={5}
              autoFocus
              aria-invalid={touched && !isValid}
              aria-describedby="zip-empty zip-error zip-prev"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden z-20">
                {filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-800 text-base"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setZip(s);
                      setShowSuggestions(false);
                      setTouched(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          {touched && zip.length === 0 && (
            <p
              id="zip-empty"
              className="text-lg text-red-600 mt-2 ml-1 font-medium"
            >
              Please fill the zipcode.
            </p>
          )}
          {touched && zip.length > 0 && zip.length < 5 && (
            <p
              id="zip-error"
              className="text-xs text-red-600 mt-2 ml-1 font-medium"
            >
              Please enter a valid 5-digit ZIP code.
            </p>
          )}
  
        </div>

        <button
            type="submit"
            className={`w-full bg-[#FFA726] text-[#233D4D] justify-center px-5 py-3 h-[46px] cursor-pointer hover:bg-[#FFB74D] rounded-3xl text-xl font-bold transition whitespace-nowrap`}
        >
          Continue
        </button>
      </form>
    </main>
  );
};

export default ZipCodePage;