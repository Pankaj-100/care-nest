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
interface Caregiver {
  name: string;
  specialty: string;
  experience: string;
  rate: string;
  imgSrc: string;
  isBookmarked?: boolean;
}
const caregiversData: Caregiver[] = [
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
  {
    name: "Michael Brown",
    specialty: "Physical Therapy",
    experience: "10+ Years",
    rate: "$180/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
  {
    name: "Sarah Davis",
    specialty: "Home Assistance",
    experience: "7+ Years",
    rate: "$130/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
    {
    name: " Davis",
    specialty: "Home Assistance",
    experience: "7+ Years",
    rate: "$130/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },


];

const SavedCaregivers = () => { 
  const [caregivers, setCaregivers] = useState<Caregiver[]>(caregiversData);
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (name: string) => {
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
          <p className="text-lg text-gray-600">You haven't saved any caregivers yet!</p>
      
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p>Select caregivers to book their services (Select at least 3)</p>
           
          </div>
          
          <div className="grid grid-cols-2  gap-4">
            {caregivers.map((caregiver, idx) => (
              <CaregiverCard  
                key={idx}
                {...caregiver}
                heightClass="h-30"
                onClick={() => handleCardClick(caregiver.name)}
                onBookmarkToggle={() => handleCardClick(caregiver.name)}
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
        selectedCaregivers={caregivers.filter(c => c.isBookmarked)}
      />
    </div>
  );
}

export function RecentPage() {
  const [selectedOption, setSelectedOption] = useState("Manage Profile");

  const renderRightPanel = () => {
    switch (selectedOption) {
      case "Manage Profile":
        return <ManageProfile />;
         case "Recent Booking":
        return (
          <RightBookingsPanel onBookingClick={() => setSelectedOption("Booking Detail")}   />
        );

        case "Booking Detail":
  return <BookingDetails />;
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