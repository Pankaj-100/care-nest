"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGetCaregiverDetailsQuery, useBookmarkCaregiverMutation } from "@/store/api/bookingApi";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";
// import type { Booking } from "@/types/Booking";

// interface BookingDetailsProps {
  // booking: Booking;
// }

export interface CaregiverModalProps {
  isOpen: boolean;
  caregiverId: string | null;
  onClose: () => void;
  onAddCaregiver: (id: string) => void;
  isBookmarked: boolean;
  isSelected?: boolean; // Add this optional prop
  bookingStatus?: string; 
}

interface CaregiverDetail {
  id: string;
  name: string;
  address?: string;
  location?: string;
  experience?: number;
  isSelected?: boolean;
  price?: number;
  about?: string;
  services?: string[];
  avatar?: string | null;
  languages?: string[];
  gender?: string;
  distanceMiles?: number;
  verified?: boolean;
}

const cdnURL = "https://creative-story.s3.us-east-1.amazonaws.com";

const CaregiverModal: React.FC<CaregiverModalProps> = ({
  isOpen,
  caregiverId,
  onClose,
  onAddCaregiver,
  isBookmarked,
  isSelected = false, // Add this prop with default value
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
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/30 px-2 sm:px-4 pt-20 md:pt-0">
      <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 h-9 w-9 sm:h-10 sm:w-10 cursor-pointer rounded-full bg-white text-[#233D4D] border border-gray-200 hover:shadow-sm flex items-center justify-center z-10"
        >
          ✕
        </button>

        {isLoading && (
          <div className="p-6 sm:p-10 text-center text-sm text-gray-500">Loading caregiver...</div>
        )}
        {(isError || !data?.data?.details) && !isLoading && (
          <div className="p-6 sm:p-10 text-center text-sm text-red-500">Failed to load caregiver.</div>
        )}

        {!isLoading && !isError && data?.data?.details && (
          <ModalContent
            raw={data.data.details as CaregiverDetail | CaregiverDetail[]}
            onAddCaregiver={onAddCaregiver}
            isBookmarked={!!isBookmarked}
            isSelected={isSelected}
            caregiverId={caregiverId}
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
  isSelected: boolean;
  caregiverId: string | null;
  bookingStatus?: string; // <-- Add this line
}> = ({ raw, onAddCaregiver, isBookmarked, isSelected, caregiverId, bookingStatus }) => {
  const caregiver: CaregiverDetail = Array.isArray(raw) ? raw[0] : raw;
  const [bookmarkCaregiver, { isLoading: bookmarking }] = useBookmarkCaregiverMutation();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  // Sync bookmark state when prop changes (e.g., after refresh)
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked, caregiverId]);

  const avatarSrc =
    caregiver.avatar && typeof caregiver.avatar === "string" && caregiver.avatar.trim() !== ""
      ? caregiver.avatar.startsWith("http")
        ? caregiver.avatar
        : `${cdnURL}/${caregiver.avatar.replace(/^\/+/, "")}`
      : "/care-giver/boy-icon.png";

  const handleBookmark = async () => {
    if (!caregiver.id) return;
    try {
      await bookmarkCaregiver(caregiver.id).unwrap();
      setBookmarked((prev) => !prev);
      toast.success(
        bookmarked
          ? "Caregiver removed successfully!"
          : "Caregiver bookmarked successfully!"
      );
    } catch {
      toast.error("login to bookmark caregiver.");
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] h-full">
      {/* Left sidebar */}
      <aside className="bg-[#F6F8F4] p-3 sm:p-4 flex-shrink-0 overflow-y-auto max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh]">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Image
              src={avatarSrc}
              alt={caregiver.name}
              width={104}
              height={104}
              className="h-24 w-24 sm:h-36 sm:w-36 rounded-full object-cover ring-2 ring-white shadow"
            />
            {/* Verified tick */}
            {caregiver.verified && (
              <Image
                src="/care-giver/verified.png"
                alt="Verified"
                width={20}
                height={20}
                className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-7 sm:w-7"
              />
            )}
          </div>

          {/* Caregiver Name and Selected Badge */}
          <h2 className="mt-4 sm:mt-5 text-lg sm:text-[26px] font-semibold text-[#233D4D] leading-tight flex items-center gap-2 sm:gap-3 break-words">
            {caregiver.name}
            {typeof window !== "undefined" &&
              window.location.pathname.includes("/profile") &&
               (isSelected || bookingStatus === "hired" || bookingStatus === "completed") && (
                <span className="bg-[#2F3C51] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                    <path d="M6.75 13.5L2.25 9L3.3075 7.9425L6.75 11.3775L14.6925 3.4425L15.75 4.5L6.75 13.5Z" fill="white"/>
                  </svg>
                  Selected
                </span>
              )
            }
          </h2>

          <div className="mt-5 sm:mt-7 space-y-3 sm:space-y-4 w-full">
            <InfoRow label="Experience" value={caregiver.experience ? `${caregiver.experience}+ Years` : "N/A"} />
            <InfoRow
              label="Available Distance"
              value={caregiver.location ? `${caregiver.location}` : "N/A"}
            />
            <InfoRow
              label="Gender"
              value={caregiver.gender ?? "N/A"}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 sm:mt-8 w-full space-y-3 sm:space-y-4">
            <button
              type="button"
              className={`w-full h-11 sm:h-12 rounded-xl cursor-pointer border font-medium transition flex items-center justify-center gap-2 ${
                bookmarked 
                  ? "border-[#233D4D] bg-[#233D4D] text-white" 
                  : "border-[#233D4D1A] text-[#233D4D] bg-white hover:shadow-sm"
              }`}
              onClick={handleBookmark}
              disabled={bookmarking}
            >
              <Image
                src={bookmarked ? "/care-giver/bookmark-bold.png" : "/care-giver/bookmark.png"}
                alt="Save"
                width={16}
                height={16}
                className={bookmarked ? "filter brightness-0 invert" : ""}
              />
              {bookmarking
                ? "Saving..."
                : bookmarked
                  ? "Saved Caregiver"
                  : "Save Caregiver"}
            </button>

            {/* Show Message button instead of Add/Remove when in BookingDetails page */}
            {typeof window !== "undefined" && window.location.pathname.includes("/profile") ? (
              <button
                type="button"
                className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold bg-[#F2A307] text-[#233D4D] hover:bg-yellow-400 transition"
                onClick={() => {
                  // Redirect to messages or open chat with caregiver
                  window.location.href = `/inbox?caregiverId=${caregiverId}`;
                }}
              >
                Message
              </button>
            ) : (
              <button
                onClick={() => caregiverId && onAddCaregiver(caregiverId)}
                className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition ${
                  isSelected
                    ? "border-2 border-[#F2A307] text-[#F2A307] bg-white hover:bg-red-50"
                    : "bg-[var(--yellow)] hover:bg-yellow-400 text-[var(--navy)]"
                }`}
              >
                {isSelected ? "Remove Caregiver" : "+ Add Caregiver"}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Right content - with scrollable area */}
      <main className="overflow-y-auto max-h-[50vh] sm:max-h-[80vh]">
        <div className="p-4 sm:p-5 md:p-7">
          <h3 className="text-lg sm:text-2xl font-semibold text-[#233D4D]">Overview</h3>
          <hr className="mt-3 sm:mt-4 border-gray-200" />

          {/* About */}
          <CollapsibleSection title="About" defaultExpanded>
            <p className="text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-[#6B778C]">
              {caregiver.about?.trim() || "No description available."}
            </p>
          </CollapsibleSection>

          {/* Location */}
          <CollapsibleSection title="Location" defaultExpanded>
            <p className="text-[14px] sm:text-[15px] text-[#6B778C]">{caregiver.location ?? caregiver.address ?? "—"}</p>
          </CollapsibleSection>

          {/* Services */}
          <CollapsibleSection 
            title="My Services" 
            defaultExpanded={false}
          >
            {caregiver.services && caregiver.services.length > 0 ? (
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {caregiver.services.map((s, i) => (
                  <Pill key={`${s}-${i}`}>{s}</Pill>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No services listed.</p>
            )}
          </CollapsibleSection>

          {/* Languages */}
          <CollapsibleSection 
            title="Languages" 
            defaultExpanded={false}
          >
            {caregiver.languages && caregiver.languages.length > 0 ? (
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {caregiver.languages.map((l, i) => (
                  <Pill key={`${l}-${i}`}>{l}</Pill>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No languages specified.</p>
            )}
          </CollapsibleSection>
        </div>
      </main>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}> = ({ title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showDropdown, setShowDropdown] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Check if content height exceeds a threshold (e.g., 150px)
      const contentHeight = contentRef.current.scrollHeight;
      setShowDropdown(contentHeight > 150);
    }
  }, [children]);

  if (!showDropdown) {
    // If content is not large, show it directly without dropdown
    return (
      <div className="mt-6">
        <h3 className="text-xl font-medium text-[var(--navy)]">{title}</h3>
        <div className="mt-3" ref={contentRef}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h3 className="text-xl font-medium text-[var(--navy)] group-hover:text-[#FFA726] transition-colors">
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-[#FFA726] transition-colors" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-[#FFA726] transition-colors" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-3 animate-in slide-in-from-top-2 duration-200" ref={contentRef}>
          {children}
        </div>
      )}
      
      {!isExpanded && (
        <div className="mt-3 h-20 overflow-hidden relative">
          <div ref={contentRef} className="opacity-50">
            {children}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
        </div>
      )}
    </div>
  );
};

const InfoRow: React.FC<{ 
  label: string; 
  value: string; 
  isMultiline?: boolean;
}> = ({ label, value, isMultiline = false }) => (
  <div className={`text-sm text-[#6B778C] ${isMultiline ? 'space-y-1' : 'flex justify-between'}`}>
    <span className={isMultiline ? 'block font-medium' : ''}>{label}</span>
    <span className={`font-medium text-[#233D4D] ${isMultiline ? 'block text-xs leading-relaxed' : ''}`}>
      {value}
    </span>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-full bg-[#E1F5FE] px-4 py-2 text-sm font-semibold text-[#01579B]">
    {children}
  </div>
);

export default CaregiverModal;

