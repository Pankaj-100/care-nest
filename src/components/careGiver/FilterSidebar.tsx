// components/FilterSidebar.tsx
import React, { useState, useEffect } from "react";
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({ 
  subsets: ['latin'],
  variable: '--font-urbanist',
})

const GENDERS = ["Male", "Female", "Other"];
const PRICES = [
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "$300 - $400", min: 300, max: 400 },
  { label: "$400- $500 ", min: 400, max: 700 },
];
const LANGUAGES = ["English", "Spanish","French","Italian","Vietnamese","Urdu"];
const LOCATIONS = [
  { label: "Within 2 miles from my current location", value: 2 },
  { label: "Within 10 miles", value: 10 },
  { label: "Within 15 miles", value: 15 },
  { label: "Within 20 miles", value: 20 },
  { label: "Within 30 miles", value: 30 },
];
const EXPERIENCES = [
  { label: "0-1 years", min: 0, max: 1 },
  { label: "2-5 years", min: 2, max: 5 },
  { label: "6-10 years", min: 6, max: 10 },
  { label: "10+ years", min: 10, max: 99 },
];

// Keep the original CaregiverFilters interface
interface CaregiverFilters {
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
  prn?: string[];
  locationMiles?: number;
  experienceMin?: number;
  experienceMax?: number;
}

interface FilterSidebarProps {
  onFilterChange: (filters: CaregiverFilters) => void;
  initialFilters?: CaregiverFilters;
}

