"use client";

import { useRouter } from "next/navigation";

interface BookSuccessfulProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const BookSuccessful = ({ isModalOpen, onClose }: BookSuccessfulProps) => {
  const router = useRouter();

  if (!isModalOpen) return null;

  const handleGoToRecentBooking = () => {
    onClose();
    router.push("/recent-booking"); // Change this route if needed
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white shadow-md rounded-3xl p-8 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-[#F2A3071A] mx-auto">
          <img
            src="/care-giver/yellow-tick.png"
            alt="Success"
            className="w-8 h-8"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[var(--navy)] mb-3">
          Booked Successfully
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-center mb-6 text-sm leading-relaxed">
          You have booked caregivers. We will choose the best one for you and let you know.
        </p>

        {/* Action Button */}
        <button
          onClick={handleGoToRecentBooking}
          className="bg-yellow-400 hover:bg-yellow-500 transition duration-200 w-full py-2 px-4 rounded-full text-[var(--navy)] font-semibold text-md cursor-pointer"
        >
          Go to Recent Booking
        </button>
      </div>
    </div>
  );
};

export default BookSuccessful;
