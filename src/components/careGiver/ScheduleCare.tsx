"use client";
import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import BookSuccessful from "./BookSuccessful";
import {
  useCreateBookingMutation,
  useGetServiceNamesQuery,
} from "@/store/api/bookingApi";
import { CustomButton } from "@/components/common/CustomInputs";
// Use the imported SVG component (alias to PascalCase for JSX)
import { calenderIcon as CalendarIcon } from "../icons/page";

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

interface Service {
  id: string;
  name: string;
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

type TimeRange = { id: string; start: number; end: number }; // minutes 0..1440
type DaySchedule = Record<Day, TimeRange[]>;

const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")} ${period}`;
};

const defaultRanges: TimeRange[] = [
  { id: "r1", start: 9 * 60, end: 12 * 60 }, // 09:00 - 12:00
  { id: "r2", start: 15 * 60, end: 18 * 60 }, // 03:00 - 06:00
];

const initialSchedule: DaySchedule = DAYS.reduce((acc, d) => {
  acc[d] = d === "Sun" || d === "Mon" ? defaultRanges.map(r => ({ ...r, id: `${d}-${r.id}` })) : [];
  return acc;
}, {} as DaySchedule);

const ScheduleCare = ({ isOpen, OnClose, selectedCaregivers }: ScheduleCareProps) => {
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const { data } = useGetServiceNamesQuery();

  const serviceOptions = useMemo(
    () =>
      ((data?.data?.services as Service[] | undefined) || []).map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [data]
  );

  const [careType, setCareType] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [selectedDays, setSelectedDays] = useState<Day[]>(["Sun", "Mon"]);
  const [expandedDay, setExpandedDay] = useState<Day>("Sun");
  const [schedule, setSchedule] = useState<DaySchedule>(initialSchedule);
  const [applyAll, setApplyAll] = useState(true);
  const [varySchedule, setVarySchedule] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Preselect service if only one exists
  useEffect(() => {
    if (serviceOptions.length === 1) setCareType(serviceOptions[0].value);
  }, [serviceOptions]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && OnClose();
    if (isOpen) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, OnClose]);

  const toggleDay = (d: Day) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
    setExpandedDay(d);
    // Seed default ranges if adding a new day
    setSchedule((prev) => {
      if (!prev[d] || prev[d].length === 0) {
        return { ...prev, [d]: defaultRanges.map(r => ({ ...r, id: `${d}-${r.id}` })) };
      }
      return prev;
    });
  };

  const addTime = (d: Day) => {
    setSchedule((prev) => ({
      ...prev,
      [d]: [
        ...prev[d],
        {
          id: `${d}-r${Date.now()}`,
          start: 9 * 60,
          end: 12 * 60,
        },
      ],
    }));
  };

  const removeTime = (d: Day, id: string) => {
    setSchedule((prev) => ({
      ...prev,
      [d]: prev[d].filter((r) => r.id !== id),
    }));
  };

  const changeTime = (d: Day, id: string, key: "start" | "end", value: number) => {
    const v = Math.max(0, Math.min(24 * 60, value));
    setSchedule((prev) => {
      const updated = prev[d].map((r) => {
        if (r.id !== id) return r;
        const next = { ...r, [key]: v } as TimeRange;
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
            res = { ...res, [sd]: updated.map((r, i) => ({ ...r, id: `${sd}-${i}` })) };
          });
      }
      return res;
    });
  };

  const daySummary = (d: Day) =>
    (schedule[d] || [])
      .map((r) => `${fmt(r.start)} - ${fmt(r.end)}`)
      .join(", ") || "No time set";

  const minutesStep = 30; // slider step

  const computeDurationDays = (start: Date, end: Date | null) => {
    if (!end) return 1;
    const one = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const two = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    const days = Math.round((two - one) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, days);
    };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!startDate) return setFormError("Select start date.");
    if (!careType) return setFormError("Select service.");
    if (selectedCaregivers.length === 0) return setFormError("Select at least one caregiver.");
    if (selectedDays.length === 0) return setFormError("Select at least one meeting day.");

    const durationInDays = computeDurationDays(startDate, endDate);

    // API payload (keep as defined by mutation type)
    const payload = {
      appointmentDate: startDate.toISOString(),
      serviceId: careType,
      durationInDays: String(durationInDays),
      selectedCaregivers: selectedCaregivers.map((c) => c.id),
    };

    try {
      const res = await createBooking(payload).unwrap();
      if (isBookingResponse(res) && res.success) {
        setIsSuccessModalOpen(true);
      } else {
        setFormError(
          (isBookingResponse(res) && res.message) || "Booking failed. Try again."
        );
      }
    } catch (error: unknown) {
      const msg =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        (error as { data?: { message?: string } }).data?.message
          ? (error as { data?: { message?: string } }).data!.message!
          : "Something went wrong. Please try again.";
      setFormError(msg);
    }
  };

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
        className="relative z-50 w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-lg overflow-y-auto max-h-[90vh]"
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
                          : `https://dev-carenest.s3.ap-south-1.amazonaws.com/${c.avatar}`
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
                    <div className="flex gap-2">
                      <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[6px] text-xs">
                        {c.experience}
                      </span>
                      <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[6px] text-xs">
                        {c.price}
                      </span>
                    </div>
                  </div>
                </div>
                {idx < selectedCaregivers.length - 1 && (
                  <div className="border-t border-[#EBEBEB] mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-5">
          <label className="text-[var(--navy)] font-semibold text-sm block mb-1">
            Services
          </label>
          <div className="relative">
            <select
              className="w-full border border-gray-300 rounded-full py-3 pl-4 pr-10 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
            >
              <option value="" disabled>
                Select Service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2F3C51]">
              ▾
            </span>
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
              {/* Replaced Image with SVG */}
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px]" />
            </div>
          </div>
          <div>
            <label className="block text-[var(--navy)] font-semibold text-sm mb-1">
              End Date (Optional)
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
              {/* Replaced Image with SVG */}
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 h-[18px] w-[18px]" />
            </div>
          </div>
        </div>

        {/* Days */}
        <div className="mb-3">
          <label className="block text-[var(--navy)] font-semibold text-sm mb-2">
            Preferred Meeting Days
          </label>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Expanded day schedule */}
        {selectedDays.length > 0 && (
          <div className="rounded-2xl border border-[#EBEBEB] p-4 mb-5">
            <div className="flex items-center justify-between">
              <p className="text-[#233D4D] font-medium">
                {expandedDay} -{" "}
                <span className="text-[#7B8A9C] font-normal">{daySummary(expandedDay)}</span>
              </p>
              <button
                type="button"
                className="text-[#233D4D] text-lg"
                onClick={() =>
                  setExpandedDay((prev) => {
                    const idx = selectedDays.indexOf(prev);
                    const next = selectedDays[(idx + 1) % selectedDays.length] || prev;
                    return next;
                  })
                }
                title="Switch day"
              >
                ▾
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {schedule[expandedDay]?.map((r, i) => (
                <div key={r.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#7B8A9C]">
                    <span>{fmt(9 * 60)}</span>
                    <span>{fmt(12 * 60)}</span>
                    <span>{fmt(15 * 60)}</span>
                    <span>{fmt(18 * 60)}</span>
                  </div>
                  <div className="relative">
                    {/* Track */}
                    <div className="h-2 bg-gray-200 rounded-full" />
                    {/* Range 1: start */}
                    <input
                      type="range"
                      min={0}
                      max={24 * 60}
                      step={minutesStep}
                      value={r.start}
                      onChange={(e) =>
                        changeTime(expandedDay, r.id, "start", Number(e.target.value))
                      }
                      className="absolute top-1/2 -translate-y-1/2 w-full opacity-0 cursor-pointer"
                    />
                    {/* Range 2: end */}
                    <input
                      type="range"
                      min={0}
                      max={24 * 60}
                      step={minutesStep}
                      value={r.end}
                      onChange={(e) =>
                        changeTime(expandedDay, r.id, "end", Number(e.target.value))
                      }
                      className="absolute top-1/2 -translate-y-1/2 w-full opacity-0 cursor-pointer"
                    />
                    {/* Visual fill */}
                    <div
                      className="absolute top-[6px] h-2 bg-[#233D4D] rounded-full"
                      style={{
                        left: `${(r.start / (24 * 60)) * 100}%`,
                        width: `${((r.end - r.start) / (24 * 60)) * 100}%`,
                      }}
                    />
                    {/* Knobs */}
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
                    <button
                      type="button"
                      className="text-red-500 text-sm"
                      onClick={() => removeTime(expandedDay, r.id)}
                      title="Remove time range"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addTime(expandedDay)}
                className="text-[#233D4D] text-sm font-medium underline underline-offset-2"
              >
                + Add Time
              </button>

              <label className="flex items-center gap-2 text-sm text-[#233D4D]">
                <input
                  type="checkbox"
                  checked={applyAll}
                  onChange={(e) => setApplyAll(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Apply this time to all days
              </label>
            </div>
          </div>
        )}

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
            className="flex-1 rounded-full"
          >
            {isBooking ? "Booking..." : "Book Caregiver"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCare;
