"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation"; // Add usePathname
import { IoFilter as FilterIcon } from "react-icons/io5";
import FilterSidebar from "@/components/careGiver/FilterSidebar";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
import Image from "next/image";
import CaregiverModal from "@/components/careGiver/CaregiverModal";
import ScheduleCare from "@/components/careGiver/ScheduleCare";
import CustomSheet from "../common/CustomSheet";
import { 
  useSearchCaregiversQuery, 
  useBookmarkCaregiverMutation, 
  useTrackCaregiverViewMutation, // Add this
  SearchCaregiversParams 
} from "@/store/api/bookingApi";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import BookSuccessful from "@/components/careGiver/BookSuccessful";

interface Caregiver {
  id: string;
  name: string;
  avatar: string;
  price: number;
  experience: number;
  services: string[];
  gender?: string;
  isBookmarked?: boolean;
  verified?: boolean;
}

interface CaregiverFilters {
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
  prn?: boolean; // <-- Use boolean for PRN everywhere
  locationRange?: string;
  experienceMin?: number;
  experienceMax?: number;
}

const CaregiversPage = () => {
  const searchParams = useSearchParams();
  const zipcode = (searchParams.get("zipcode") || "").trim();
  const bookingSuccess = searchParams.get("bookingSuccess") === "true";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [selectedCaregivers, setSelectedCaregivers] = useState<Caregiver[]>([]);
  const [filters, setFilters] = useState<CaregiverFilters>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sidebarKey, setSidebarKey] = useState(0);

  const careseekerZipcode = useAppSelector(state => state.booking.careseekerZipcode);
  const serviceIds = useAppSelector(state => state.booking.serviceIds);
  const requiredBy = useAppSelector(state => state.booking.requiredBy); // Add this

  // Get authentication status
  const isAuthenticated = useAppSelector(state => !!state.auth.accessToken);

  // Build the search parameters including filters - properly typed
  const searchApiParams: SearchCaregiversParams = React.useMemo(() => {
    const baseParams: SearchCaregiversParams = {
      zipcode: careseekerZipcode && String(careseekerZipcode).trim() !== "" ? String(careseekerZipcode) : ""
    };

    // Add filter parameters - make sure gender is included
    if (filters.gender) {
      baseParams.gender = filters.gender;
    }
    if (filters.minPrice) baseParams.minPrice = filters.minPrice;
    if (filters.maxPrice) baseParams.maxPrice = filters.maxPrice;
    if (filters.locationRange) baseParams.locationRange = filters.locationRange;
    
    // UPDATED: Use experienceMin and experienceMax instead of experience
    if (filters.experienceMin !== undefined) baseParams.experienceMin = filters.experienceMin;
    if (filters.experienceMax !== undefined) baseParams.experienceMax = filters.experienceMax;
    
    // Convert arrays to comma-separated strings
    if (filters.languages && filters.languages.length > 0) {
      baseParams.languages = filters.languages.join(',');
    }
    if (filters.prn !== undefined) {
      baseParams.prn = filters.prn ? 'true' : 'false';
    }
    
    return baseParams;
  }, [careseekerZipcode, filters]); // Remove serviceIds from dependencies

  // API call with filters - this will refetch automatically when searchApiParams changes
  const { data, isLoading, error } = useSearchCaregiversQuery(
    searchApiParams,
    { 
      // Always fetch, even if zipcode is not set
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data?.data?.caregivers) {
      const enriched = data.data.caregivers.map((c: Caregiver) => ({
        ...c,
        isBookmarked: c.isBookmarked ?? false, // Use API value
      }));
      setCaregivers(enriched);
      console.log("Loaded caregivers:", enriched.length);
    } else if (!zipcode) {
      setCaregivers([]);
    }
  }, [data, zipcode]);

  const [bookmarkCaregiver] = useBookmarkCaregiverMutation();
  const [trackCaregiverView] = useTrackCaregiverViewMutation();

  const handleBookmarkToggle = async (id: string) => {
    try {
      await bookmarkCaregiver(id).unwrap();
      setCaregivers(prev =>
        prev.map(cg => (cg.id === id ? { ...cg, isBookmarked: !cg.isBookmarked } : cg))
      );
      const isNowBookmarked = caregivers.find(cg => cg.id === id)?.isBookmarked;
      toast.success(
        isNowBookmarked
          ? "Caregiver removed successfully!"
          : "Caregiver bookmarked successfully!"
      );
    } catch {
      toast.error("Login to bookmark caregiver.");
    }
  };

  const handleCardClick = async (caregiverId: string) => {
    setSelectedCaregiverId(caregiverId);
    setIsModalOpen(true);
    
    // Only track profile view if user is authenticated
    if (isAuthenticated) {
      try {
        await trackCaregiverView(caregiverId).unwrap();
        console.log(`Profile view tracked for caregiver: ${caregiverId}`);
      } catch (error) {
        console.error('Failed to track profile view:', error);
        // Don't show error to user - this is just analytics
      }
    } else {
      console.log('User not authenticated - skipping profile view tracking');
    }
  };

  // This is the key function - it updates filters which triggers API refetch
  const handleFilterChange = useCallback((newFilters: CaregiverFilters) => {
    console.log("Filter change received:", newFilters);
    setFilters(newFilters);
    // The useSearchCaregiversQuery will automatically refetch because searchApiParams changed
  }, []); // Empty dependency array since setFilters is stable

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({});
    setSidebarKey(prev => prev + 1); // Force remount
    toast.info("Filters cleared");
  };

  // Toggle selection (add/remove) inside modal action
  const handleAddCaregiver = (id: string) => {
    setSelectedCaregivers(prev => {
      // If caregiver is already selected, remove it
      if (prev.some(cg => cg.id === id)) {
        const updated = prev.filter(cg => cg.id !== id);
        localStorage.setItem('selectedCaregivers', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('caregiver-selection-changed'));
        return updated;
      }
      // Add the full caregiver object
      const caregiverObj = caregivers.find(cg => cg.id === id);
      if (caregiverObj) {
        const updated = [...prev, caregiverObj];
        localStorage.setItem('selectedCaregivers', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('caregiver-selection-changed'));
        return updated;
      }
      return prev;
    });
    setIsModalOpen(false);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedCaregivers');
      if (saved) {
        setSelectedCaregivers(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading selected caregivers:', error);
    }
  }, []);

  // Clear selected caregivers when leaving this page
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear selections when user navigates away or closes tab
      localStorage.removeItem('selectedCaregivers');
    };

    const handleVisibilityChange = () => {
      // Optional: Clear when user switches tabs/apps
      if (document.hidden) {
        localStorage.removeItem('selectedCaregivers');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Clear when component unmounts (navigation to other pages)
      localStorage.removeItem('selectedCaregivers');
      window.dispatchEvent(new CustomEvent('caregiver-selection-changed'));
    };
  }, []); // Empty dependency array - runs once on mount

  const mappedCaregiversForCards = caregivers.map(c => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar ?? "/care-giver/boy-icon.png",
    specialty: c.services.join(", "),
    experience: `${c.experience} Years`,
    price: c.price ? `$${c.price}/hr` : "N/A",
    isBookmarked: c.isBookmarked ?? false,
    verified: c.verified ?? false,
  }));

  // When passing data to ScheduleCare component, include Redux data
  const mappedCaregiversForSchedule = selectedCaregivers.map(c => ({
    id: c.id,
    name: c.name,
    avatar: c.avatar ?? "/care-giver/boy-icon.png",
    specialty: c.services.join(", "),
    experience: `${c.experience} Years`,
    price: c.price ? `$${c.price}/hr` : "N/A",
  }));

  useEffect(() => {
    if (bookingSuccess) {
      // Clear selected caregivers when coming from successful booking redirect
      setSelectedCaregivers([]);
      localStorage.removeItem('selectedCaregivers');
      window.dispatchEvent(new CustomEvent('caregiver-selection-changed'));
      
      setShowSuccessModal(true);
      console.log("Booking success from URL - cleared selected caregivers");
    }
  }, [bookingSuccess]);

  // Clear selected caregivers after successful booking
  const handleBookingSuccess = () => {
    // Clear the selected caregivers
    setSelectedCaregivers([]);
    
    // Clear from localStorage
    localStorage.removeItem('selectedCaregivers');
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('caregiver-selection-changed'));
    
    // Show success modal
    setShowSuccessModal(true);
    
    console.log("Booking successful - cleared selected caregivers");
  };

  return (
    <div className="min-h-screen md:min-h-fit lg:min-h-screen bg-[#F8F9FA] lg:py-10 mb-8 md:mb-2 lg:mb-8 lg:pt-28 px-3 sm:px-4 md:px-6 lg:px-30">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-8 items-start w-full">
        <div className="lg:block  hidden ">
          <FilterSidebar 
            key={sidebarKey}
            onFilterChange={handleFilterChange}
            initialFilters={{}} // Always empty unless restoring from saved state
            isLoading={isLoading}
          />
        </div>

        <div className="md:hidden block z-[9999]">
          <CustomSheet
            open={openFilter}
            handleOpen={() => setOpenFilter(p => !p)}
            showCrossButton
            className="w-2/3 md:w-1/2 lg:w-2/3 rounded-l-xl z-[9999]"
          >
            <FilterSidebar
              key={sidebarKey}
              onFilterChange={handleFilterChange}
              initialFilters={{}}
              isLoading={isLoading}
            />
          </CustomSheet>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex flex-col mb-4 text-sm gap-1">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <button
                onClick={() => setOpenFilter(p => !p)}
                className="lg:hidden self-start flex items-center gap-2 bg-[var(--yellow)] text-[var(--navy)] px-5 py-2.5 rounded-full shadow-md active:scale-[0.98]"
              >
                <FilterIcon size={18} />
                <span className="font-semibold">Filter</span>
              </button>
              <h2 className="text-md font-medium h-max text-gray-600">
                <span className="text-[var(--yellow)]">
                  {isLoading ? "Loading..." : caregivers.length + " Results"}
                </span>{" "}
                Found Based on Your Search
              </h2>
            </div>

            {/* Show active filters count - moved to left side under results */}
            {Object.keys(filters).some(key => {
              const value = filters[key as keyof CaregiverFilters];
              if (Array.isArray(value)) {
                return value.length > 0;
              }
              if (typeof value === 'boolean') {
                return value === true || value === false;
              }
              return value !== undefined && value !== null && value !== '';
            }) && (
              <div className="flex items-center gap-2 text-[16px] font-medium">
                <span className="text-gray-500 text-[18px] font-medium">
                  Filters active
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-red-500 hover:text-red-700 underline"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {error && <div className="text-red-500 mb-4">Error loading caregivers.</div>}

          <div className="sm:mt-0 mt-4 max-h-[800px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6 w-full">
            {!isLoading && caregivers.length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center py-8">
                <Image
                  src="/no-caregivers.png"
                  alt="No caregivers found"
                  width={120}
                  height={80}
                  className="mb-4"
                  priority
                />
                <p className="text-[var(--navy)] text-lg font-medium mt-2">No caregivers found. Please try searching again.</p>
              </div>
            )}
            {isLoading && (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                    {/* Avatar Skeleton */}
                    <div className="w-full h-40 bg-gray-300 rounded-xl mb-4"></div>
                    
                    {/* Content Skeleton */}
                    <div className="space-y-3">
                      {/* Name Skeleton */}
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      
                      {/* Specialty Skeleton */}
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      
                      {/* Experience & Price Skeleton */}
                      <div className="flex gap-2 mt-3">
                        <div className="h-8 bg-gray-300 rounded-full flex-1"></div>
                        <div className="h-8 bg-gray-300 rounded-full flex-1"></div>
                      </div>
                      
                      {/* Button Skeleton */}
                      <div className="h-10 bg-gray-300 rounded-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {mappedCaregiversForCards.map(c => (
              <CaregiverCard
                key={c.id}
                name={c.name}
                avatar={c.avatar}
                specialty={c.specialty}
                experience={c.experience}
                isBookmarked={c.isBookmarked}
                isSelected={selectedCaregivers.some(cg => cg.id === c.id)}
                isVerified={c.verified}
                onClick={() => handleCardClick(c.id)}
                onBookmarkToggle={() => handleBookmarkToggle(c.id)}
              />
            ))}
          </div>

          <div className="mt-10 md:mt-6 lg:mt-10 mb-0 md:mb-0 lg:mb-0 w-full text-center max-w-xl mx-auto">
            <button
              onClick={() => {
                if (mappedCaregiversForSchedule.length < 1) {
                  toast.error("Please select at least 1 caregiver to proceed with booking.");
                  return;
                }
                setIsScheduleOpen(true);
              }}
              className={`lg:w-[25rem]  w-full px-4 py-2 text-[var(--navy)] text-lg rounded-full font-semibold transition ${
                mappedCaregiversForSchedule.length >= 1
                  ? "bg-[var(--yellow)] cursor-pointer hover:bg-yellow-400"
                  : "bg-[#233D4D1A] hover:cursor-not-allowed"
              }`}
            >
              Proceed ({mappedCaregiversForSchedule.length})
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
        // Add this prop to pass the current selection state
        isSelected={selectedCaregiverId ? selectedCaregivers.some(cg => cg.id === selectedCaregiverId) : false}
      />

      <ScheduleCare
        isOpen={isScheduleOpen}
        OnClose={() => setIsScheduleOpen(false)}
        selectedCaregivers={mappedCaregiversForSchedule}
        onBookingSuccess={handleBookingSuccess} // Use the updated handler
        // Pass Redux data to ScheduleCare
        serviceIds={serviceIds}
        requiredBy={requiredBy}
        zipcode={careseekerZipcode ?? undefined}
      />

      {showSuccessModal && (
        <BookSuccessful
          isModalOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

    </div>
  );
};

export default CaregiversPage;
