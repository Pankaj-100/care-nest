"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation"; // Add usePathname
import { IoFilter as FilterIcon } from "react-icons/io5";
import FilterSidebar from "@/components/careGiver/FilterSidebar";
import CaregiverCard from "@/components/careGiver/CaregiverCard";
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
      zipcode: careseekerZipcode ? String(careseekerZipcode) : "",
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
      skip: !careseekerZipcode,
      // Force refetch when parameters change
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data?.data?.caregivers) {
      const enriched = data.data.caregivers.map((c: Caregiver) => ({
        ...c,
        isBookmarked: false,
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
    <div className="min-h-screen bg-[#F8F9FA] lg:py-10 mb-8 lg:pt-28 px-4 md:px-30">
      <div className="flex flex-row gap-8 items-start">
        <div className="lg:block  hidden ">
          <FilterSidebar 
            key={sidebarKey}
            onFilterChange={handleFilterChange}
            initialFilters={{}} // Always empty unless restoring from saved state
          />
        </div>

        <div className="lg:hidden block">
          <CustomSheet
            open={openFilter}
            handleOpen={() => setOpenFilter(p => !p)}
            showCrossButton
            className="w-2/3 rounded-l-xl lg:hidden"
          >
            <FilterSidebar
              key={sidebarKey}
              onFilterChange={handleFilterChange}
              initialFilters={{}}
            />
          </CustomSheet>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-4 text-sm gap-y-4">
            <div className="flex gap-4 items-center">
              <h2 className="text-md font-medium h-max text-gray-600">
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

            {/* Show active filters count */}
            {Object.keys(filters).some(key => {
              const value = filters[key as keyof CaregiverFilters];
              return value && (Array.isArray(value) ? value.length > 0 : true);
            }) && (
              <div className="flex items-center gap-2 text-medium">
                <span className="text-gray-500">
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

          <div className="sm:mt-0 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!isLoading && caregivers.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500">No caregivers found matching your criteria.</p>
              </div>
            )}
            {isLoading && (
              <div className="col-span-2 text-center py-8">
                <p>Searching caregivers...</p>
              </div>
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
                onClick={() => handleCardClick(c.id)}
                onBookmarkToggle={() => handleBookmarkToggle(c.id)}
              />
            ))}
          </div>

          <div className="mt-10 lg:mb-0 mb-5 w-full text-center max-w-xl mx-auto">
            <button
              onClick={() => {
                if (mappedCaregiversForSchedule.length < 3) {
                  toast.error("Please select at least 3 caregivers to proceed with booking.");
                  return;
                }
                setIsScheduleOpen(true);
              }}
              className={`lg:w-[25rem] w-full px-4 py-2 text-[var(--navy)] text-lg rounded-full font-semibold transition ${
                mappedCaregiversForSchedule.length >= 1
                  ? "bg-[var(--yellow)] cursor-pointer hover:bg-yellow-400"
                  : "bg-[#233D4D1A] hover:cursor-not-allowed"
              }`}
            >
              Proceed ({mappedCaregiversForSchedule.length}/3)
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
