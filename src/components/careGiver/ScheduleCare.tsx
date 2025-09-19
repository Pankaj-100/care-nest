"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import BookSuccessful from "./BookSuccessful";
import {
  useCreateBookingMutation,
} from "@/store/api/bookingApi";
import { CustomButton } from "@/components/common/CustomInputs";
import {useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPendingBooking } from "@/store/slices/bookingSlice"; // Create this action
// Use the imported SVG component (alias to PascalCase for JSX)
import { calenderIcon as CalendarIcon } from "../icons/page";
import { useSearchParams, useRouter } from "next/navigation";

export interface SelectedCaregiver {
  id: string;
  name: string;
  specialty: string;
  price: string;
  experience: string;
  avatar: string;
  isBookmarked?: boolean;
}

export interface ScheduleCareProps {
  isOpen: boolean;
  OnClose: () => void;
  selectedCaregivers: SelectedCaregiver[];
}

interface BookingResponse {
  success?: boolean;
  message?: string;
}

function isBookingResponse(r: unknown): r is BookingResponse {
  return typeof r === "object" && r !== null && "success" in r;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type Day = (typeof DAYS)[number];

const defaultStart = 9 * 60; // 09:00 AM
const defaultEnd = 12 * 60;  // 12:00 PM

function fmt(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

const defaultRanges: { id: string; start: number; end: number }[] = [
  { id: "r1", start: 9 * 60, end: 12 * 60 }, // 09:00 - 12:00
  { id: "r2", start: 15 * 60, end: 18 * 60 }, // 03:00 - 06:00
];

const initialSchedule: Record<Day, { id: string; start: number; end: number }[]> = DAYS.reduce((acc, d) => {
  acc[d] = d === "Sun" || d === "Mon" ? defaultRanges.map(r => ({ ...r, id: `${d}-${r.id}` })) : [];
  return acc;
}, {} as Record<Day, { id: string; start: number; end: number }[]>);

const ScheduleCare = ({ isOpen, OnClose, selectedCaregivers }: ScheduleCareProps) => {

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const requiredBy = useAppSelector(state => state.booking.requiredBy);
  const serviceIds = useAppSelector((state) => state.booking.serviceIds);
  const careseekerZipcode = useAppSelector(state => state.booking.careseekerZipcode);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [selectedDays, setSelectedDays] = useState<Day[]>(["Sun", "Mon"]);
  const [schedule, setSchedule] = useState<Record<Day, { id: string; start: number; end: number }[]>>(initialSchedule);
  const [applyAll, setApplyAll] = useState(true);
  const [varySchedule, setVarySchedule] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const bookingSuccess = searchParams.get("bookingSuccess") === "true";

  useEffect(() => {
    if (bookingSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [bookingSuccess]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && OnClose();
    if (isOpen) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, OnClose]);

  // Remove addTime and allow only one slot per day
  const changeTime = (d: Day, key: "start" | "end", value: number) => {
    const v = Math.max(0, Math.min(24 * 60, value));
    setSchedule((prev) => {
      const updated = prev[d].map((r) => {
        const next = { ...r, [key]: v } as { id: string; start: number; end: number };
        // Ensure start < end
        if (next.end <= next.start) {
          if (key === "start") next.end = Math.min(24 * 60, next.start + 60);
          else next.start = Math.max(0, next.end - 60);
        }
        return next;
      });
      let res = { ...prev, [d]: updated };
      // Apply to all selected days if toggle is on
      if (applyAll) {
        selectedDays
          .filter((sd) => sd !== d)
          .forEach((sd) => {
            res = { ...res, [sd]: updated.map((r) => ({ ...r, id: `${sd}-0` })) };
          });
      }
      return res;
    });
  };

  // When toggling a day, always seed with one slot if missing
  const toggleDay = (d: Day) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
    setSchedule((prev) => {
      if (!prev[d] || prev[d].length === 0) {
        return { ...prev, [d]: [{
          id: `${d}-0`,
          start: defaultStart,
          end: defaultEnd,
        }] };
      }
      // If more than one slot, keep only the first
      return { ...prev, [d]: [prev[d][0]] };
    });
  };

  const daySummary = (d: Day) =>
    (schedule[d] || [])
      .map((r) => `${fmt(r.start)} - ${fmt(r.end)}`)
      .join(", ") || "No time set";

  const minutesStep = 30; // slider step


  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!startDate) return setFormError("Select start date.");
    if (serviceIds.length === 0) return setFormError("Select at least one service.");
    if (selectedCaregivers.length === 0) return setFormError("Select at least one caregiver.");
    if (selectedDays.length === 0) return setFormError("Select at least one meeting day.");

    // Build weeklySchedule array
    const weeklySchedule: { weekDay: number; startTime: string; endTime: string }[] = [];
    selectedDays.forEach((d) => {
      // Only take the first slot for each day
      const slot = schedule[d]?.[0];
      if (slot) {
        weeklySchedule.push({
          weekDay: DAYS.indexOf(d),
          startTime: fmtTime(slot.start),
          endTime: fmtTime(slot.end),
        });
      }
    });

    // Prepare shortlistedCaregiversIds from selectedCaregivers
    const shortlistedCaregiversIds = selectedCaregivers.map(c => c.id);

    // API payload
    const payload = {
      startDate: startDate ? startDate.toISOString().slice(0, 10) : "",
      endDate: endDate ? endDate.toISOString().slice(0, 10) : undefined,
      serviceIds,
      careseekerZipcode: Number(careseekerZipcode),
      requiredBy,
      weeklySchedule,
      shortlistedCaregiversIds,
    };

    if (!isAuthenticated) {
      // Store booking data in redux and redirect to signin
      dispatch(setPendingBooking(payload));
      OnClose();
      router.push("/signin"); // <-- use router.push instead of window.location.href
      return;
    }

    // Proceed with booking API call if authenticated
    try {
      const result = await createBooking(payload).unwrap();
      if (isBookingResponse(result) && result.success) {
        setIsSuccessModalOpen(true);
      } else {
        setFormError(result.message || "Booking failed. Please try again.");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err && typeof (err as { data?: { message?: string } }).data?.message === "string") {
        setFormError((err as { data?: { message?: string } }).data?.message ?? "Booking failed. Please try again.");
      } else if (err instanceof Error && err.message) {
        setFormError(err.message);
      } else {
        setFormError("Booking failed. Please try again.");
      }
    }
  };

  // Helper for time formatting
  function fmtTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  if (!isOpen) return null;

  if (isSuccessModalOpen) {
    return (
      <BookSuccessful
        isModalOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          OnClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 h-screen">
      <div className="absolute inset-0" onClick={OnClose} />
      <div
        className="relative z-50 w-full max-w-2xl bg-white rounded-2xl p-4 sm:p-6 shadow-lg overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h1 className="text-center text-[var(--navy)] font-bold text-[22px]">
          Schedule Your Care
        </h1>
        <p className="text-center text-[var(--cool-gray)] text-sm mt-1 mb-6">
          Pick a preferred date and set the duration to continue booking.
        </p>

        {/* Selected caregivers */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[var(--navy)] font-semibold text-sm">Selected Caregivers</h2>
          <button
            type="button"
            onClick={OnClose}
            className="text-[var(--yellow)] font-semibold text-sm hover:opacity-80"
          >
            Change
          </button>
        </div>
        <div className="rounded-2xl border border-[#EBEBEB] p-3 sm:p-4 mb-6">
          <div className="space-y-3">
            {selectedCaregivers.map((c, idx) => (
              <div key={c.id}>
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      c.avatar && c.avatar.trim() !== "/care-giver/boy-icon.png"
                        ? c.avatar.startsWith("http")
                          ? c.avatar
                          : `https://dev-carenest.s3.ap-south-1.amazonaws.com/${c.avatar.replace(/^\/+/, "")}`
                        : "/care-giver/boy-icon.png"
                    }
                    alt={c.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full"
                  />
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <div className="min-w-32">
                      <p className="text-[var(--navy)] font-semibold text-sm leading-tight">
                        {c.name}
                      </p>
                      <p className="text-[#7B8A9C] text-xs leading-tight">{c.specialty}</p>
                    </div>
                    <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[6px] text-xs">
                      {c.experience && c.experience !== "null" ? c.experience : "0+ Years"}
                    </span>
                  </div>
                </div>
                {idx < selectedCaregivers.length - 1 && (
                  <div className="border-t border-[#EBEBEB] mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[var(--navy)] font-semibold text-sm mb-1">
              Preferred Meeting Date
            </label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                dateFormat="dd-MM-yyyy"
                className="!w-full border border-gray-300 rounded-full py-3 pl-4 pr-10 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
              />
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px]" />
            </div>
          </div>
          <div>
            <label className="block text-[var(--navy)] font-semibold text-sm mb-1">
              Service End Date (Optional)
            </label>
            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate || new Date()}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className="!w-full border border-gray-300 rounded-full py-3 pl-4 pr-10 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
              />
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px]" />
            </div>
          </div>
        </div>


        {/* Service Days And Times */}
        <div className="mb-3">
          <label className="block text-[var(--navy)] font-semibold text-sm mb-2">
            Service Days And Times
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {DAYS.map((d) => {
              const active = selectedDays.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`px-4 py-2 rounded-lg text-sm border ${
                    active
                      ? "bg-[#233D4D] text-white border-[#233D4D]"
                      : "bg-white text-[#233D4D] border-[#E2E8F0]"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {/* Show only one slot per selected day */}
          {selectedDays.map((d, idx) => (
            <div key={d} className="rounded-2xl border border-[#EBEBEB] p-4 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-[#233D4D] font-medium">
                  {d} -{" "}
                  <span className="text-[#7B8A9C] font-normal">{daySummary(d)}</span>
                </p>
                <button
                  type="button"
                  className="text-[#233D4D] text-lg"
                  onClick={() => setSelectedDays((prev) => prev.filter((day) => day !== d))}
                  title="Remove this day"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 space-y-6">
                {schedule[d]?.slice(0, 1).map((r) => (
                  <div key={r.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#7B8A9C]">
                      <span>{fmt(9 * 60)}</span>
                      <span>{fmt(12 * 60)}</span>
                      <span>{fmt(15 * 60)}</span>
                      <span>{fmt(18 * 60)}</span>
                    </div>
                    <div className="relative">
                      <div className="h-2 bg-gray-200 rounded-full" />
                      <input
                        type="range"
                        min={0}
                        max={24 * 60}
                        step={minutesStep}
                        value={r.start}
                        onChange={(e) =>
                          changeTime(d, "start", Number(e.target.value))
                        }
                        className="absolute top-1/2 -translate-y-1/2 w-full opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min={0}
                        max={24 * 60}
                        step={minutesStep}
                        value={r.end}
                        onChange={(e) =>
                          changeTime(d, "end", Number(e.target.value))
                        }
                        className="absolute top-1/2 -translate-y-1/2 w-full opacity-0 cursor-pointer"
                      />
                      <div
                        className="absolute top-[6px] h-2 bg-[#233D4D] rounded-full"
                        style={{
                          left: `${(r.start / (24 * 60)) * 100}%`,
                          width: `${((r.end - r.start) / (24 * 60)) * 100}%`,
                        }}
                      />
                      <div
                        className="absolute -top-1.5 h-4 w-4 rounded-full bg-white border-2 border-[#233D4D]"
                        style={{ left: `calc(${(r.start / (24 * 60)) * 100}% - 8px)` }}
                      />
                      <div
                        className="absolute -top-1.5 h-4 w-4 rounded-full bg-white border-2 border-[#233D4D]"
                        style={{ left: `calc(${(r.end / (24 * 60)) * 100}% - 8px)` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#7B8A9C]">
                      <span>{fmt(r.start)}</span>
                      <span>{fmt(r.end)}</span>
                    </div>
                  </div>
                ))}
                {/* Remove "+ Add Time" button */}
                {/* Only show "Apply this time to all days" for first card */}
                {idx === 0 && (
                  <label className="flex items-center justify-center gap-2 text-sm text-[#233D4D] mt-2">
                    <input
                      type="checkbox"
                      checked={applyAll}
                      onChange={(e) => setApplyAll(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    Apply this time to all days
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-[#233D4D] mb-4">
          <input
            type="checkbox"
            checked={varySchedule}
            onChange={(e) => setVarySchedule(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          My Schedule may vary
        </label>

        {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}

        {/* Footer actions */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={OnClose}
            className="flex-1 bg-[#E8ECEF] text-[var(--navy)] font-semibold text-sm rounded-full py-3 hover:opacity-90 cursor-pointer"
          >
            Cancel
          </button>
          <CustomButton
            onClick={() => handleBooking(new Event("submit") as unknown as React.FormEvent)}
            disabled={isBooking}
            className="flex-1 rounded-full  font-semibold text-sm py-5 hover:opacity-90"
          >
            {isBooking ? "Booking..." : "Book Your Meeting"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCare;
