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
import { useGetBookmarkedCaregiversQuery } from "@/store/api/bookingApi";

const SavedCaregiversPanel = () => {
  const { data, isLoading, isError } = useGetBookmarkedCaregiversQuery();
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);

  if (isLoading) return <div>Loading saved caregivers...</div>;
  if (isError || !data?.data?.givers) return <div>No saved caregivers found.</div>;

  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-bold">Saved Caregivers</h2>
      {data.data.givers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <div className="relative w-64 h-64">
            <Image
              src={emptyCaregiverImage}
              alt="No saved caregivers"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-lg text-gray-600">You havent saved any caregivers yet!</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p>Select caregivers to book their services (Select at least 3)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.data.givers.map((giver) => (
              <CaregiverCard
                key={giver.id}
                name={giver.name}
                avatar={
                  giver.avatar
                    ? giver.avatar.startsWith("http")
                      ? giver.avatar
                      : `https://dev-carenest.s3.ap-south-1.amazonaws.com/${giver.avatar.replace(/^\/+/, "")}`
                    : "/care-giver/boy-icon.png"
                }
                specialty={"General care"}
                experience={typeof giver.experience === "string" ? giver.experience : giver.experience ? `${giver.experience} Years` : "0+ Years"}
                isBookmarked={true}
                heightClass="h-30"
                onClick={() => setSelectedCaregiverId(giver.id)}
              />
            ))}
          </div>
          <div className="mt-10 text-center max-w-xl mx-auto">
            <button
              disabled={false}
              onClick={() => {}}
              className={`w-full px-12 py-4 text-[var(--navy)] text-lg bg-yellow-500 rounded-full font-semibold transition
                ${
                  true
                    ? " hover:  shadow-md"
                    : " cursor-not-allowed"
                }`}
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
        onAddCaregiver={() => {}}
        isBookmarked={true}
      />
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
    <div className="min-h-screen bg-[#F8F9FA] max-w-7xl mx-auto flex flex-col md:flex-row p-4 gap-4">
      <Sidebar onSelect={setSelectedOption} selected={selectedOption} />
      <div className="w-full md:w-3/4">{renderRightPanel()}</div>
    </div>
  );
}