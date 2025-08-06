"use client";

import Image from "next/image";
import { useState } from "react";
import ActionDialog from "../common/ActionDialog";
import { binIcon } from "@/lib/svg_icons";

interface Caregiver {
  name: string;
  specialty: string;
  experience: string;
  price: string;
  selected: boolean;
  avatar: string;
  id:string;
  isFinalSelection?: boolean;
}

interface BookingDetailsProps {
  booking: {
    bookingId: string;
    careType: string;
    bookedOn: string;
    appointmentDate: string;
    duration: string;
    status: string;
    caregivers: Caregiver[];
  };
}

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(false);
  };

  const handleCancelBooking = () => {
    console.log("Booking canceled");
    setOpenDialog(false);
  };
console.log("Booking Details:", booking);
  if (!booking) return <div className="p-4">No booking selected</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-[#F8F9FA]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#1A1C1F]">
            Recent Bookings /{" "}
            <span className="text-[#2F3C51]">#{booking.bookingId}</span>
          </h2>
          <p className="text-sm text-[#7A8699] mt-2">
            <span className="block">
              Booking ID: <span className="text-[#2F3C51]">#{booking.bookingId}</span>
            </span>
            <span className="block">
              Care Type:{" "}
                      <span className="text-[#2F3C51]">Memory care</span>
              {/* <span className="text-[#2F3C51]">{booking.careType}</span> */}
            </span>
            <span className="block">
              Booked On:{" "}
              <span className="text-[#2F3C51]">
                {new Date(booking.bookedOn).toLocaleDateString()}
              </span>
            </span>
          </p>
        </div>

        <div className="flex justify-end w-full">
          <div className="flex flex-col items-end">
            <button
              onClick={() => setOpenDialog(true)}
              className="text-[#ED4B5F] border border-[#ED4B5F] rounded-full px-6 py-2 mb-6 hover:bg-[#FFF2F3] transition"
            >
              Cancel Booking
            </button>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#2F3C51] text-white px-4 py-1 rounded-full text-sm">
                {booking.status}
              </span>
              <span className="border border-[#2F3C51] text-[#2F3C51] px-4 py-1 rounded-full text-sm flex items-center gap-1">
                 <img src="/Recent/c.png" alt="calendar" className="w-4 h-4" />
                {new Date(booking.appointmentDate).toLocaleDateString()}
              </span>
              <span className=" flex items-center gap-1 border border-[#2F3C51] text-[#2F3C51] px-4 py-1 rounded-full text-sm">
                  <img src="/Recent/time.png" alt="duration" className="w-4 h-4" />
                {booking.duration} Days
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {booking.caregivers?.map((cg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 flex items-center justify-between border"
          >
            <div className="flex items-center gap-4">
              <Image
                // src={cg.avatar}
                 src={"/care-giver/boy-icon.png"}
                alt={cg.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h4 className="font-semibold text-lg">{cg.name}</h4>
                {/* <p className="text-sm text-[#7A8699]">{cg.specialty}</p> */}
                      <p className="text-sm text-[#7A8699]">Elderly care</p>
                <div className="flex gap-2 mt-1">
                  <span className="border border-[#D1D5DB] rounded-full px-3 py-1 text-sm">
                    {cg.experience} + years
                  </span>
                  <span className="border border-[#D1D5DB] rounded-full px-3 py-1 text-sm">
                    ${cg.price}/hr
                  </span>
                </div>
              </div>
            </div>
            {cg.selected && (
              <span className="bg-[#2F3C51] text-white px-4 py-1 rounded-full text-sm">
                Selected Caregiver
              </span>
            )}
          </div>
        ))}
      </div>

      <ActionDialog
        open={openDeleteDialog}
        handleOpen={handleOpen}
        icon={binIcon}
        confirmText="Cancel"
        handleConfirm={handleCancelBooking}
        heading="Confirm Cancellation"
        subheading="Are you sure you want to cancel this booking?"
      />
    </div>
  );
}
