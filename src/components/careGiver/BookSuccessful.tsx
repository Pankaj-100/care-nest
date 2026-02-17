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
          Thank you for reaching out to CareWorks
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-center mb-5 sm:mb-6 text-md sm:text-md leading-relaxed">
          Your caregiver selections have been received. Our team will carefully review the caregiver's availability and confirm the best match for you. You will hear from us shortly by email and a call.
        </p>

        {/* Action Button */}
        <CustomButton className="w-full text-md sm:text-base py-5 sm:py-5" onClick={handleGoToRecentBooking}>
          Go to Recent Care Requests
        </CustomButton>
      </div>
    </div>
  );
};

export default BookSuccessful;
