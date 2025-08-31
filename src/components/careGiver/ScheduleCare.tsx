"use client";
import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookSuccessful from "./BookSuccessful";
import {
  useGetServiceNamesQuery,
  useCreateBookingMutation,
} from "@/store/api/bookingApi";
import Image from "next/image";

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

const ScheduleCare = ({
  isOpen,
  OnClose,
  selectedCaregivers,
}: ScheduleCareProps) => {
  const [meetingDate, setMeetingDate] = useState<Date | null>(new Date());
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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
  const [duration, setDuration] = useState(1);
  const [durationUnit, setDurationUnit] = useState("Month");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceOptions.length === 1) {
      setCareType(serviceOptions[0].value);
    }
  }, [serviceOptions]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") OnClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, OnClose]);

  const convertToDays = (val: number, unit: string) => {
    switch (unit.toLowerCase()) {
      case "month":
        return val * 30;
      case "week":
        return val * 7;
      default:
        return val;
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!meetingDate) {
      setFormError("Select meeting date.");
      return;
    }
    if (!careType) {
      setFormError("Select care type.");
      return;
    }
    if (selectedCaregivers.length === 0) {
      setFormError("Select at least one caregiver.");
      return;
    }

    const durationInDays = convertToDays(duration, durationUnit);

    const payload = {
      appointmentDate: meetingDate.toISOString(),
      serviceId: careType,
      durationInDays: String(durationInDays),
      caregivers: selectedCaregivers.map((c) => c.id),
      selectedCaregivers: selectedCaregivers.map((c) => c.id),
    };

    try {
      const res = await createBooking(payload).unwrap(); // no cast
      if (isBookingResponse(res) && res.success) {
        setIsSuccessModalOpen(true);
      } else {
        setFormError(
          (isBookingResponse(res) && res.message) || "Booking failed. Try again."
        );
      }
    } catch (error: unknown) {
      const errMsg =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        (error as { data?: { message?: string } }).data?.message
          ? (error as { data?: { message?: string } }).data!.message!
          : "Something went wrong. Please try again.";
      setFormError(errMsg);
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
        className="relative z-50 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-lg overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-[var(--navy)] font-bold text-lg">
          Schedule Your Care
        </h1>
        <p className="text-center text-[var(--cool-gray)] text-md mt-1 mb-6">
          Pick a preferred date and set the duration to <br /> continue booking.
        </p>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--navy)] font-semibold text-md">
            Selected Caregivers
          </h2>
          <h2
            className="text-[var(--yellow)] font-semibold text-md cursor-pointer"
            onClick={OnClose}
          >
            Change
          </h2>
        </div>

        <div className="space-y-3 mb-10 max-h-50 overflow-y-auto pr-2">
          {selectedCaregivers.map((c) => (
            <div
              key={c.id}
              className="flex items-center border border-[#EBEBEB] rounded-lg p-2 space-x-3 justify-start"
            >
              <Image
                src={
                  c.avatar && c.avatar.trim() !== "/care-giver/boy-icon.png"
                    ? c.avatar.startsWith("http")
                      ? c.avatar
                      : `https://dev-carenest.s3.ap-south-1.amazonaws.com/${c.avatar}`
                    : "/care-giver/boy-icon.png"
                }
                alt="avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col min-w-22">
                  <p className="text-[var(--navy)] font-semibold text-sm leading-none">
                    {c.name}
                  </p>
                  <p className="text-gray-400 text-xs leading-tight">
                    {c.specialty}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[3px] text-sm font-normal">
                    {c.experience}
                  </span>
                  <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[3px] text-sm font-normal">
                    {c.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form className="space-y-5" onSubmit={handleBooking}>
          <div>
            <label className="text-[var(--navy)] font-semibold text-md">
              Care Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
            >
              <option value="" disabled>
                Select Care Type
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[var(--navy)] font-semibold text-md mb-1">
              Preferred Meeting Date
            </label>
            <DatePicker
              selected={meetingDate}
              onChange={(date) => setMeetingDate(date)}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              className="!w-full border border-gray-300 rounded-lg py-2 px-3 text-[var(--navy)] text-md focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex space-x-3">
            <div className="flex-1">
              <label className="block text-[var(--navy)] font-semibold text-xs mb-1">
                Duration
              </label>
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="min-w-32 flex-1">
              <label className="block text-transparent text-xs mb-1">
                .
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-[var(--navy)] text-md focus:ring-2 focus:ring-yellow-400"
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
              >
                <option>Month</option>
                <option>Week</option>
                <option>Day</option>
              </select>
            </div>
          </div>

          {formError && (
            <p className="text-red-500 text-sm -mt-2">{formError}</p>
          )}

          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={OnClose}
              className="flex-1 bg-gray-200 text-[var(--navy)] font-semibold text-sm rounded-full py-2 hover:opacity-90 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[var(--golden-yellow)] text-[var(--blue-gray)] py-3 rounded-full hover:opacity-90 font-semibold cursor-pointer disabled:opacity-60"
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Book Caregiver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCare;
