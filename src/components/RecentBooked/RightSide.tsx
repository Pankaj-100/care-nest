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

  if (isLoading)
    return <div className="p-6 text-gray-500">Loading bookings...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">Failed to load bookings.</div>
    );

  return (
    <div className="w-full p-8 mt-10">
      <h2 className="text-4xl  font-semibold text-[var(--navy)] mb-6 font-Urbanist">
        Recent Bookings
      </h2>

      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "Pending", "Accepted", "Active", "Completed", "Cancel"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-8 py-3 rounded-full text-lg md:text-lg font-semibold ${
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
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4 w-full">
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
                className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg w-full"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[var(--navy)] rounded-full flex items-center justify-center">
                    <Image
                      src="/Recent/calendar.png"
                      alt="calendar"
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xl md:text-2xl text-[var(--navy)]">
                      #{booking.bookingId}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {booking.careType}
                    </p>
                    <div className="flex gap-3 mt-2 text-xs md:text-sm text-gray-600  items-center">
                      <div className="flex items-center gap-2 border px-6 py-2 rounded-full border-gray-400 text-md font-md">
                        <Image
                          src="/Recent/c.png"
                          alt="date"
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5"
                        />
                        {new Date(booking.bookedOn).toLocaleDateString()}
                      </div>
                      <div
                        className={`px-6 py-2 rounded-full text-lg font-semibold ${
                          statusColor[apiStatus] || "bg-gray-200 text-gray-700"
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
                        setSelectedBooking({ id: booking.bookingId, caregiverId: "" });
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
                      apiStatus === "pending" ||
                      apiStatus === "active" ||
                      apiStatus === "accepted") && (
                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full text-lg leading-none cursor-pointer ${
                          isCancelling
                            ? "bg-gray-300 cursor-not-allowed"
                            : "" // Changed from bg to border
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
                          width={45}
                          height={45}
                          className="w-13 h-13   cursor-pointer"
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
                  : `https://dev-carenest.s3.ap-south-1.amazonaws.com/${c.avatar.replace(/^\/+/, "")}`
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
