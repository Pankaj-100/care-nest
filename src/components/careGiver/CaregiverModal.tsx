"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { CustomButton } from "../common/CustomInputs";
import { useGetCaregiverDetailsQuery } from "@/store/api/bookingApi";


interface CaregiverDetail {
  id: string;
  name: string;
  address?: string;
  experience?: number;
  price?: number;
  about?: string;
  mobile?: string;
  email?: string;
  services?: string[];
  avatar?: string;
  languages?: string[]; // optional
  gender?: string; // optional
  distanceMiles?: number; // optional
}

interface CaregiverModalProps {
  isOpen: boolean;
  caregiverId: string | null;
  onClose: () => void;
  onAddCaregiver: (id: string) => void;
  isBookmarked?: boolean;
}

const cdnURL = "https://dev-carenest.s3.ap-south-1.amazonaws.com";

const CaregiverModal: React.FC<CaregiverModalProps> = ({
  isOpen,
  caregiverId,
  onClose,
  onAddCaregiver,
  isBookmarked,
}) => {
  const { data, isLoading, isError } = useGetCaregiverDetailsQuery(
    caregiverId || "",
    { skip: !isOpen || !caregiverId }
  );

  const viewedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sendView = async (id: string) => {
      try {
        const token =
          (typeof window !== "undefined" &&
            (localStorage.getItem("authToken") || "")) ||
          "";
        if (!token) return;
        const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";
        await fetch(`${base}/api/v1/views/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* silent */
      }
    };

    if (
      isOpen &&
      caregiverId &&
      !isLoading &&
      !isError &&
      data?.data?.details &&
      !viewedRef.current.has(caregiverId)
    ) {
      viewedRef.current.add(caregiverId);
      const key = "caregiver_views_tracked";
      try {
        const stored = JSON.parse(sessionStorage.getItem(key) || "[]") as string[];
        if (!stored.includes(caregiverId)) {
          sendView(caregiverId);
          sessionStorage.setItem(key, JSON.stringify([...stored, caregiverId]));
        }
      } catch {
        sendView(caregiverId);
      }
    }
  }, [isOpen, caregiverId, isLoading, isError, data]);

  if (!isOpen || !caregiverId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 h-10 w-10 cursor-pointer rounded-full bg-white text-[#233D4D] border border-gray-200 hover:shadow-sm flex items-center justify-center"
        >
          ✕
        </button>

        {isLoading && (
          <div className="p-12 text-center text-sm text-gray-500">Loading caregiver...</div>
        )}
        {(isError || !data?.data?.details) && !isLoading && (
          <div className="p-12 text-center text-sm text-red-500">Failed to load caregiver.</div>
        )}

        {!isLoading && !isError && data?.data?.details && (
          <ModalContent
            raw={data.data.details as CaregiverDetail | CaregiverDetail[]}
            onAddCaregiver={onAddCaregiver}
            isBookmarked={!!isBookmarked}
          />
        )}
      </div>
    </div>
  );
};

const ModalContent: React.FC<{
  raw: CaregiverDetail | CaregiverDetail[];
  onAddCaregiver: (id: string) => void;
  isBookmarked: boolean;
}> = ({ raw, onAddCaregiver, isBookmarked }) => {
  const caregiver: CaregiverDetail = Array.isArray(raw) ? raw[0] : raw;

  const avatarSrc =
    caregiver.avatar && caregiver.avatar.trim() !== ""
      ? caregiver.avatar.startsWith("http")
        ? caregiver.avatar
        : `${cdnURL}/${caregiver.avatar.replace(/^\/+/, "")}`
      : "/care-giver/boy-icon.png";

  return (
    <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]">
      {/* LEFT: Profile summary */}
      <aside className="bg-[#F6F8F4] p-8 md:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Image
              src={avatarSrc}
              alt={caregiver.name}
              width={144}
              height={144}
              className="h-36 w-36 rounded-full object-cover ring-2 ring-white shadow"
            />
            {/* Verified tick */}
            <Image
              src="/care-giver/verified.png"
              alt="Verified"
              width={28}
              height={28}
              className="absolute -bottom-1 -right-1 h-7 w-7"
            />
          </div>

          <h2 className="mt-5 text-[26px] font-semibold text-[#233D4D] leading-tight">
            {caregiver.name}
          </h2>

          <div className="mt-7 space-y-4 w-full">
            <InfoRow label="Experience" value={`${caregiver.experience ?? 0}+ Years`} />
            <InfoRow
              label="Available Distance"
              value={
                caregiver.distanceMiles ? `Within ${caregiver.distanceMiles} miles` : "Within 10 miles"
              }
            />
            <InfoRow label="Preferred Gender" value={caregiver.gender ?? "Male"} />
          </div>

          {/* Actions */}
          <div className="mt-8 w-full space-y-4">
            <button
              type="button"
              className="w-full h-12 rounded-xl border border-[#233D4D1A] text-[#233D4D] font-medium bg-white hover:shadow-sm transition flex items-center justify-center gap-2"
            >
              <Image
                src={isBookmarked ? "/care-giver/bookmark-bold.png" : "/care-giver/bookmark.png"}
                alt="Save"
                width={18}
                height={18}
              />
              Save Caregiver
            </button>

            <CustomButton
              onClick={() => caregiver.id && onAddCaregiver(caregiver.id)}
              className="w-full h-12 rounded-xl text-[15px] font-semibold"
            >
              + Add Caregiver
            </CustomButton>
          </div>
        </div>
      </aside>

      {/* RIGHT: Details */}
      <main className="p-8 md:p-10 overflow-y-auto">
        <h3 className="text-2xl font-semibold text-[#233D4D]">Overview</h3>
        <hr className="mt-4 border-gray-200" />

        {/* About */}
        <Section title="About">
          <p className="text-[15px] leading-7 text-[#6B778C]">
            {caregiver.about ??
              "No description available."}
          </p>
        </Section>

        {/* Location */}
        <Section title="Location">
          <p className="text-[15px] text-[#6B778C]">{caregiver.address ?? "—"}</p>
        </Section>

        {/* Services */}
        <Section title="My Services">
          {caregiver.services && caregiver.services.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {caregiver.services.map((s, i) => (
                <Pill key={`${s}-${i}`}>{s}</Pill>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No services listed.</p>
          )}
        </Section>

        {/* Languages */}
        <Section title="Languages">
          {caregiver.languages && caregiver.languages.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {caregiver.languages.map((l, i) => (
                <Pill key={`${l}-${i}`}>{l}</Pill>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No languages specified.</p>
          )}
        </Section>
      </main>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between text-sm text-[#6B778C]">
    <span>{label}</span>
    <span className="font-medium text-[#233D4D]">{value}</span>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-xl font-medium text-[var(--navy)]">{title}</h3>
    <div className="mt-3">{children}</div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-full bg-[#E1F5FE] px-4 py-2 text-sm font-semibold text-[#01579B]">
    {children}
  </div>
);

export default CaregiverModal;

