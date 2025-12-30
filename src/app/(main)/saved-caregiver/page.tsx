"use client";
import { useState, Suspense } from "react";
import SavedCaregiversPanel from "@/app/(main)/profile/RecentPage";
import { Sidebar } from "@/components/RecentBooked/Sidebar";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";

export default function SavedCaregiverPage() {
  const [selectedOption, setSelectedOption] = useState("Saved Caregivers");
  return (
    <>
      <HeroSectionCareProvider title="Saved Caregivers" />
      <div className="min-h-screen bg-[#F8F9FA] max-w-7xl mx-auto flex flex-col md:flex-row p-4 gap-4">
        <Sidebar onSelect={setSelectedOption} selected={selectedOption} />
        <div className="w-full md:w-3/4">
          <Suspense fallback={<div className="p-4 animate-pulse text-[var(--navy)]">Loading saved caregivers...</div>}>
            <SavedCaregiversPanel />
          </Suspense>
        </div>
      </div>
    </>
  );
}