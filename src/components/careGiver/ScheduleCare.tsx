"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookSuccessful from "./BookSuccessful";
import { CustomButton } from "../common/CustomInputs";

interface ScheduleCareProps {
  isOpen: boolean;
  OnClose: () => void;
  selectedCaregivers: {
    name: string;
    experience: string;
    rate: string;
    specialty: string;
    imgSrc: string;
    isBookmarked?: boolean;
  }[];
}

const ScheduleCare = ({
  isOpen,
  OnClose,
  selectedCaregivers,
}: ScheduleCareProps) => {
  const [meetingDate, setMeetingDate] = useState<Date | null>(new Date());
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Form state
  const [careType, setCareType] = useState("Personal Care");
  const [duration, setDuration] = useState(1);
  const [durationUnit, setDurationUnit] = useState("Month");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") OnClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, OnClose]);

  // If scheduling modal is closed, no render
  if (!isOpen) return null;

  // Show success modal instead of scheduling modal if open
  if (isSuccessModalOpen)
    return (
      <BookSuccessful
        isModalOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          OnClose();
        }}
      />
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 h-screen ">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={OnClose}></div>

      {/* Modal */}
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

        {/* Caregiver List */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--navy)] font-semibold text-md">
           Selected Caregivers 
          </h2>
          <h2 className="text-[var(--yellow)] font-semibold text-md cursor-pointer">
            Change
          </h2>
        </div>

        <div className="  space-y-3 mb-10 max-h-50 overflow-y-auto pr-2 ">
          {selectedCaregivers.map((c, index) => (
            <div
              key={index}
              className="flex items-center border border-[#EBEBEB] rounded-lg p-2 space-x-3 justify-start "
            >

              <img
                src={c.imgSrc}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />

           
<div className="flex items-center justify-between  gap-4">
  {/* Left: Name + Specialty */}
  <div className="flex flex-col min-w-22">
    <p className="text-[var(--navy)] font-semibold text-sm leading-none">
      {c.name}
    </p>
    <p className="text-gray-400 text-xs leading-tight">{c.specialty}</p>
  </div>

  {/* Right: Chips */}
  <div className="flex gap-2 shrink-0">
    <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[3px] text-sm font-normal">
      {c.experience}
    </span>
    <span className="border border-[#2F3C51] text-[#2F3C51] rounded-full px-3 py-[3px] text-sm font-normal">
      {c.rate}
    </span>
  </div>
</div>

            </div>
                     ))}
        </div>

        {/* Booking Form */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSuccessModalOpen(true); // Show success modal on submit
          }}
        >
          <div>
            <label className="text-[var(--navy)] font-semibold text-md">
              Care Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-[var(--navy)] text-sm focus:ring-2 focus:ring-yellow-400"
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
            >
              <option>Personal Care</option>
              <option>Companionship</option>
              <option>Housekeeping</option>
              <option>Transportation</option>
              <option>Meal Preparation</option>
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
              className="!w-full border border-gray-300 rounded-lg py-2 px-3 text-[var(--navy)] text-md focus:ring-2 focus:ring-yellow-400 "
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
              <label className="block text-transparent text-xs mb-1">.</label>
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

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={OnClose}
              className="flex-1 bg-gray-200 text-[var(--navy)] font-semibold text-sm rounded-full py-2 hover:opacity-90"
            >
              Cancel
            </button>
            <CustomButton onClick={() => {}} className=" !px-2 flex-1">
              Book Caregiver
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCare;
