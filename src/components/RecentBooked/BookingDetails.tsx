"use client";

import Image from "next/image";
import { useState } from "react";
import ActionDialog from "../common/ActionDialog";
import CaregiverModal from "../careGiver/CaregiverModal";
import { binIcon } from "@/lib/svg_icons";
import type { Booking, WeeklyScheduleSlot } from "@/types/Booking";
import { useCancelBookingMutation } from "@/store/api/bookingApi";
import { toast } from "react-toastify";

interface BookingDetailsProps {
  booking: Booking;
}

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const handleOpen = () => setOpenDialog(false);
  const handleCancelBooking = async () => {
    if (!booking.bookingId || !booking.caregivers?.length) return;
    // You may want to cancel for the selected caregiver, or for all
    // Here, we'll use the first caregiver as an example
    const caregiverId = booking.caregivers[0].id;
    try {
      await cancelBooking({ bookingId: booking.bookingId, caregiverId }).unwrap();
      toast.success("Booking cancelled successfully");
      setOpenDialog(false);
    } catch {
      toast.error("Failed to cancel booking");
      setOpenDialog(false);
    }
  };

  if (!booking) return <div className="p-4">No booking selected</div>;

  // Format weekly schedule for display
  const formatWeeklySchedule = (schedule: WeeklyScheduleSlot[]) => {
    if (!schedule?.length) return "N/A";
    return schedule
      .map(
        (slot) =>
          `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.weekDay]} - ${slot.startTime} to ${slot.endTime}`
      )
      .join(", ");
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-6 py-10 bg-[#F8F9FA]">
      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2F3C51]">
            Recent Bookings / <span className="text-[#2F3C51]">#{booking.bookingId}</span>
          </h2>
          <button
            onClick={() => setOpenDialog(true)}
            className="border border-[#98A2B3] text-[#2F3C51] px-4 py-2 rounded-lg hover:bg-[#F7F7F7] transition"
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>

        {/* Booking Details Card */}
        <div className="max-w-2xl">
          {/* First row: Booking ID, Booked On, Preferred Meeting Date, Service End Date */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            <div className="min-w-0">
              <span className="block text-[#233D4D] text-base mb-1">Booking ID:</span>
              <span className="font-sm text-[#98A2B3] truncate block">#{booking.bookingId}</span>
            </div>
            <div className="min-w-0">
              <span className="block text-[#233D4D] text-base mb-1">Booked On:</span>
              <span className="font-sm text-[#98A2B3] block">
                {booking.bookedOn
                  ? new Date(booking.bookedOn).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="min-w-0">
              <span className="block text-[#233D4D] text-base mb-1">Preferred Meeting Date:</span>
              <span className="font-sm text-[#98A2B3] block">
                {booking.startDate
                  ? new Date(booking.startDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="min-w-0">
              <span className="block text-[#233D4D] text-base mb-1">Service End Date:</span>
              <span className="font-sm text-[#98A2B3] block">
                {booking.endDate
                  ? new Date(booking.endDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
          {/* Second row: Care Type and Service Date and Times */}
          <div className="grid grid-cols-2">
            <div className="min-w-1">
              <span className="block text-[#233D4D] text-base mb-1">Care Type:</span>
              <span className="font-sm text-[#98A2B3] block">
                {booking.careType ?? "Personal Care"}
              </span>
            </div>
            <div className="min-w-0">
              <span className=" text-[#233D4D] text-base mb-1">Service Date and Times:</span>
              <span className="font-sm text-[#98A2B3] block">
                {formatWeeklySchedule(booking.weeklySchedule)}
              </span>
              <button className="text-[#FFA726] text-left text-sm mt-1">View more &darr;</button>
            </div>
          </div>
        </div>

        {/* Caregivers List */}
        <div className="space-y-4">
          {booking.caregivers?.map((cg, idx) => (
            <div
              key={cg.id ?? idx}
              className="bg-white rounded-xl p-4 flex items-center gap-4 border cursor-pointer"
              onClick={() => setSelectedCaregiverId(cg.id ?? null)}
            >
              <Image
                src={
                  cg.avatar
                    ? cg.avatar.startsWith("http")
                      ? cg.avatar
                      : `https://dev-carenest.s3.ap-south-1.amazonaws.com/${cg.avatar.replace(/^\/+/, "")}`
                    : "/care-giver/boy-icon.png"
                }
                alt={cg.name ?? "Caregiver"}
                width={60}
                height={60}
                className="rounded-full object-cover"
                style={{ minWidth: 60, minHeight: 60 }}
              />
              <div>
                <h4 className="font-semibold text-lg">{cg.name ?? "Unknown"}</h4>
                <p className="text-sm text-[#7A8699]">Elderly Care</p>
                <div className="flex gap-2 mt-1">
                  <span className="border border-[#D1D5DB] rounded-full px-3 py-1 text-sm">
                    {cg.experience ? `${cg.experience} +Years` : "N/A"}
                  </span>
                </div>
              </div>
              {/* Show badge if booking.status is accepted & cg.status is hired OR booking.status is completed & cg.status is completed */}
              {(booking.status === "accepted" && cg.status === "hired") ||
                (booking.status === "completed" && cg.status === "completed") ? (
                <span className="bg-[#2F3C51] text-white px-4 py-1 rounded-full text-sm flex items-center gap-2 ml-auto">
                  <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                    <path d="M6.75 13.5L2.25 9L3.3075 7.9425L6.75 11.3775L14.6925 3.4425L15.75 4.5L6.75 13.5Z" fill="white"/>
                  </svg>
                  Selected Caregiver
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {/* Caregiver Modal */}
        <CaregiverModal
          isOpen={!!selectedCaregiverId}
          onClose={() => setSelectedCaregiverId(null)}
          caregiverId={selectedCaregiverId}
          onAddCaregiver={() => {}}
          isBookmarked={false}
        />

        {/* Cancel Booking Dialog */}
        <ActionDialog
          open={openDeleteDialog}
          handleOpen={handleOpen}
          icon={binIcon}
          confirmText="Cancel"
          handleConfirm={handleCancelBooking}
          heading="Confirm Cancellation"
          subheading="Are you sure you want to cancel this booking?"
        />
      </main>
    </div>
  );
}