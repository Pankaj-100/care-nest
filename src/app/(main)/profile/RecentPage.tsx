"use client";
import { useState } from "react";
import RightBookingsPanel from "@/components/RecentBooked/RightSide";
import { Sidebar } from "@/components/RecentBooked/Sidebar";
import ResetPassword from "@/components/RecentBooked/ResetPassword";
import BookingDetails from "@/components/RecentBooked/BookingDetails";
import ManageProfile from "@/components/RecentBooked/ManageProfile";
import AccountDelete from "@/components/RecentBooked/AccountDelete";
import Logout from "@/components/RecentBooked/Logout";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import Image from "next/image";
import emptyCaregiverImage from "@/assets/care.svg";
import type { Booking, Caregiver } from "@/types/Booking";

const caregiversData: Caregiver[] = [
  {
    id: "1",
    name: "Joe Doe",
    specialty: "Elderly Care",
    experience: "12+ Years",
    price: "150", // <-- use price instead of rate
    avatar: "/care-giver/boy-icon.png", // <-- use avatar instead of imgSrc
    isBookmarked: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    specialty: "Pet Care",
    experience: "8+ Years",
    price: "120", // <-- use price instead of rate
    avatar: "/care-giver/boy-icon.png", // <-- use avatar instead of imgSrc
    isBookmarked: false,
  },
  {
    id: "3",
    name: "Emily Johnson",
    specialty: "Baby Care",
    experience: "5+ Years",
    price: "100", // <-- use price instead of rate
    avatar: "/care-giver/boy-icon.png", // <-- use avatar instead of imgSrc
    isBookmarked: false,
  },
  {
    id: "4",
    name: "Michael Brown",
    specialty: "Physical Therapy",
    experience: "10+ Years",
    price: "180", // <-- use price instead of rate
    avatar: "/care-giver/boy-icon.png", // <-- use avatar instead of imgSrc
    isBookmarked: false,
  },
  {
    id: "5",
    name: "Sarah Davis",
    specialty: "Home Assistance",
    experience: "7+ Years",
    price: "130", // <-- use price instead of rate
    avatar: "/care-giver/boy-icon.png", // <-- use avatar instead of imgSrc
    isBookmarked: false,
  },
  {
    id: "6",
    name: " Davis",
    specialty: "Home Assistance",
    experience: "7+ Years",
    price: "130", // <-- use price instead of rate
    avatar: "/care-giver/boy-icon.png", // <-- use avatar instead of imgSrc
    isBookmarked: false,
  },
];

const SavedCaregivers = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>(caregiversData);
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (name: string | null) => {
    setCaregivers(prevCaregivers =>
      prevCaregivers.map(caregiver =>
        caregiver.name === name
          ? { ...caregiver, isBookmarked: !caregiver.isBookmarked }
          : caregiver
      )
    );
  };

  const selectedCount = caregivers.filter(c => c.isBookmarked).length;

  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-bold">Saved Caregivers</h2>
      {caregivers.length === 0 ? (
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
            {caregivers.map((caregiver, idx) => (
              <CaregiverCard
                key={caregiver.id ? caregiver.id : idx}
                name={caregiver.name ?? ""}
                avatar={caregiver.avatar ?? "/care-giver/boy-icon.png"} // <-- changed
                specialty={caregiver.specialty ?? ""}
                experience={typeof caregiver.experience === "string" ? caregiver.experience : caregiver.experience ? `${caregiver.experience} Years` : ""}
                isBookmarked={!!caregiver.isBookmarked}
                heightClass="h-30"
                onClick={() => handleCardClick(caregiver.name ?? "")}
              />
            ))}
          </div>
          <div className="mt-10 text-center max-w-xl mx-auto">
            <button
              disabled={selectedCount < 3}
              onClick={() => setIsOpen(true)}
              className={`w-full px-12 py-4 text-[var(--navy)] text-lg bg-yellow-500 rounded-full font-semibold transition
                ${
                  selectedCount >= 3
                    ? " hover:  shadow-md"
                    : " cursor-not-allowed"
                }`}
            >
              Proceed
            </button>
          </div>
        </>
      )}
      <ScheduleCare
        isOpen={isOpen}
        OnClose={() => setIsOpen(false)}
        selectedCaregivers={caregivers
          .filter(c => !!c.isBookmarked)
          .map(c => ({
            id: c.id ?? "",
            name: c.name ?? "",
            specialty: c.specialty ?? "",
            experience: typeof c.experience === "string"
              ? c.experience
              : c.experience
              ? `${c.experience} Years`
              : "",
            price: c.price !== undefined && c.price !== null ? String(c.price) : "", // <-- always string
            avatar: c.avatar ?? "/care-giver/boy-icon.png",
            isBookmarked: c.isBookmarked,
          }))}
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
        return <SavedCaregivers />;
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