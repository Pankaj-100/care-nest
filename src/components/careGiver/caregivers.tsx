"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { IoAlertCircleOutline as AlertIcon, IoFilter as FilterIcon } from "react-icons/io5";
import FilterSidebar from "@/components/careGiver/FilterSidebar";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import CaregiverModal from "@/components/careGiver/CaregiverModal";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import CustomSheet from "../common/CustomSheet";
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
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
}

const CaregiversPage = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("type") || "";
  const zipcode = (searchParams.get("zipcode") || "").trim();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [selectedCaregivers, setSelectedCaregivers] = useState<string[]>([]);
  const [filters, setFilters] = useState<CaregiverFilters>({});

  // Build query args only with provided filters
  const queryArgs = {
    zipcode,
    ...(serviceId ? { serviceId } : {}),
    ...(filters.gender ? { gender: filters.gender } : {}),
    ...(typeof filters.minPrice === "number" ? { minPrice: filters.minPrice } : {}),
    ...(typeof filters.maxPrice === "number" ? { maxPrice: filters.maxPrice } : {}),
    ...(Array.isArray(filters.languages) && filters.languages.length
      ? { languages: filters.languages.join(",") }
      : {}),
  };

  const { data, isLoading, error } = useSearchCaregiversQuery(queryArgs, {
    // Do not call the API without a zipcode
    skip: !zipcode,
  });

  useEffect(() => {
    if (data?.data?.caregivers) {
      const enriched = data.data.caregivers.map((c: Caregiver) => ({
        ...c,
        isBookmarked: false,
      }));
      setCaregivers(enriched);
    } else if (!zipcode) {
      setCaregivers([]);
    }
  }, [data, zipcode]);

  const handleBookmarkToggle = (id: string) => {
    setCaregivers(prev =>
      prev.map(cg => (cg.id === id ? { ...cg, isBookmarked: !cg.isBookmarked } : cg))
    );
  };

  const handleCardClick = (caregiverId: string) => {
    setSelectedCaregiverId(caregiverId);
    setIsModalOpen(true);
  };

  const handleFilterChange = useCallback((newFilters: CaregiverFilters) => {
    setFilters(newFilters);
  }, []);

  // Toggle selection (add/remove) inside modal action
  const handleAddCaregiver = (id: string) => {
    setSelectedCaregivers(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev
    );
    setIsModalOpen(false);
  };

  const mappedCaregiversForCards = caregivers.map(c => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar ?? "/care-giver/boy-icon.png",
    specialty: c.services.join(", "),
    experience: `${c.experience} Years`,
    price: c.price ? `$${c.price}/hr` : "N/A",
    isBookmarked: c.isBookmarked ?? false,
  }));

  const mappedCaregiversForSchedule = caregivers
    .filter(c => selectedCaregivers.includes(c.id))
    .map(c => ({
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
        <div className="lg:block hidden">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:hidden block">
          <CustomSheet
            open={openFilter}
            handleOpen={() => setOpenFilter(p => !p)}
            showCrossButton
            className="w-2/3 rounded-l-xl lg:hidden"
          >
            <FilterSidebar onFilterChange={handleFilterChange} />
          </CustomSheet>
        </div>

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
                onClick={() => setOpenFilter(p => !p)}
                className="flex items-center gap-1 lg:hidden"
              >
                <FilterIcon size={15} />
                Filter
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 mb-4">Error loading caregivers.</div>}

          <div className="sm:mt-0 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!isLoading && caregivers.length === 0 && <p>No caregivers found.</p>}
            {mappedCaregiversForCards.map(c => (
              <CaregiverCard
                key={c.id}
                name={c.name}
                avatar={c.avatar}
                specialty={c.specialty}
                experience={c.experience}
                price={c.price}
                isBookmarked={c.isBookmarked}
                isSelected={selectedCaregivers.includes(c.id)}
                onClick={() => handleCardClick(c.id)}
                onBookmarkToggle={() => handleBookmarkToggle(c.id)}
              />
            ))}
          </div>

          <div className="mt-10 lg:mb-0 mb-5 w-full text-center max-w-xl mx-auto">
            <button
              disabled={mappedCaregiversForSchedule.length < 1}
              onClick={() => setIsScheduleOpen(true)}
              className={`lg:w-[25rem] w-full px-4 py-2 text-[var(--navy)] text-lg rounded-full font-semibold transition ${
                mappedCaregiversForSchedule.length >= 1
                  ? "bg-[var(--yellow)] cursor-pointer"
                  : "bg-[#233D4D1A] hover:cursor-not-allowed"
              }`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      <CaregiverModal
        isOpen={isModalOpen}
        caregiverId={selectedCaregiverId}
        onClose={() => setIsModalOpen(false)}
        onAddCaregiver={handleAddCaregiver}
        isBookmarked={
          caregivers.find(c => c.id === selectedCaregiverId)?.isBookmarked ?? false
        }
      />

      <ScheduleCare
        isOpen={isScheduleOpen}
        OnClose={() => setIsScheduleOpen(false)}
        selectedCaregivers={mappedCaregiversForSchedule}
      />
    </div>
  );
};

export default CaregiversPage;
