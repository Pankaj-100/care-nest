// components/FilterSidebar.tsx
import React, { useState, useEffect } from "react";

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

interface CaregiverFilters {
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
  prn?: string[];
  locationMiles?: number;
  experience?: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: CaregiverFilters) => void;
  initialFilters?: CaregiverFilters;
}

const FilterSidebar = ({ onFilterChange, initialFilters = {} }: FilterSidebarProps) => {
  const [gender, setGender] = useState<string>("");
  const [price, setPrice] = useState<{ min: number; max: number } | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [prn, setPrn] = useState<string[]>([]);
  const [locationMiles, setLocationMiles] = useState<number | null>(null);
  const [experience, setExperience] = useState<{ min: number; max: number } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Reset filters when initialFilters changes (used for "Clear All")
  useEffect(() => {
    setGender(initialFilters.gender || "");
    
    // Reset price
    if (initialFilters.minPrice && initialFilters.maxPrice) {
      setPrice({ min: initialFilters.minPrice, max: initialFilters.maxPrice });
    } else {
      setPrice(null);
    }
    
    setLanguages(initialFilters.languages || []);
    setPrn(initialFilters.prn || []);
    setLocationMiles(initialFilters.locationMiles || null);
    
    // Reset experience
    if (initialFilters.experience) {
      const [min, max] = initialFilters.experience.split('-').map(Number);
      setExperience({ min, max });
    } else {
      setExperience(null);
    }
    
    setIsInitialized(true);
  }, [initialFilters]);

  // Helper function to build current filter object
  const buildCurrentFilters = (overrides: Partial<{
    gender: string;
    price: { min: number; max: number } | null;
    languages: string[];
    prn: string[];
    locationMiles: number | null;
    experience: { min: number; max: number } | null;
  }> = {}) => {
    const currentGender = overrides.gender !== undefined ? overrides.gender : gender;
    const currentPrice = overrides.price !== undefined ? overrides.price : price;
    const currentLanguages = overrides.languages !== undefined ? overrides.languages : languages;
    const currentPrn = overrides.prn !== undefined ? overrides.prn : prn;
    const currentLocationMiles = overrides.locationMiles !== undefined ? overrides.locationMiles : locationMiles;
    const currentExperience = overrides.experience !== undefined ? overrides.experience : experience;

    return {
      gender: currentGender || undefined,
      minPrice: currentPrice?.min,
      maxPrice: currentPrice?.max,
      languages: currentLanguages.length > 0 ? currentLanguages : undefined,
      prn: currentPrn.length > 0 ? currentPrn : undefined,
      locationMiles: currentLocationMiles || undefined,
      experience: currentExperience ? `${currentExperience.min}-${currentExperience.max}` : undefined,
    };
  };

  // Handle gender selection/deselection
  const handleGenderChange = (selectedGender: string) => {
    const newGender = gender === selectedGender ? "" : selectedGender;
    setGender(newGender);
    

    
    // Call filter change with updated value
    if (isInitialized) {
      const newFilters = buildCurrentFilters({ gender: newGender });
      onFilterChange(newFilters);
    }
  };

  // Handle price selection/deselection
  const handlePriceChange = (range: { min: number; max: number }) => {
    const newPrice = price?.min === range.min && price?.max === range.max ? null : range;
    setPrice(newPrice);
    
    // Call filter change with updated value
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ price: newPrice }));
    }
  };

  // Handle location selection/deselection
  const handleLocationChange = (value: number) => {
    const newLocationMiles = locationMiles === value ? null : value;
    setLocationMiles(newLocationMiles);
    
    // Call filter change with updated value
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ locationMiles: newLocationMiles }));
    }
  };

  // Handle experience selection/deselection
  const handleExperienceChange = (exp: { min: number; max: number }) => {
    const newExperience = experience?.min === exp.min && experience?.max === exp.max ? null : exp;
    setExperience(newExperience);
    
    // Call filter change with updated value
    if (isInitialized) {
      onFilterChange(buildCurrentFilters({ experience: newExperience }));
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
    <aside className="w-full md:w-[250px] border rounded-xl p-4 space-y-4">
      <h2 className="text-md font-semibold mb-4 text-[var(--navy)]">Filters & Sort</h2>
      
      {/* Gender */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Gender</h4>
        <div className="space-y-1 text-[#98A2B3]">
          {GENDERS.map((g) => (
            <label key={g} className="block text-sm text-[var(--coolgray)] font-medium">
              <input
                type="radio"
                name="gender"
                checked={gender === g}
                onChange={() => handleGenderChange(g)}
                className="mr-2 accent-[#233D4D]"
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Price (Hourly Rate)</h4>
        {PRICES.map((range, idx) => (
          <label key={idx} className="block text-sm text-[#98A2B3] font-medium">
            <input
              type="radio"
              name="price"
              checked={price?.min === range.min && price?.max === range.max}
              onChange={() => handlePriceChange(range)}
              className="mr-2 accent-[#233D4D]"
            />
            {range.label}
          </label>
        ))}
      </div>

      {/* Location */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Location</h4>
        {LOCATIONS.map((loc) => (
          <label key={loc.value} className="block text-sm text-[#98A2B3] font-medium">
            <input
              type="radio"
              name="location"
              checked={locationMiles === loc.value}
              onChange={() => handleLocationChange(loc.value)}
              className="mr-2 accent-[#233D4D]"
            />
            {loc.label}
          </label>
        ))}
      </div>

      {/* PRN (Pro rata) */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">PRN (Pro re nata)</h4>
        <label className="block text-sm text-[#98A2B3] font-medium">
          <input
            type="checkbox"
            className="mr-2 accent-[#233D4D]"
            checked={prn.includes("as_needed")}
            onChange={() => handlePrnChange("as_needed")}
          />
          As Needed
        </label>
        <label className="block text-sm text-[#98A2B3] font-medium">
          <input
            type="checkbox"
            className="mr-2 accent-[#233D4D]"
            checked={prn.includes("fixed_schedule")}
            onChange={() => handlePrnChange("fixed_schedule")}
          />
          Fixed Schedule
        </label>
      </div>
      
      {/* Experience */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Experience</h4>
        <div className="space-y-1"> {/* Add this wrapper div */}
          {EXPERIENCES.map((exp, idx) => (
            <label key={idx} className="block text-sm text-[#98A2B3] font-medium">
              <input
                type="radio"
                name="experience"
                checked={experience?.min === exp.min && experience?.max === exp.max}
                onChange={() => handleExperienceChange(exp)}
                className="mr-2 accent-[#233D4D]"
              />
              {exp.label}
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Language</h4>
        {LANGUAGES.map((lang) => (
          <label key={lang} className="block text-sm text-[#98A2B3] font-medium">
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
