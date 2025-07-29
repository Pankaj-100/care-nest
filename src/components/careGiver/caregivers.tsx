"use client";
import React, { useState, useEffect } from "react";
import { IoAlertCircleOutline as AlertIcon } from "react-icons/io5";
import { IoFilter as FilterIcon } from "react-icons/io5";

import FilterSidebar from "@/components/careGiver/FilterSidebar";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import CaregiverModal from "@/components/careGiver/CaregiverModal";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import CustomSheet from "../common/CustomSheet";
import LoginRedirectModal from "./LoginRedirectModal";

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
];

const CaregiversPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(
    null
  );
  const [caregivers, setCaregivers] = useState<Caregiver[]>(caregiversData);
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openRedirect, setOpenRedirect] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLoggedInUser = isClient
    ? localStorage.getItem("authToken")
      ? true
      : false
    : false;

  console.log("Caregivers:", caregivers);
  const handleCardClick = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsModalOpen(true);
  };

  const handleBookmarkToggle = (name: string) => {
    if (!isLoggedInUser) {
      handleOpenRedirect();
      return;
    }
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

  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleOpenRedirect = () => {
    setOpenRedirect((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] lg:py-10 mb-8 lg:pt-28 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="lg:block hidden">
          <FilterSidebar />
        </div>

        <div className="lg:hidden  block">
          <CustomSheet
            open={openFilter}
            handleOpen={handleOpenFilter}
            showCrossButton={true}
            className="w-2/3 rounded-l-xl lg:hidden"
          >
            <FilterSidebar />
          </CustomSheet>
        </div>

        <div className="flex-1 flex flex-col ">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-4 text-sm gap-y-4">
            <div className="flex gap-4 items-center">
              <h2 className="text-sm h-max  text-gray-500">
                <span className="text-[var(--yellow)]">20 Results</span> Found
                Based on Your Search
              </h2>

              <button
                onClick={handleOpenFilter}
                className="flex items-center gap-1 lg:hidden "
              >
                <FilterIcon size={15} />
                Filter
              </button>
            </div>

            <div>
              <h2 className="flex flex-row  items-center text-md  gap-3 text-[var(--navy)]  bg-[#5C9EAD26] p-2 rounded-3xl">
                <AlertIcon size={20} />
                Select up to three caregivers to continue with your booking.
              </h2>
            </div>
          </div>

          <div className="sm:mt-0 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {caregivers.map((caregiver, idx) => (
              <CaregiverCard
                key={idx}
                {...caregiver}
                onClick={() => handleCardClick(caregiver)}
                onBookmarkToggle={() => handleBookmarkToggle(caregiver.name)}
              />
            ))}
          </div>

          <div className="mt-10 lg:mb-0 mb-5 w-full text-center max-w-xl mx-auto">
            <button
              disabled={caregivers.filter((c) => c.isBookmarked).length < 3}
              onClick={() => setIsOpen(true)}
              className={`lg:w-[25rem] w-full max-w-full px-4 py-2 text-[var(--navy)] text-lg rounded-full font-semibold transition
    ${
      caregivers.filter((c) => c.isBookmarked).length >= 3
        ? "bg-[var(--yellow)] cursor-pointer "
        : "bg-[#233D4D1A] hover:cursor-not-allowed"
    }`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CaregiverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caregiver={selectedCaregiver}
        onBookmarkToggle={handleBookmarkToggle}
        isLoggedInUser={isLoggedInUser}
      />

      <ScheduleCare
        isOpen={isOpen}
        OnClose={() => setIsOpen(false)}
        selectedCaregivers={caregivers.filter((c) => c.isBookmarked)}
      />
      <LoginRedirectModal open={openRedirect} handleOpen={handleOpenRedirect} />
    </div>
  );
};

export default CaregiversPage;
