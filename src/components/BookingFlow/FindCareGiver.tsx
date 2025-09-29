"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { YellowButton } from "../common/CustomButton";
import { useAppDispatch } from "@/store/hooks";
import { setServiceIds } from "@/store/slices/bookingSlice";
import { useGetServiceNamesQuery, useGetServiceHighlightsQuery } from "@/store/api/bookingApi";

const cardBase =
  "relative flex flex-col items-center text-center gap-4 bg-white rounded-xl shadow-sm p-8 w-full max-w-[340px] border transition hover:shadow-md";

// Service image mapping based on service names from API
const serviceImages: Record<string, string> = {
  "Personal Care": "/personal-care2.png",
  "Personal care": "/personal-care2.png", // Handle both cases
  "Companionship": "/companionship.png",
  "Transportation": "/transportation.png",
  "Home Sitter": "/home-sitter.png",
  "Housekeeping": "/house-keeping.png",
  "Specialized Care": "/specialized-care.png",
  "Specialized care": "/specialized-care.png", // Handle both cases
  "Sitter Services": "/home-sitter.png",
  "Home Maker": "/house-keeping.png",
  // Add a default fallback image
  "default": "/house-keeping.png"
};

const FindCareGiver: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Fetch both service names and highlights from backend
  const { data: namesData, isLoading: namesLoading, error: namesError } = useGetServiceNamesQuery();
  const { data: highlightsData, isLoading: highlightsLoading, error: highlightsError } = useGetServiceHighlightsQuery();

  console.log("FindCareGiver mounted");
  console.log("Service Names API Data:", namesData);
  console.log("Service Highlights API Data:", highlightsData);

  // Merge both APIs data
  const mergedServices = useMemo(() => {
    if (!namesData?.data?.services || !highlightsData?.data?.services) {
      return [];
    }

    // Create a map of highlights by service ID for quick lookup
    const highlightsMap = new Map();
    highlightsData.data.services.forEach(service => {
      highlightsMap.set(service.id, service.highlight);
    });

    // Merge names with highlights
    return namesData.data.services.map(nameService => ({
      id: nameService.id,
      name: nameService.name,
      highlight: highlightsMap.get(nameService.id) || "Professional care service"
    }));
  }, [namesData, highlightsData]);

  console.log("Merged Services:", mergedServices);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleNext() {
    if (!selected.length) return;
    console.log("Selected service IDs for booking:", selected);
    dispatch(setServiceIds(selected));
    router.push("/need-service");
  }

  // Function to get image based on service name
  const getServiceImage = (serviceName: string): string => {
    if (!serviceName || serviceName.trim() === "") {
      return serviceImages.default || "/house-keeping.png";
    }
    
    // Try exact match first
    let image = serviceImages[serviceName];
    
    // If not found, try case-insensitive search
    if (!image) {
      const normalizedName = serviceName.toLowerCase();
      const matchingKey = Object.keys(serviceImages).find(key => 
        key.toLowerCase() === normalizedName
      );
      if (matchingKey) {
        image = serviceImages[matchingKey];
      }
    }
    
    // If still not found or empty, use default
    if (!image || image.trim() === "") {
      return serviceImages.default || "/house-keeping.png";
    }
    
    return image;
  };

  // Loading state - show loading if either API is loading
  const isLoading = namesLoading || highlightsLoading;
  
  // Error state - show error if either API fails
  const hasError = namesError || highlightsError;

  return (
    <main className="w-full px-4 py-14 md:py-16 bg-[#F7F7F3]">
      <h1 className="text-center text-[22px] md:text-[30px] font-semibold text-[var(--navy)] mb-12 leading-snug">
        Pick the right service for your home care needs.
      </h1>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--navy)]"></div>
          <p className="mt-2 text-[var(--navy)]">Loading services...</p>
        </div>
      ) : hasError ? (
        <div className="text-center py-10 text-red-500">
          <p>Failed to load services.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 md:gap-x-10 md:gap-y-12 md:grid-cols-3 lg:grid-cols-3 place-items-start">
          {mergedServices.map((service) => {
            // Add validation for service data
            if (!service || !service.id || !service.name) {
              console.warn("Invalid service data:", service);
              return null;
            }

            const active = selected.includes(service.id);
            const imageUrl = getServiceImage(service.name);
            const highlight = service.highlight || "Professional care service";
            
            console.log("Service:", service.name, "Image:", imageUrl, "Highlight:", highlight);
            
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggle(service.id)}
                className={`${cardBase} ${
                  active
                    ? "border-[var(--navy)]"
                    : "border-transparent hover:border-gray-200"
                }`}
                aria-pressed={active}
              >
                <div className="h-28 flex items-center">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.name || "Service"}
                      width={100}
                      height={100}
                      className="w-auto h-auto max-h-24"
                      priority
                      onError={(e) => {
                        console.error("Image failed to load:", imageUrl);
                        // Set fallback image on error
                        const target = e.target as HTMLImageElement;
                        target.src = serviceImages.default || "/house-keeping.png";
                      }}
                    />
                  ) : (
                    // Fallback div if no image URL
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <h2 className="font-semibold text-sm md:text-base text-[#233D4D]">
                  {service.name || "Unknown Service"}
                </h2>
                {/* Use highlight from merged data (highlights API) */}
                <p className="text-[11px] leading-relaxed whitespace-pre-line text-[#98A2B3] max-w-[270px] min-h-[3rem]">
                  {highlight}
                </p>
                {active && (
                  <span
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--navy)] text-white flex items-center justify-center text-xs"
                    aria-label="Selected"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 10.5l3.5 3L15 6.5"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          }).filter(Boolean)}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <YellowButton
          onClick={handleNext}
          className={`px-24 py-6 text-md font-medium rounded-full transition-opacity ${
            !selected.length
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "hover:opacity-90"
          }`}
        >
          Next
        </YellowButton>
      </div>
    </main>
  );
};

export default FindCareGiver;