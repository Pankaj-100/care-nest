"use client";
import { FC, useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

const statusColor: Record<string, string> = {
  requested: "bg-[#E7A200] text-white",
  pending: "bg-[#E7A200] text-white", // API alias for Requested
  active: "bg-[#233D4D] text-white",
  accepted: "bg-[#233D4D] text-white", // API alias for Active
  completed: "bg-[#5FC009] text-white",
  cancelled: "bg-[#FF5C5F] text-white",
};

// Map UI <-> API statuses
const uiToApiStatus: Record<string, string> = {
  Requested: "requested",
  Active: "active",
  Completed: "completed",
  Cancelled: "cancel",
};

const apiToUiStatus: Record<string, string> = {
  pending: "Pending",
  accepted: "Accepted",
  completed: "Completed",
  cancelled: "Cancel",
  active: "Active",
};

interface RightBookingsPanelProps {
  onBookingClick?: (booking: Booking) => void; // Optional, for future extensibility
}

// Use this helper in RightSide.tsx
function extractBookings(resp?: { data?: { bookings: Booking[] } }): Booking[] {
  if (!resp?.data) return [];
  return resp.data.bookings;
}

const RightBookingsPanel: FC<RightBookingsPanelProps> = ({
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBookingClick,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isScheduleCareOpen, setIsScheduleCareOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{
    id: string;
    caregiverId: string;
  } | null>(null);
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  // initialize mutation
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  // Build status param for API (omit param for All)
  const statusParam =
    selectedStatus === "All"
      ? undefined
      : uiToApiStatus[selectedStatus] || undefined;

  // Fetch with optional param
  const { data, isLoading, error, refetch } = useGetRecentBookingsQuery(statusParam, {
    refetchOnMountOrArgChange: true, // <-- Always refetch when mounted or status changes
  });
  const bookings = extractBookings(data);

  // Sort bookings by updatedAt (fallback to bookedOn or createdAt)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.bookedOn);
    const dateB = new Date(b.bookedOn);
    return dateB.getTime() - dateA.getTime(); // Newest first
  });

  // Ensure client UI still filters if backend returns all
  const filteredBookings =
    selectedStatus === "All"
      ? sortedBookings
      : sortedBookings.filter(
          (b) => {
            const uiStatus = apiToUiStatus[b?.status?.toLowerCase?.()];
            // Show both "Active" and "Accepted" for active tab if needed
            if (selectedStatus === "Active") {
              return uiStatus === "Active" || uiStatus === "Accepted";
            }
            return uiStatus === selectedStatus;
          }
        );

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      await cancelBooking({
        bookingId: selectedBooking.id,
        caregiverId: selectedBooking.caregiverId,
      }).unwrap();
      refetch(); // <-- This reloads the latest bookings
      toast.success("Booking cancelled successfully");
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

  // Inside your reschedule handler/component:
  const booking = filteredBookings.find(b => b.bookingId === selectedBooking?.id);
 ;

  useEffect(() => {
    const booking = filteredBookings.find(b => b.bookingId === selectedBooking?.id);
    const caregiverIds = booking?.caregivers?.filter(c => !c.isDeleted).map(c => c.id) || [];

    async function fetchServices() {
      let allServices: string[] = [];
      for (const id of caregiverIds) {
        const data = await fetchCaregiverDetails(id);
        if (data?.details?.[0]?.services) {
          allServices = [...allServices, ...data.details[0].services];
        }
      }
      setServiceIds([...new Set(allServices)]);
    }
    if (caregiverIds.length) fetchServices();
  }, [filteredBookings, selectedBooking]);

  const router = useRouter();

  if (isLoading)
    return (
      <div className="w-full p-3 sm:p-4 md:p-6 lg:p-8 mt-0 lg:mt-3">
        <h2 className="text-2xl text-center lg:text-start sm:text-3xl lg:text-4xl font-semibold text-[var(--navy)] mb-6 font-Urbanist">
          Recent Bookings
        </h2>
        <div className="space-y-4 sm:space-y-6 w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative flex items-start md:items-start lg:items-center gap-3 md:gap-4 lg:gap-5 bg-white p-4 sm:p-5 md:p-4 lg:p-3 rounded-3xl shadow-md md:shadow-lg w-full mx-auto animate-pulse"
            >
              {/* Calendar Icon Skeleton */}
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
              
              {/* Content Skeleton */}
              <div className="flex flex-col gap-3 pr-12 md:pr-14 lg:pr-20 w-full flex-1">
                {/* Booking ID Skeleton */}
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                
                {/* Care Type Skeleton */}
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                
                {/* Date and Status Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
                  <div className="h-8 bg-gray-300 rounded-full w-1/3"></div>
                  <div className="h-8 bg-gray-300 rounded-full w-1/4"></div>
                </div>
              </div>
              
              {/* Cancel Button Skeleton */}
              <div className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-500">Failed to load bookings.</div>
    );

  return (
    <div className="w-full p-3 sm:p-4 md:p-6 lg:p-8 mt-0 lg:mt-3">
      <h2 className="text-2xl text-center lg:text-start sm:text-3xl lg:text-4xl font-semibold text-[var(--navy)] mb-6 font-Urbanist">
        Recent Bookings
      </h2>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:flex md:flex-wrap md:gap-3 lg:gap-5 mb-6 sm:mb-8 cursor-pointer w-full">
        {["All", "Pending", "Accepted", "Active", "Completed", "Cancel"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`w-full md:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-sm md:text-lg font-semibold transition-colors flex items-center justify-center text-center ${
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
        <div className="space-y-3 sm:space-y-6 max-h-[70vh] overflow-y-auto w-full lg:max-w-3xl">
          {filteredBookings.map((booking) => {
            const apiStatus = booking.status?.toLowerCase?.() || "";
            const uiStatus =
              apiToUiStatus[apiStatus] ||
              booking.status ||
              "Unknown";

            return (
              <div
                key={booking.bookingId}
                onClick={() => router.push(`/recent-booking/${booking.bookingId}`)}
                className="relative flex items-start md:items-start lg:items-center gap-3 md:gap-4 lg:gap-5 bg-white p-4 sm:p-5 md:p-4 lg:p-3 rounded-3xl shadow-md md:shadow-lg w-full mx-auto"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[var(--navy)] rounded-full flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/Recent/calendar.png"
                      alt="calendar"
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                <div className="flex flex-col gap-2 pr-12 md:pr-14 lg:pr-20 w-full">
                  <p className="font-semibold text-lg md:text-xl lg:text-2xl text-[var(--navy)] leading-tight max-w-[180px] md:max-w-none overflow-hidden whitespace-nowrap text-ellipsis md:overflow-visible md:whitespace-normal md:text-clip">
                    #{booking.bookingId}
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-tight">
                    {booking.careType}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2 text-sm md:text-base text-gray-600">
                    <div className="inline-flex self-start w-fit md:self-auto items-center gap-2 border px-4 py-2 md:px-5 rounded-full border-[var(--navy)] text-[var(--navy)] md:border-gray-300 md:text-gray-700 font-medium bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                      <Image
                        src="/Recent/c.png"
                        alt="date"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5"
                      />
                      {new Date(booking.bookedOn).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </div>
                    <div
                      className={`inline-flex self-start w-fit md:self-auto px-4 py-2 md:px-5 rounded-full text-sm md:text-lg font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${
                        statusColor[apiStatus] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {uiStatus}
                    </div>
                  </div>
                </div>

                {(apiStatus === "requested" ||
                  apiStatus === "pending" ||
                  apiStatus === "active" ||
                  apiStatus === "accepted") && (
                  <div
                    className={`absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg leading-none cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${
                      isCancelling ? "bg-gray-300 cursor-not-allowed" : "bg-[#FF5C5F]"
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
                      src="/cancel.png"
                      alt="cancel"
                      width={36}
                      height={36}
                      className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                    />
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
        selectedCaregivers={
          filteredBookings
            .find(b => b.bookingId === selectedBooking?.id)
            ?.caregivers
            ?.filter(c => !c.isDeleted)
            .map(c => ({
              id: c.id,
              name: c.name,
              specialty: c.status || "General Care",
              status: c.status || "General Care",
              price: typeof c.price === "string" ? c.price : c.price !== undefined ? String(c.price) : "",
              experience: typeof c.experience === "string" ? c.experience : c.experience ? `${c.experience} Years` : "0+ Years",
              avatar: c.avatar
                ? c.avatar.startsWith("http")
                  ? c.avatar
                  : `https://creative-story.s3.us-east-1.amazonaws.com/${c.avatar.replace(/^\/+/, "")}`
                : "/care-giver/boy-icon.png",
            })) || []
        }
        serviceIds={serviceIds}
        requiredBy={booking?.requiredBy || ""}
        onBookingSuccess={() => {
          setIsScheduleCareOpen(false);
          console.log("Booking successful from RightSide component");
        }}
      />
    </div>
  );
};

export default RightBookingsPanel;

async function fetchCaregiverDetails(id: string) {
  const res = await fetch(`/api/v1/giver/search/${id}`); // Use your actual API endpoint
  return await res.json();
}
