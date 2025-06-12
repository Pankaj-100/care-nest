import { FC } from "react";
import { useState } from "react";
import ActionDialog from "../common/ActionDialog";
import { binIcon } from "@/lib/svg_icons";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import Image from "next/image";
import emptyCaregiverImage from "@/assets/care.svg"; 
interface Booking {
  id: string;
  type: string;
  date: string;
  duration: string;
  status: "Pending" | "Accepted" | "Completed";
  src: string;
}

const bookings: Booking[] = [
  {
    id: "#15678",
    type: "Personal Care",
    date: "12 Apr 2025",
    duration: "1 Month",
    status: "Pending",
    src: "/Recent/calendar.png",
  },
  {
    id: "#15678",
    type: "Memory Care",
    date: "12 Apr 2025",
    duration: "1 Month",
    status: "Accepted",
    src: "/Recent/calendar.png",
  },
  {
    id: "#15678",
    type: "Assisted Care/Home Care",
    date: "12 Apr 2025",
    duration: "1 Month",
    status: "Completed",
    src: "/Recent/recent.png",
  },
];

const statusColor = {
  Pending: "bg-yellow-400 text-white",
  Accepted: "bg-gray-800 text-white",
  Completed: "bg-green-500 text-white",
};
interface RightBookingsPanelProps {
  onBookingClick: () => void;

}
const RightBookingsPanel: FC<RightBookingsPanelProps> = ({ onBookingClick}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Pending" | "Accepted" | "Completed">("All");
const [isScheduleCareOpen, setIsScheduleCareOpen] = useState(false);

  const handleConfirmCancel = () => {
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const filteredBookings = selectedStatus === "All"
    ? bookings
    : bookings.filter((b) => b.status === selectedStatus);

  return (
    <div className="w-full md:w-3/4 p-6 mt-10">
      <h2 className="text-3xl font-semibold text-[var(--navy)] mb-6 font-Urbanist">
        Recent Bookings
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Pending", "Accepted", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status as any)}
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

      {/* Booking Cards */}
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
        {filteredBookings.map((booking, index) => (
          <div
            key={index}
            onClick={onBookingClick}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[var(--navy)] rounded-full flex items-center justify-center">
                <img src={booking.src} alt="icon" className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg text-[var(--navy)]">
                  {booking.id}
                </p>
                <p className="text-sm text-gray-600">{booking.type}</p>
                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1 border px-2 py-1 rounded-full text-sm font-light">
                    <img src="/Recent/c.png" alt="calendar" className="w-3 h-3" />
                    {booking.date}
                  </div>
                  <div className="flex text-sm font-light items-center gap-1 border px-2 py-1 rounded-full">
                    <img src="/Recent/time.png" alt="duration" className="w-3 h-3" />
                    {booking.duration}
                  </div>
                  <div className={`px-3 py-2 rounded-full text-md font-medium items-center ${statusColor[booking.status]}`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            </div>

            {booking.status === "Completed" ? (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center bg-[#F2A307] rounded-full text-lg leading-none"
                   onClick={(e) => {
        e.stopPropagation();
         setIsScheduleCareOpen(true);
      
      }}>
                  <img src="/Recent/reload.png" alt="reload" className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 flex items-center justify-center bg-[#FF5C5F] rounded-full text-lg leading-none"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    setOpenDialog(true);
                  }}
                >
                  <img src="/Recent/cross.png" alt="cancel" className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>)}

      <ActionDialog
        open={openDialog}
        handleOpen={handleCloseDialog}
        icon={binIcon}
        confirmText="Cancel"
        handleConfirm={handleConfirmCancel}
        heading="Confirm Cancellation"
        subheading={`Are you sure you want to cancel booking ?`}
      />

      <ScheduleCare
  isOpen={isScheduleCareOpen}
  OnClose={() => setIsScheduleCareOpen(false)}
  selectedCaregivers={[
    {
    name: "Joe Doe",
    specialty: "Elderly Care",
    experience: "12+ Years",
    rate: "$150/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
  {
    name: "Jane Smith",
    specialty: "Pet Care",
    experience: "8+ Years",
    rate: "$120/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
  {
    name: "Emily Johnson",
    specialty: "Baby Care",
    experience: "5+ Years",
    rate: "$100/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
  ]}
/>
    </div>
  );
};


export default RightBookingsPanel;
