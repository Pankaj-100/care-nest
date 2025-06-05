"use client";
import React, { useState } from "react";
import FilterSidebar from "@/components/careGiver/FilterSidebar";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import CaregiverModal from "@/components/careGiver/CaregiverModal";
import ScheduleCare from "@/components/careGiver/ScheduleCare";

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
    name: "David Wilson",
    specialty: "Medical Assistance",
    experience: "15+ Years",
    rate: "$200/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
  {
    name: "Laura Garcia",
    specialty: "Companionship",
    experience: "6+ Years",
    rate: "$110/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
  {
    name: "Garcia",
    specialty: "Companionship",
    experience: "6+ Years",
    rate: "$110/hr",
    imgSrc: "/care-giver/boy-icon.png",
    isBookmarked: false,
  },
];

const CaregiversPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(
    null
  );
  const [caregivers, setCaregivers] = useState<Caregiver[]>(caregiversData);
  const [isOpen, setIsOpen] = useState(false);

  console.log("Caregivers:", caregivers);
  const handleCardClick = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsModalOpen(true);
  };

  const handleBookmarkToggle = (name: string) => {
    setCaregivers((prevCaregivers) =>
      prevCaregivers.map((caregiver) =>
        caregiver.name === name
          ? { ...caregiver, isBookmarked: !caregiver.isBookmarked }
          : caregiver
      )
    );
    // If toggling bookmark inside modal, update selectedCaregiver state too
    if (selectedCaregiver?.name === name) {
      setSelectedCaregiver((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : prev
      );
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />

        <div className="flex-1 mt-4">
          <div className="flex flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-md font-semibold text-[var(--navy)]">
                <span className="text-[var(--yellow)]">20 Results</span> Found
                Based on Your Search
              </h2>
            </div>

            <div>
              <h2 className="flex flex-row text-md font-semibold gap-3 text-[var(--navy)] mb-6 bg-[#5C9EAD26] p-4 rounded-3xl">
                <img src={"/exclaimed-mark.png"} alt="icon" />
                Select up to three caregivers to continue with your booking.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {caregivers.map((caregiver, idx) => (
              <CaregiverCard
                key={idx}
                {...caregiver}
                onClick={() => handleCardClick(caregiver)}
                onBookmarkToggle={() => handleBookmarkToggle(caregiver.name)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center max-w-xl mx-auto">
        <button
          disabled={caregivers.filter((c) => c.isBookmarked).length < 3}
          onClick={() => setIsOpen(true)}
          className={`w-full px-12 py-4 text-[var(--navy)] text-lg rounded-full font-semibold transition
    ${
      caregivers.filter((c) => c.isBookmarked).length >= 3
        ? "bg-[var(--yellow)] "
        : "bg-[var(--yellow-light)] cursor-not-allowed"
    }`}
        >
          Proceed
        </button>
      </div>

      {/* Modal */}
      <CaregiverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caregiver={selectedCaregiver}
        onBookmarkToggle={handleBookmarkToggle}
      />

      <ScheduleCare
        isOpen={isOpen}
        OnClose={() => setIsOpen(false)}
        selectedCaregivers={caregivers.filter((c) => c.isBookmarked)}
      />
    </div>
  );
};

export default CaregiversPage;
