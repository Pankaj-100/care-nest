"use client";
import { useState } from "react";
import RightBookingsPanel from "@/components/RecentBooked/RightSide";
import { Sidebar } from "@/components/RecentBooked/Sidebar";
import ManageProfile from "@/components/RecentBooked/ManageProfile";


const SavedCaregivers = () => (
  <div className="p-6 mt-10">
    <h2 className="text-2xl font-bold">Saved Caregivers</h2>
    <p>Saved caregivers list here.</p>
  </div>
);

// Add more components as needed...

export function RecentPage() {
  const [selectedOption, setSelectedOption] = useState("Manage Profile");

  const renderRightPanel = () => {
    switch (selectedOption) {
      case "Manage Profile":
        return <ManageProfile />;
      case "Recent Booking":
        return <RightBookingsPanel />;
      case "Saved Caregivers":
        return <SavedCaregivers />;
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
