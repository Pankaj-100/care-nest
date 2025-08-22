"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { IoAlertCircleOutline as AlertIcon, IoFilter as FilterIcon } from "react-icons/io5";
import Cookies from 'js-cookie';
import FilterSidebar from "@/components/careGiver/FilterSidebar";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import CaregiverModal from "@/components/careGiver/CaregiverModal";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import CustomSheet from "../common/CustomSheet";
import LoginRedirectModal from "./LoginRedirectModal";

import { useSearchCaregiversQuery } from "@/store/api/bookingApi";

interface Caregiver {
  id: string;
  name: string;
  avatar: string;
  price: number;
  experience: number;
  services: string[];
  isBookmarked?: boolean;
}
interface CaregiverFilters {
  gender?: string;
  certified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];

}


const CaregiversPage = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("type") || "";
  // const recipient = searchParams.get("recipient") || "";
  const zipcode = searchParams.get("zipcode") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openRedirect, setOpenRedirect] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [selectedCaregivers, setSelectedCaregivers] = useState<string[]>([]);
  const [filters, setFilters] = useState<CaregiverFilters >({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, error } = useSearchCaregiversQuery({
    serviceId,
    zipcode,
    ...filters,
    languages: Array.isArray(filters.languages)
      ? filters.languages.join(",")
      : filters.languages || undefined,
    
  });

  useEffect(() => {
    if (data?.data?.caregivers) {
      const enriched = data.data.caregivers.map((c: Caregiver) => ({
        ...c,
        isBookmarked: false,
      }));
      setCaregivers(enriched);
    }
  }, [data]);

  const isLoggedInUser = isClient ? Boolean(Cookies.get("authToken")) : false;

  const handleBookmarkToggle = (id: string) => {
    if (!isLoggedInUser) {
      setOpenRedirect(true);
      return;
    }

    setCaregivers((prev) =>
      prev.map((cg) =>
        cg.id === id ? { ...cg, isBookmarked: !cg.isBookmarked } : cg
      )
    );
  };

  const handleCardClick = (caregiverId: string) => {
    setSelectedCaregiverId(caregiverId);
    setIsModalOpen(true);
  };
  

  const handleOpenFilter = () => setOpenFilter((prev) => !prev);
  const handleOpenRedirect = () => setOpenRedirect((prev) => !prev);

  const handleFilterChange = useCallback((newFilters: CaregiverFilters) => {
    setFilters(newFilters);
  }, []);

  const mappedCaregiversForCards = caregivers.map((c) => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar ?? "/care-giver/boy-icon.png", 
    specialty: c.services.join(", "),
    experience: `${c.experience} Years`,
    price: c.price ? `$${c.price}/hr` : "N/A",      
    isBookmarked: c.isBookmarked ?? false,
  }));

  const mappedCaregiversForSchedule = caregivers
    .filter((c) => selectedCaregivers.includes(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      avatar: c.avatar ?? "/care-giver/boy-icon.png", 
      specialty: c.services.join(", "),
      experience: `${c.experience} Years`,
      price: c.price ? `$${c.price}/hr` : "N/A",
    }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] lg:py-10 mb-8 lg:pt-28 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:block hidden">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:hidden block">
          <CustomSheet
            open={openFilter}
            handleOpen={handleOpenFilter}
            showCrossButton={true}
            className="w-2/3 rounded-l-xl lg:hidden"
          >
            <FilterSidebar onFilterChange={handleFilterChange} />
          </CustomSheet>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-4 text-sm gap-y-4">
            <div className="flex gap-4 items-center">
              <h2 className="text-sm h-max text-gray-500">
                <span className="text-[var(--yellow)]">
                  {isLoading ? "Loading..." : caregivers.length + " Results"}
                </span>{" "}
                Found Based on Your Search
              </h2>

              <button
                onClick={handleOpenFilter}
                className="flex items-center gap-1 lg:hidden"
              >
                <FilterIcon size={15} />
                Filter
              </button>
            </div>

            <div>
              <h2 className="flex flex-row items-center text-md gap-3 text-[var(--navy)] bg-[#5C9EAD26] p-2 rounded-3xl">
                <AlertIcon size={20} />
                Select up to three caregivers to continue with your booking.
              </h2>
            </div>
          </div>

          {error && <div className="text-red-500 mb-4">Error loading caregivers.</div>}

          <div className="sm:mt-0 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!isLoading && caregivers.length === 0 && (
              <p>No caregivers found for your search.</p>
            )}

            {mappedCaregiversForCards.map((caregiver) => (
              <CaregiverCard
                key={caregiver.id}
                name={caregiver.name}
                avatar={caregiver.avatar}
                specialty={caregiver.specialty}
                experience={caregiver.experience}
                price={caregiver.price}
                isBookmarked={caregiver?.isBookmarked}
                isSelected={selectedCaregivers.includes(caregiver.id)}
                onClick={() => handleCardClick(caregiver.id)}
                onBookmarkToggle={() => handleBookmarkToggle(caregiver.id)}
              />
            ))}
          </div>

          <div className="mt-10 lg:mb-0 mb-5 w-full text-center max-w-xl mx-auto">
            <button
              disabled={mappedCaregiversForSchedule.length < 3}
              onClick={() => setIsOpen(true)}
              className={`lg:w-[25rem] w-full max-w-full px-4 py-2 text-[var(--navy)] text-lg rounded-full font-semibold transition
                ${
                  mappedCaregiversForSchedule.length >= 3
                    ? "bg-[var(--yellow)] cursor-pointer"
                    : "bg-[#233D4D1A] hover:cursor-not-allowed"
                }`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      Caregiver Detail Modal
      {/* <CaregiverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caregiverId={selectedCaregiverId}
        onBookmarkToggle={handleBookmarkToggle}
        isLoggedInUser={isLoggedInUser}
      /> */}
      <CaregiverModal
  isOpen={isModalOpen}
  caregiverId={selectedCaregiverId}
  onClose={() => setIsModalOpen(false)}
  // onBookmarkToggle={handleBookmarkToggle}
  onAddCaregiver={(id: string) => {
    setSelectedCaregivers((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
    setIsModalOpen(false);
  }}
  isBookmarked={
    caregivers.find((c) => c.id === selectedCaregiverId)?.isBookmarked ?? false
  }
  isLoggedInUser={isLoggedInUser}
/>

      {/* Schedule Booking Modal */}
      <ScheduleCare
        isOpen={isOpen}
        OnClose={() => setIsOpen(false)}
        selectedCaregivers={mappedCaregiversForSchedule}
      />

      {/* Redirect Login Modal */}
      <LoginRedirectModal open={openRedirect} handleOpen={handleOpenRedirect} />
    </div>
  );
};

export default CaregiversPage;
