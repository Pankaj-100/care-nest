"use client";
import { FC, useState } from "react";
import {
  useGetRecentBookingsQuery,
  useCancelBookingMutation,
} from "@/store/api/bookingApi";
import ActionDialog from "../common/ActionDialog";
import { cancelIcon } from "@/lib/svg_icons";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import Image from "next/image";
import emptyCaregiverImage from "@/assets/care.svg";
import { toast } from "react-toastify";
import type { Booking } from "@/types/Booking";

const statusColor: Record<string, string> = {
  requested: "bg-yellow-400 text-white",
  pending: "bg-yellow-400 text-white", // API alias for Requested
  active: "bg-gray-800 text-white",
  accepted: "bg-gray-800 text-white", // API alias for Active
  completed: "bg-green-500 text-white",
  cancelled: "bg-red-500 text-white",
};

// Map UI <-> API statuses
const uiToApiStatus: Record<string, string> = {
  Requested: "requested",
  Active: "active",
  Completed: "completed",
  Cancelled: "cancelled",
};

const apiToUiStatus: Record<string, string> = {
  pending: "Pending",
  accepted: "Accepted",
  completed: "Completed",
  cancelled: "Cancelled",
  active: "Active",
};

interface RightBookingsPanelProps {
  onBookingClick: (booking: Booking) => void;
}

// Use this helper in RightSide.tsx
function extractBookings(resp?: { data?: { bookings: Booking[] } }): Booking[] {
  if (!resp?.data) return [];
  return resp.data.bookings;
}

const RightBookingsPanel: FC<RightBookingsPanelProps> = ({
  onBookingClick,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isScheduleCareOpen, setIsScheduleCareOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{
    id: string;
    caregiverId: string;
  } | null>(null);

  // initialize mutation
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  // Build status param for API (omit param for All)
  const statusParam =
    selectedStatus === "All"
      ? undefined
      : uiToApiStatus[selectedStatus] || undefined;

  // Fetch with optional param
  const { data, isLoading, error, refetch } = useGetRecentBookingsQuery(statusParam);
  const bookings = extractBookings(data);

  // Ensure client UI still filters if backend returns all
  const filteredBookings =
    selectedStatus === "All"
      ? bookings
      : bookings.filter(
          (b) =>
            apiToUiStatus[b?.status?.toLowerCase?.()] === selectedStatus
        );

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      const res = await cancelBooking({
        bookingId: selectedBooking.id,
        caregiverId: selectedBooking.caregiverId,
      }).unwrap();
      toast.success(res?.message || "Booking cancelled successfully");
      refetch();
    } catch (err) {
      const errorObj = err as {
        data?: { message?: string };
        error?: string;
      };
      const msg =
        errorObj?.data?.message ||
        errorObj?.error ||
        "Failed to cancel booking";
      toast.error(msg);
      console.error("Cancellation error:", err);
    } finally {
      setOpenDialog(false);
      setSelectedBooking(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  if (isLoading)
    return <div className="p-6 text-gray-500">Loading bookings...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">Failed to load bookings.</div>
    );

  return (
    <div className="w-full md:w-3/4 p-6 mt-10">
      <h2 className="text-3xl font-semibold text-[var(--navy)] mb-6 font-Urbanist">
        Recent Bookings
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Pending", "Accepted", "Active", "Completed", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-1 rounded-full font-medium text-sm ${
                selectedStatus === status
                  ? "bg-[var(--navy)] text-white"
                  : "border border-[var(--navy)] text-[var(--navy)]"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <div className="relative w-64 h-64">
            <Image
              src={emptyCaregiverImage}
              alt="No bookings"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-lg text-gray-600">
            You have no bookings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const apiStatus = booking.status?.toLowerCase?.() || "";
            const uiStatus =
              apiToUiStatus[apiStatus] ||
              booking.status ||
              "Unknown";

            return (
              <div
                key={booking.bookingId}
                onClick={() => onBookingClick(booking)}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[var(--navy)] rounded-full flex items-center justify-center">
                    <Image
                      src="/Recent/calendar.png"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-[var(--navy)]">
                      #{booking.bookingId}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.careType }
                    </p>
                    <div className="flex gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1 border px-2 py-1 rounded-full text-sm font-light">
                        <Image
                          src="/Recent/c.png"
                          alt="date"
                          width={12}
                          height={12}
                          className="w-3 h-3"
                        />
                        {new Date(
                          booking.bookedOn
                        ).toLocaleDateString()}
                      </div>
                      <div
                        className={`px-3 py-2 rounded-full text-md font-medium items-center ${
                          statusColor[apiStatus] ||
                          "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {uiStatus}
                      </div>
                    </div>
                  </div>
                </div>

                {apiStatus === "completed" ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 flex items-center justify-center bg-[#F2A307] rounded-full text-lg leading-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsScheduleCareOpen(true);
                      }}
                    >
                      <Image
                        src="/Recent/reload.png"
                        alt="reschedule"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {(apiStatus === "requested" ||
                      apiStatus === "active") && (
                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full text-lg leading-none  cursor-pointer ${
                          isCancelling
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#FF5C5F]"
                        }`}
                        onClick={(e) => {
                          if (isCancelling) return;
                          e.stopPropagation();
                          const caregiverId =
                            booking.caregivers?.find(
                              (c) => c?.isFinalSelection && c?.id
                            )?.id ??
                            booking.caregivers?.find(
                              (c) => !c?.isDeleted && c?.id
                            )?.id ??
                            "";
                          if (!caregiverId)
                            return toast.error(
                              "No caregiver found for this booking."
                            );
                          setSelectedBooking({
                            id: booking.bookingId,
                            caregiverId,
                          });
                          setOpenDialog(true);
                        }}
                        aria-disabled={isCancelling}
                      >
                        <Image
                          src="/Recent/cross.png"
                          alt="cancel"
                          width={16}
                          height={16}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ActionDialog
        open={openDialog}
        handleOpen={handleCloseDialog}
        icon={cancelIcon}
        confirmText="Confirm"
        handleConfirm={handleConfirmCancel}
        heading="Confirm Cancellation"
        subheading={`You're about to cancel your booking. Any ongoing or scheduled services will be discontinued.`}
      />

      <ScheduleCare
        isOpen={isScheduleCareOpen}
        OnClose={() => setIsScheduleCareOpen(false)}
        selectedCaregivers={[
          {
            id: "12345",
            name: "Joe Doe",
            specialty: "Elderly Care",
            price: "$100/hr", // <-- use price only
            experience: "12+ Years",
            avatar: "/care-giver/boy-icon.png", // <-- use avatar
            isBookmarked: false,
          },
        ]}
      />
    </div>
  );
};

export default RightBookingsPanel;
