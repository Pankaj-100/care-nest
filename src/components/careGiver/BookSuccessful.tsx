"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CustomButton } from "../common/CustomInputs";

interface BookSuccessfulProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const BookSuccessful = ({ isModalOpen, onClose }: BookSuccessfulProps) => {
  const router = useRouter();

  if (!isModalOpen) return null;

  const handleGoToRecentBooking = () => {
    onClose();
    router.push("/recent-booking"); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2 sm:px-0">
      <div
        className="bg-white shadow-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-xs sm:max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="flex justify-center items-center mb-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F2A3071A] mx-auto">
          <Image
            src="/care-giver/yellow-tick.png"
            alt="Success"
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl font-bold text-center text-[var(--navy)] mb-2 sm:mb-3">
          Thank you for booking with us
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-center mb-5 sm:mb-6 text-xs sm:text-sm leading-relaxed">
          You have booked caregivers You will receive an email shortly. we will choose the best one for you and let you know.
        </p>

        {/* Action Button */}
        <CustomButton className="w-full text-sm sm:text-base py-3 sm:py-4" onClick={handleGoToRecentBooking}>
          Go to Recent Booking
        </CustomButton>
      </div>
    </div>
  );
};

export default BookSuccessful;
