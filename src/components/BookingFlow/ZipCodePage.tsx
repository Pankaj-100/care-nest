"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapIcon } from "../icons/page";
import { useAppDispatch, useAppSelector } from "../../store/hooks"; // Adjust path as needed
import { setCareseekerZipcode } from "@/store/slices/bookingSlice"; // Adjust path as needed

const ZipCodePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [zip, setZip] = useState("");
  const [touched, setTouched] = useState(false);

  // Allow digits + optional space / dash (user can paste formats)
  const isValid = /^[A-Za-z0-9\- ]{3,10}$/.test(zip.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
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
        Enter your ZIP code to search
        <br className="hidden sm:block" /> for caregivers near you.
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
              inputMode="text"
              placeholder="Enter ZIP Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              onBlur={() => setTouched(true)}
              className="w-full rounded-full bg-white border border-gray-200 focus:border-gray-300 focus:ring-0 outline-none py-4 pl-12 pr-5 text-sm text-gray-900 transition"
              maxLength={10}
              autoFocus
              aria-invalid={touched && !isValid}
              aria-describedby="zip-error"
            />
          </div>
          {touched && !isValid && zip.length > 0 && (
            <p
              id="zip-error"
              className="text-xs text-red-600 mt-2 ml-1 font-medium"
            >
              Please enter 3–10 valid characters (letters, numbers, dash or space).
            </p>
          )}
        </div>

        <button
            type="submit"
            className={`w-full bg-[#FFA726] text-[#233D4D] justify-center px-5 py-3 h-[46px] cursor-pointer rounded-3xl text-sm font-semibold transition whitespace-nowrap`}
            disabled={!isValid}
        >
          Continue
        </button>
      </form>
    </main>
  );
};

export default ZipCodePage;