const FilterSidebar = ({ onFilterChange, initialFilters = {} }: FilterSidebarProps) => {
  // Update state to handle arrays for previously single-select filters
  const [genders, setGenders] = useState<string[]>([]); // Changed from single string
  const [prices, setPrices] = useState<{ min: number; max: number }[]>([]); // Changed from single object
  const [languages, setLanguages] = useState<string[]>([]);
  const [prn, setPrn] = useState<string[]>([]);
  const [locationMiles, setLocationMiles] = useState<number[]>([]); // Changed from single number
  const [experiences, setExperiences] = useState<{ min: number; max: number }[]>([]); // Changed from single object
  const [isInitialized, setIsInitialized] = useState(false);

  // Reset filters when initialFilters changes
  useEffect(() => {
    // Convert single values to arrays for internal state
    setGenders(initialFilters.gender ? [initialFilters.gender] : []);
    
    // Convert price range to array
    if (initialFilters.minPrice !== undefined && initialFilters.maxPrice !== undefined) {
      setPrices([{ min: initialFilters.minPrice, max: initialFilters.maxPrice }]);
    } else {
      setPrices([]);
    }
    
    setLanguages(initialFilters.languages || []);
    setPrn(initialFilters.prn || []);
    
    // Convert single location to array
    setLocationMiles(initialFilters.locationMiles ? [initialFilters.locationMiles] : []);
    
    // Convert experience range to array
    if (initialFilters.experienceMin !== undefined && initialFilters.experienceMax !== undefined) {
      setExperiences([{ min: initialFilters.experienceMin, max: initialFilters.experienceMax }]);
    } else {
      setExperiences([]);
    }
    
    setIsInitialized(true);
  }, [initialFilters]);

  // Updated helper function to build current filter object
  const buildCurrentFilters = (overrides: Partial<{
    genders: string[];
    prices: { min: number; max: number }[];
    languages: string[];
    prn: string[];
    locationMiles: number[];
    experiences: { min: number; max: number }[];
  }> = {}) => {
    const currentGenders = overrides.genders !== undefined ? overrides.genders : genders;
    const currentPrices = overrides.prices !== undefined ? overrides.prices : prices;
    const currentLanguages = overrides.languages !== undefined ? overrides.languages : languages;
    const currentPrn = overrides.prn !== undefined ? overrides.prn : prn;
    const currentLocationMiles = overrides.locationMiles !== undefined ? overrides.locationMiles : locationMiles;
    const currentExperiences = overrides.experiences !== undefined ? overrides.experiences : experiences;

    return {
      // Send first gender if any selected (for backward compatibility)
      gender: currentGenders.length > 0 ? currentGenders[0] : undefined,
      
      // Send price range (you might want to send min of all mins and max of all maxes)
      minPrice: currentPrices.length > 0 ? Math.min(...currentPrices.map(p => p.min)) : undefined,
      maxPrice: currentPrices.length > 0 ? Math.max(...currentPrices.map(p => p.max)) : undefined,
      
      languages: currentLanguages.length > 0 ? currentLanguages : undefined,
      prn: currentPrn.length > 0 ? currentPrn : undefined,
      
      // Send first location if any selected (or you could modify API to accept multiple)
      locationMiles: currentLocationMiles.length > 0 ? currentLocationMiles[0] : undefined,
      
      // Send experience range (min of all mins and max of all maxes)
      experienceMin: currentExperiences.length > 0 ? Math.min(...currentExperiences.map(e => e.min)) : undefined,
      experienceMax: currentExperiences.length > 0 ? Math.max(...currentExperiences.map(e => e.max)) : undefined,
    };
  };

  // Handle gender checkbox changes
  const handleGenderChange = (selectedGender: string) => {
    const newGenders = genders.includes(selectedGender)
      ? genders.filter(g => g !== selectedGender)
      : [...genders, selectedGender];
    setGenders(newGenders);
    
    if (isInitialized) {
      const newFilters = buildCurrentFilters({ genders: newGenders });
      onFilterChange(newFilters);
    }
  };

  // Handle price checkbox changes
  const handlePriceChange = (range: { min: number; max: number }) => {
    const newPrices = prices.some(p => p.min === range.min && p.max === range.max)
      ? prices.filter(p => !(p.min === range.min && p.max === range.max))
      : [...prices, range];
    setPrices(newPrices);
    
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ prices: newPrices }));
    }
  };

  // Handle location checkbox changes
  const handleLocationChange = (value: number) => {
    const newLocationMiles = locationMiles.includes(value)
      ? locationMiles.filter(l => l !== value)
      : [...locationMiles, value];
    setLocationMiles(newLocationMiles);
    
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ locationMiles: newLocationMiles }));
    }
  };

  // Handle experience checkbox changes
  const handleExperienceChange = (exp: { min: number; max: number }) => {
    const newExperiences = experiences.some(e => e.min === exp.min && e.max === exp.max)
      ? experiences.filter(e => !(e.min === exp.min && e.max === exp.max))
      : [...experiences, exp];
    setExperiences(newExperiences);
    
    if (isInitialized) {
      const newFilters = buildCurrentFilters({ experiences: newExperiences });
      console.log("Experience filter changed:", newFilters);
      onFilterChange(newFilters);
    }
  };

  // Handle PRN changes
  const handlePrnChange = (value: string) => {
    const newPrn = prn.includes(value)
      ? prn.filter((v) => v !== value)
      : [...prn, value];
    setPrn(newPrn);
    
    // Call filter change with updated value
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ prn: newPrn }));
    }
  };

  // Handle language changes
  const handleLanguageChange = (lang: string) => {
    const newLanguages = languages.includes(lang)
      ? languages.filter((l) => l !== lang)
      : [...languages, lang];
    setLanguages(newLanguages);
    
    // Call filter change with updated value
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ languages: newLanguages }));
    }
  };

  return (
    <aside className={`w-full md:w-[250px] border rounded-xl p-4 space-y-4 ${urbanist.className}`}>
      <h2 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Filters & Sort</h2>
      
      {/* Gender - Changed to checkboxes */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Gender</h4>
        <div className="space-y-1 text-[#98A2B3]">
          {GENDERS.map((g) => (
            <label key={g} className={`block text-sm text-[var(--coolgray)] font-medium ${urbanist.className}`}>
              <input
                type="checkbox"
                checked={genders.includes(g)}
                onChange={() => handleGenderChange(g)}
                className="mr-2 accent-[#233D4D]"
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Price - Changed to checkboxes */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Price (Hourly Rate)</h4>
        {PRICES.map((range, idx) => (
          <label key={idx} className={`block text-sm text-[#98A2B3] font-medium ${urbanist.className}`}>
            <input
              type="checkbox"
              checked={prices.some(p => p.min === range.min && p.max === range.max)}
              onChange={() => handlePriceChange(range)}
              className="mr-2 accent-[#233D4D]"
            />
            {range.label}
          </label>
        ))}
      </div>

      {/* Location - Changed to checkboxes */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Location</h4>
        {LOCATIONS.map((loc) => (
          <label key={loc.value} className={`block text-sm text-[#98A2B3] font-medium ${urbanist.className}`}>
            <input
              type="checkbox"
              checked={locationMiles.includes(loc.value)}
              onChange={() => handleLocationChange(loc.value)}
              className="mr-2 accent-[#233D4D]"
            />
            {loc.label}
          </label>
        ))}
      </div>

      {/* PRN - Remains checkboxes */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>PRN (Pro re nata)</h4>
        <label className={`block text-sm text-[#98A2B3] font-medium ${urbanist.className}`}>
          <input
            type="checkbox"
            className="mr-2 accent-[#233D4D]"
            checked={prn.includes("as_needed")}
            onChange={() => handlePrnChange("as_needed")}
          />
          As Needed
        </label>
        <label className={`block text-sm text-[#98A2B3] font-medium ${urbanist.className}`}>
          <input
            type="checkbox"
            className="mr-2 accent-[#233D4D]"
            checked={prn.includes("fixed_schedule")}
            onChange={() => handlePrnChange("fixed_schedule")}
          />
          Fixed Schedule
        </label>
      </div>
      
      {/* Experience - Changed to checkboxes */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Experience</h4>
        <div className="space-y-1">
          {EXPERIENCES.map((exp, idx) => (
            <label key={idx} className={`block text-sm text-[#98A2B3] font-medium ${urbanist.className}`}>
              <input
                type="checkbox"
                checked={experiences.some(e => e.min === exp.min && e.max === exp.max)}
                onChange={() => handleExperienceChange(exp)}
                className="mr-2 accent-[#233D4D]"
              />
              {exp.label}
            </label>
          ))}
        </div>
      </div>

      {/* Languages - Remains checkboxes */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Language</h4>
        {LANGUAGES.map((lang) => (
          <label key={lang} className={`block text-sm text-[#98A2B3] font-medium ${urbanist.className}`}>
            <input
              type="checkbox"
              checked={languages.includes(lang)}
              onChange={() => handleLanguageChange(lang)}
              className="mr-2 accent-[#233D4D]"
            />
            {lang}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
