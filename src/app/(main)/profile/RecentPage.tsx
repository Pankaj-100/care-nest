"use client";
import CaregiverModal from "@/components/careGiver/CaregiverModal";
import { useState } from "react";
import RightBookingsPanel from "@/components/RecentBooked/RightSide";
import { Sidebar } from "@/components/RecentBooked/Sidebar";
import ResetPassword from "@/components/RecentBooked/ResetPassword";
import BookingDetails from "@/components/RecentBooked/BookingDetails";
import ManageProfile from "@/components/RecentBooked/ManageProfile";
import AccountDelete from "@/components/RecentBooked/AccountDelete";
import Logout from "@/components/RecentBooked/Logout";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import Image from "next/image";
import emptyCaregiverImage from "@/assets/care.svg";
import type { Booking } from "@/types/Booking";
import { useGetBookmarkedCaregiversQuery, useBookmarkCaregiverMutation } from "@/store/api/bookingApi";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import BookSuccessful from "@/components/careGiver/BookSuccessful";
import { toast } from "react-toastify";

const SavedCaregiversPanel = () => {
  const { data, isLoading, isError, refetch } = useGetBookmarkedCaregiversQuery();
  const [removeBookmarkedCaregiver] = useBookmarkCaregiverMutation();
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [selectedCaregivers, setSelectedCaregivers] = useState<string[]>([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (isLoading) return <div>Loading saved caregivers...</div>;
  if (isError || !data?.data?.givers) return <div>No saved caregivers found.</div>;

  const mappedCaregiversForSchedule = data.data.givers
    .filter(giver => selectedCaregivers.includes(giver.id))
    .map(giver => ({
      id: giver.id,
      name: giver.name,
      avatar: giver.avatar ?? "/care-giver/boy-icon.png",
      specialty: giver.services.join(", "),
      experience: typeof giver.experience === "string" ? giver.experience : giver.experience ? `${giver.experience} Years` : "0+ Years",
      price: giver.price ? `₹${giver.price}` : "N/A",
    }));

  const handleAddCaregiver = (id: string) => {
    setSelectedCaregivers(prev =>
      prev.includes(id)
        ? prev.filter(cgId => cgId !== id) // Remove caregiver if already selected
        : prev.length < 3
          ? [...prev, id] // Add caregiver if not already selected
          : prev
    );
    setSelectedCaregiverId(null); // Close modal after action
  };

  // Handler to remove caregiver from bookmarks
  const handleRemoveBookmark = async (id: string) => {
    try {
      await removeBookmarkedCaregiver(id).unwrap();
      toast.success("Caregiver removed successfully!");
      refetch(); // Refetch to update the UI
    } catch {
      toast.error("Failed to remove caregiver. Please try again.");
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 mt-6 md:mt-10">
      <h2 className="text-xl sm:text-2xl font-bold">Saved Caregivers</h2>
      {data.data.givers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 sm:mt-10 space-y-4">
          <div className="relative w-40 h-40 sm:w-64 sm:h-64">
            <Image
              src={emptyCaregiverImage}
              alt="No saved caregivers"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-base sm:text-lg text-gray-600">You haven't saved any caregivers yet!</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
            <p className="text-sm sm:text-base">Select caregivers to book their services (Select at least 1)</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {data.data.givers.map((giver) => (
              <CaregiverCard
                key={giver.id}
                name={giver.name}
                avatar={
                  giver.avatar
                    ? giver.avatar.startsWith("http")
                      ? giver.avatar
                      : `https://creative-story.s3.us-east-1.amazonaws.com/${giver.avatar.replace(/^\/+/, "")}`
                    : "/care-giver/boy-icon.png"
                }
                specialty={"General care"}
                experience={typeof giver.experience === "string" ? giver.experience : giver.experience ? `${giver.experience} Years` : "0+ Years"}
                isBookmarked={true}
                heightClass="h-30"
                isSelected={selectedCaregivers.includes(giver.id)}
                onClick={() => setSelectedCaregiverId(giver.id)}
                onBookmarkToggle={() => handleRemoveBookmark(giver.id)}
              />
            ))}
          </div>
          <div className="mt-8 sm:mt-10  text-center max-w-xl mx-auto">
            <button
              disabled={selectedCaregivers.length < 1}
              onClick={() => setIsScheduleOpen(true)}
              className={`w-full px-8 sm:px-12 cursor-pointer py-3 sm:py-4 text-[var(--navy)] text-base sm:text-xl bg-yellow-500 rounded-full font-semibold transition
                ${selectedCaregivers.length >= 1 ? "hover:shadow-md" : "cursor-not-allowed opacity-50"}`}
            >
              Proceed
            </button>
          </div>
        </>
      )}
      {/* Caregiver Profile Modal */}
      <CaregiverModal
        isOpen={!!selectedCaregiverId}
        caregiverId={selectedCaregiverId}
        onClose={() => setSelectedCaregiverId(null)}
        onAddCaregiver={handleAddCaregiver}
        isBookmarked={true}
         isSelected={selectedCaregivers.includes(selectedCaregiverId ?? "")} // <-- Add this line
      />

      {/* ScheduleCare Modal */}
      <ScheduleCare
        isOpen={isScheduleOpen}
        OnClose={() => setIsScheduleOpen(false)}
        selectedCaregivers={mappedCaregiversForSchedule}
        // Pass a callback to show success modal if needed
        onBookingSuccess={() => setShowSuccessModal(true)}
      />

      {/* Booking Success Modal */}
      {showSuccessModal && (
        <BookSuccessful
          isModalOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

interface RecentPageProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

export function RecentPage({ selectedOption, setSelectedOption }: RecentPageProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const renderRightPanel = () => {
    switch (selectedOption) {
      case "Manage Profile":
        return <ManageProfile />;
      case "Recent Booking":
        return (
          <RightBookingsPanel
            onBookingClick={(booking: Booking) => {
              setSelectedBooking(booking);
              setSelectedOption("Booking Detail");
            }}
          />
        );
      case "Booking Detail":
        return selectedBooking ? <BookingDetails booking={selectedBooking} /> : null;
      case "Saved Caregivers":
        return <SavedCaregiversPanel />;
      case "Reset Password":
        return <ResetPassword />;
      case "Delete Account":
        return <AccountDelete goTo={setSelectedOption} />;
      case "Logout":
        return <Logout goTo={setSelectedOption} />;
      default:
        return (
          <div className="p-6 mt-10">
            <h2 className="text-xl">Select a section from sidebar</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] max-w-7xl mx-auto flex flex-col md:flex-row p-2 sm:p-4 gap-3 sm:gap-4">
      <Sidebar onSelect={setSelectedOption} selected={selectedOption} />
      <div className="w-full md:w-3/4">{renderRightPanel()}</div>
    </div>
  );
}

export default SavedCaregiversPanel;