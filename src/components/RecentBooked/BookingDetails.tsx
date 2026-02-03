"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ActionDialog from "../common/ActionDialog";
import CaregiverModal from "../careGiver/CaregiverModal";
import ScheduleCare from "../careGiver/ScheduleCare";
import { binIcon } from "@/lib/svg_icons";
import type { Booking, WeeklyScheduleSlot } from "@/types/Booking";
import { useCancelBookingMutation, useEditBookingMutation } from "@/store/api/bookingApi";
import { toast } from "react-toastify";

interface BookingDetailsProps {
  booking: Booking;
  isLoading?: boolean;
}

export default function BookingDetails({ booking, isLoading = false }: BookingDetailsProps) {
  const router = useRouter(); // <-- added router
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editBooking, { isLoading: isSaving }] = useEditBookingMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(booking);
  const [showAllTimings, setShowAllTimings] = useState(false);

  // Caregiver assigned (hired/accepted/active) -> lock start & meeting date edits
  const caregiverAssigned = booking.caregivers?.some((cg) =>
    ["hired", "accepted", "active"].includes((cg.status || "").toLowerCase())
  ) || false;

  const handleOpen = () => setOpenDialog(false);

  const handleCancelBooking = async () => {
    if (!bookingDetails.bookingId || !bookingDetails.caregivers?.length) return;
    const caregiverId = bookingDetails.caregivers[0].id;
    try {
      await cancelBooking({ bookingId: bookingDetails.bookingId, caregiverId }).unwrap();
      // update local state so UI reflects cancelled status immediately
      setBookingDetails(prev => ({ ...prev, status: "cancelled" }));
      toast.success("Booking cancelled successfully");
      setOpenDialog(false);
      // navigate back to previous page
      router.push('/recent-booking');
    } catch {
      toast.error("Failed to cancel booking");
      setOpenDialog(false);
    }
  };

  // This function is passed to ScheduleCare for editing
  const handleEditBooking = async (updatedValues: {
    startDate: string;
    meetingDate: string;
    endDate: string | null;
    weeklySchedule: WeeklyScheduleSlot[];
  }) => {
    try {
      const payload = {
        startDate: updatedValues.startDate,
        meetingDate: updatedValues.meetingDate,
        endDate: updatedValues.endDate || null,
        weeklySchedule: updatedValues.weeklySchedule,
      };
      const result = await editBooking({ bookingId: booking.bookingId, payload }).unwrap();
      if (result.success) {
        toast.success("Booking details updated successfully!");
        setIsEditing(false);
        setBookingDetails(prev => ({
          ...prev,
          ...payload,
          endDate: payload.endDate ?? "",
        }));
      } else {
        toast.error(result.message || "Update failed. Please try again.");
      }
    } catch {
      toast.error("Update failed. Please try again.");
    }
  };

  if (!booking) return <div className="p-4">No booking selected</div>;

  if (isLoading) {
  return (
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8 md:py-10 bg-[#F8F9FA]">
        <main className="flex-1">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div className="h-8 bg-gray-300 rounded w-64 animate-pulse"></div>
            <div className="flex gap-2 sm:gap-4">
              <div className="h-10 bg-gray-300 rounded-lg w-24 animate-pulse"></div>
              <div className="h-10 bg-gray-300 rounded-lg w-40 animate-pulse"></div>
            </div>
          </div>

          {/* Booking Details Card Skeleton */}
          <div className="relative w-full bg-white rounded-2xl shadow-sm px-4 py-6 sm:px-8 sm:py-8 mb-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {/* Column 1 */}
              <div className="flex flex-col gap-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-40"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-36"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-44"></div>
                </div>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-40"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-36"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              {/* Column 3 */}
              <div className="flex flex-col gap-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Caregivers List Skeleton */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-40 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="flex gap-2 mt-3">
                    <div className="h-8 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded-full w-40 sm:w-48 animate-pulse"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }


  // Helper to convert 24-hour time to 12-hour format with AM/PM
  const formatTime12Hour = (time24: string): string => {
    if (!time24) return time24;
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Helper to format weekly schedule as array
  const formatWeeklyScheduleArr = (schedule: WeeklyScheduleSlot[]) => {
    if (!schedule?.length) return [];
    return schedule.map(
      (slot) =>
        `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.weekDay]} - ${formatTime12Hour(slot.startTime)} to ${formatTime12Hour(slot.endTime)}`
    );
  };

  // Helper to parse date string (YYYY-MM-DD) in local timezone without UTC conversion
  const parseDateLocal = (dateStr: string | null | undefined): Date | null => {
    if (!dateStr) return null;

    // If string contains time (ISO), rely on native Date to preserve the actual timestamp
    if (dateStr.includes("T")) {
      const isoDate = new Date(dateStr);
      return Number.isNaN(isoDate.getTime()) ? null : isoDate;
    }

    const [yearStr, monthStr, dayPart] = dateStr.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayPart?.split("T")[0]);

    if ([year, month, day].some((n) => Number.isNaN(n))) return null;

    const localDate = new Date(year, month - 1, day);
    return Number.isNaN(localDate.getTime()) ? null : localDate;
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8 md:py-10 bg-[#F8F9FA]">
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-2xl md:text-lg font-semibold text-[#2F3C51]">
            Recent Booking / <span className="text-[#2F3C51]">#{booking.bookingId}</span>
          </h2>
          <div className="flex gap-2 ml-2 sm:gap-4">
            {/* Hide Edit button for completed or cancelled bookings */}
            {booking.status !== "completed" &&
              booking.status !== "cancelled" &&
              booking.status !== "canceled" ? (
              <button
                onClick={() => setIsEditing(true)}
                className="border border-[#e89923] font-semibold text-[#FFA726] px-4 sm:px-5 py-3 rounded-lg hover:bg-[#FFF3E0] transition text-base sm:text-base"
              >
                Edit
              </button>
            ) : null}

            {/* Hide Cancel button for completed bookings */}
            {booking.status === "cancelled" || booking.status === "canceled" ? (
              <button
                className="border border-[#D1D5DB] text-[#6B7280] font-semibold px-4 sm:px-5 py-3 rounded-lg bg-[#F3F4F6] text-base sm:text-base"
                disabled
              >
                Cancelled
              </button>
            ) : booking.status !== "completed" ? (
              <button
                onClick={() => setOpenDialog(true)}
                className="border border-[#ee4a47] text-[#ee4a47] font-semibold px-4 sm:px-5 py-3 rounded-lg hover:bg-[#f0eaea] transition text-base sm:text-base"
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Cancel Booking"}
              </button>
            ) : null}
          </div>
        </div>

        {/* Booking Details Card - 3-column grid on desktop, stacked on mobile */}
        <div className="relative w-full bg-white rounded-2xl shadow-sm px-4 py-6 sm:px-8 sm:py-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Booking ID:</span>
                <span className="block text-[#B0B7C3] text-lg font-md truncate max-w-[180px]">#{booking.bookingId}</span>
              </div>
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Booked On:</span>
                <span className="block text-[#B0B7C3] text-lg font-md">
                  {bookingDetails.bookedOn
                      ? parseDateLocal(bookingDetails.bookedOn)?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Meeting Date:</span>
                <span className="block text-[#B0B7C3] text-lg font-md">
                  {bookingDetails.meetingDate
                      ? parseDateLocal(bookingDetails.meetingDate)?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : "N/A"}
                </span>
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Service start Date:</span>
                <span className="block text-[#B0B7C3] text-lg font-md">
                  {bookingDetails.startDate
                      ? parseDateLocal(bookingDetails.startDate)?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Service End Date:</span>
                <span className="block text-[#B0B7C3] text-lg font-md">
                  {bookingDetails.endDate
                      ? parseDateLocal(bookingDetails.endDate)?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Care Type:</span>
                <span className="block text-[#B0B7C3] text-lg font-md">
                  {Array.isArray(bookingDetails.careTypes) && bookingDetails.careTypes.length > 0
                    ? bookingDetails.careTypes.map((ct: any) => ct.name).filter(Boolean).join(", ")
                    : "N/A"}
                </span>
              </div>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="block text-[#233D4D] text-base font-semibold mb-1">Service Date and Times:</span>
                <span className="block text-[#B0B7C3] text-lg font-md">
                  {(() => {
                    const scheduleArr = formatWeeklyScheduleArr(bookingDetails.weeklySchedule);
                    const visibleArr = showAllTimings ? scheduleArr : scheduleArr.slice(0, 2);
                    return (
                      <>
                        {visibleArr.length === 0 ? (
                          <span>N/A</span>
                        ) : (
                          <span className="block whitespace-pre-line">{visibleArr.join("\n")}</span>
                        )}
                        {scheduleArr.length > 2 && (
                          <button
                            className="text-[#FFA726] text-left text-lg font-semibold mt-1"
                            type="button"
                            onClick={() => setShowAllTimings((prev) => !prev)}
                          >
                            {showAllTimings ? "View less ↑" : "View more ↓"}
                          </button>
                        )}
                      </>
                    );
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Caregivers List */}
        <div className="space-y-4">
          {booking.caregivers?.map((cg, idx) => (
            <div
              key={cg.id ?? idx}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer shadow-sm"
              onClick={() => setSelectedCaregiverId(cg.id ?? null)}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <Image
                  src={
                    cg.avatar
                      ? cg.avatar.startsWith("http")
                        ? cg.avatar
                        : `https://creative-story.s3.us-east-1.amazonaws.com/${cg.avatar.replace(/^\/+/, "")}`
                      : "/care-giver/boy-icon.png"
                  }
                  alt={cg.name ?? "Caregiver"}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                  style={{ minWidth: 56, minHeight: 56 }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-xl text-[#233D4D]">{cg.name ?? "Unknown"}</h4>
                <p className="text-base text-[#7A8699]">
                  {Array.isArray(cg.services) && cg.services.length > 0
                    ? cg.services.map((s: string | { name: string }) => typeof s === "string" ? s : s?.name).filter(Boolean).join(", ")
                    : "N/A"}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="border-1 border-[#dcdfe6] rounded-full px-4 py-1 text-base font-semibold text-[#233D4D] bg-white">
                    {typeof cg.experience === "number"
                      ? (cg.experience === 99 || cg.experience > 10)
                        ? "10+ Years"
                      : `${Math.max(0, Math.floor(cg.experience))} Years`
                      : "N/A"}
                  </span>
                </div>
              </div>
              {(booking.status === "accepted" && cg.status === "hired") ||
                (booking.status === "completed" && cg.status === "completed") ? (
                <span className="bg-[#2F3C51] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold flex items-center gap-1 sm:gap-2 ml-auto">
                  <svg width="14" height="14" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" fill="none" viewBox="0 0 18 18">
                    <path d="M6.75 13.5L2.25 9L3.3075 7.9425L6.75 11.3775L14.6925 3.4425L15.75 4.5L6.75 13.5Z" fill="white"/>
                  </svg>
                  <span className="hidden sm:inline">Selected Caregiver</span>
                  <span className="sm:hidden">Selected</span>
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
          isSelected={
            selectedCaregiverId
              ? booking.caregivers?.find(cg => cg.id === selectedCaregiverId)?.status === "hired" ||
                booking.caregivers?.find(cg => cg.id === selectedCaregiverId)?.status === "accepted" ||
                booking.caregivers?.find(cg => cg.id === selectedCaregiverId)?.status === "completed"
              : false
          }
          bookingStatus={
            selectedCaregiverId
              ? booking.caregivers?.find(cg => cg.id === selectedCaregiverId)?.status
              : undefined
          }
        />

        {/* Cancel Booking Dialog */}
        <ActionDialog
          open={openDeleteDialog}
          handleOpen={handleOpen}
          icon={binIcon}
          confirmText="Confirm"
          handleConfirm={handleCancelBooking}
          heading="Confirm Cancellation"
          subheading="Are you sure you want to cancel this booking?"
        />

        {/* Edit Booking Schedule */}
        {isEditing && (
          <ScheduleCare
            isOpen={isEditing}
            OnClose={() => setIsEditing(false)}
            selectedCaregivers={bookingDetails.caregivers.map(cg => ({
              id: cg.id,
              name: cg.name,
              specialty: cg.status || "General Care",
              price: "",
              experience: cg.experience ? `${cg.experience} Years` : "0+ Years",
              avatar: cg.avatar || "/care-giver/boy-icon.png",
            }))}
            onBookingSuccess={handleEditBooking}
            initialStartDate={bookingDetails.startDate ? new Date(bookingDetails.startDate) : null}
            initialEndDate={bookingDetails.endDate ? new Date(bookingDetails.endDate) : null}
            initialMeetingDate={bookingDetails.meetingDate ? new Date(bookingDetails.meetingDate) : null}
            initialWeeklySchedule={bookingDetails.weeklySchedule}
            isEditMode={true}
            bookingId={bookingDetails.bookingId}
            lockStartAndMeetingDates={caregiverAssigned}
          />
        )}
      </main>
    </div>
  );
}