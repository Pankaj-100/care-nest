import { FC, useState } from "react";
import { useGetRecentBookingsQuery, useCancelBookingMutation } from "@/store/api/bookingApi";
import ActionDialog from "../common/ActionDialog";
import { cancelIcon } from "@/lib/svg_icons";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import Image from "next/image";
import emptyCaregiverImage from "@/assets/care.svg"; 
import { toast } from "react-toastify";

const statusColor: Record<string, string> = {
  pending: "bg-yellow-400 text-white",
  accepted: "bg-gray-800 text-white",
  completed: "bg-green-500 text-white",
};

interface RightBookingsPanelProps {
  onBookingClick: (booking: any) => void; 
}


const RightBookingsPanel: FC<RightBookingsPanelProps> = ({ onBookingClick }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isScheduleCareOpen, setIsScheduleCareOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{
    id: string;
    caregiverId: string;
  } | null>(null);

  const { data, isLoading, error, refetch } = useGetRecentBookingsQuery(""); 
  const [cancelBooking] = useCancelBookingMutation();

  const bookings = data?.data?.bookings || []; 
  console.log("Bookings:", bookings);

  const filteredBookings =
    selectedStatus.toLowerCase() === "all"
      ? bookings
      : bookings.filter(
          (b) => b.status?.toLowerCase() === selectedStatus.toLowerCase()
        );

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    
    try {
      await cancelBooking({
        bookingId: selectedBooking.id,
        caregiverId: selectedBooking.caregiverId
      }).unwrap();
      
      toast.success("Booking cancelled successfully");
      refetch(); // Refresh the bookings list
    } catch (err) {
      toast.error("Failed to cancel booking");
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

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load bookings.</div>;
  }

  return (
    <div className="w-full md:w-3/4 p-6 mt-10">
      <h2 className="text-3xl font-semibold text-[var(--navy)] mb-6 font-Urbanist">
        Recent Bookings
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Pending", "Accepted", "Completed"].map((status) => (
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
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <div className="relative w-64 h-64">
            <Image
              src={emptyCaregiverImage}
              alt="No saved caregivers"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-lg text-gray-600">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              onClick={() => onBookingClick(booking)} 
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[var(--navy)] rounded-full flex items-center justify-center">
                  <img src="/Recent/calendar.png" alt="icon" className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-[var(--navy)]">
                    #{booking.bookingId}
                  </p>
                  <p className="text-sm text-gray-600">{"Memory care"}</p>
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1 border px-2 py-1 rounded-full text-sm font-light">
                      <img src="/Recent/c.png" alt="calendar" className="w-3 h-3" />
                      {new Date(booking.bookedOn).toLocaleDateString()}
                    </div>
                    <div className="flex text-sm font-light items-center gap-1 border px-2 py-1 rounded-full">
                      <img src="/Recent/time.png" alt="duration" className="w-3 h-3" />
                      {booking.duration || 1} Month
                    </div>
                    <div
                      className={`px-3 py-2 rounded-full text-md font-medium items-center ${statusColor[booking.status.toLowerCase()]}`}
                    >
                      {booking.status}
                    </div>
                  </div>
                </div>
              </div>

              {booking.status === "Completed" ? (
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-[#F2A307] rounded-full text-lg leading-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsScheduleCareOpen(true);
                    }}
                  >
                    <img src="/Recent/reload.png" alt="reload" className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 flex items-center justify-center bg-[#FF5C5F] rounded-full text-lg leading-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBooking({
                        id: booking.bookingId,
                        caregiverId: booking.caregivers[0]?.id || ""
                      });
                      setOpenDialog(true);
                    }}
                  >
                    <img src="/Recent/cross.png" alt="cancel" className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
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
            experience: "12+ Years",
            rate: "$150/hr",
            imgSrc: "/care-giver/boy-icon.png",
            isBookmarked: false,
          },
        ]}
      />
    </div>
  );
};

export default RightBookingsPanel;