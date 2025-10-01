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
  prn?: boolean; // Changed to boolean
  locationRange?: string; // Changed to string
  experienceMin?: number;
  experienceMax?: number;
}

interface FilterSidebarProps {
  onFilterChange: (filters: CaregiverFilters) => void;
  initialFilters?: CaregiverFilters;
}

const FilterSidebar = ({ onFilterChange, initialFilters = {} }: FilterSidebarProps) => {
  // Update state to handle single selections (not arrays)
  const [gender, setGender] = useState<string>(""); // Single selection
  const [price, setPrice] = useState<{ min: number; max: number } | null>(null); // Single selection
  const [languages, setLanguages] = useState<string[]>([]); // Keep multiple for languages
  const [locationRange, setLocationRange] = useState<string>(""); // Use string for location
  const [prn, setPrn] = useState<boolean | null>(null); // Use boolean for PRN
  const [experience, setExperience] = useState<{ min: number; max: number } | null>(null); // Single selection
  const [isInitialized, setIsInitialized] = useState(false);

  // Reset filters when initialFilters changes
  useEffect(() => {
    setGender(initialFilters.gender || "");
    if (initialFilters.minPrice !== undefined && initialFilters.maxPrice !== undefined) {
      setPrice({ min: initialFilters.minPrice, max: initialFilters.maxPrice });
    } else {
      setPrice(null);
    }
    setLanguages(initialFilters.languages || []);
    setPrn(initialFilters.prn === true ? true : initialFilters.prn === false ? false : null); // Convert to boolean
    setLocationRange(initialFilters.locationRange || "");
    if (initialFilters.experienceMin !== undefined && initialFilters.experienceMax !== undefined) {
      setExperience({ min: initialFilters.experienceMin, max: initialFilters.experienceMax });
    } else {
      setExperience(null);
    }
    setIsInitialized(true);
    // Only run once on mount!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updated helper function to build current filter object
  const buildCurrentFilters = () => {
    const filters: CaregiverFilters = {};

    if (gender) filters.gender = gender;
    if (price) {
      filters.minPrice = price.min;
      filters.maxPrice = price.max;
    }
    if (languages.length > 0) filters.languages = languages;
    if (prn !== null) filters.prn = prn; // boolean
    if (locationRange) filters.locationRange = locationRange; // string
    if (experience) {
      filters.experienceMin = experience.min;
      filters.experienceMax = experience.max;
    }

    return filters;
  };

  // Handle gender radio button changes (single selection)
  const handleGenderChange = (selectedGender: string) => {
    setGender(gender === selectedGender ? "" : selectedGender);
  };

  // Handle price radio button changes (single selection)
  const handlePriceChange = (range: { min: number; max: number }) => {
    setPrice(price && price.min === range.min && price.max === range.max ? null : range);
  };

  // Update location handler
  const handleLocationChange = (label: string) => {
    setLocationRange(locationRange === label ? "" : label);
  };

  // Update PRN handler
  const handlePrnChange = (value: boolean) => {
    setPrn(prn === value ? null : value);
  };

  // Handle experience radio button changes (single selection)
  const handleExperienceChange = (exp: { min: number; max: number }) => {
    setExperience(experience && experience.min === exp.min && experience.max === exp.max ? null : exp);
  };

  // Handle language checkbox changes (multiple selection)
  const handleLanguageChange = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  // Only call onFilterChange here!
  useEffect(() => {
    if (isInitialized) {
      onFilterChange(buildCurrentFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, price, languages, prn, locationRange, experience, isInitialized]);

  return (
    <aside className={`w-full md:w-[250px] border rounded-xl p-4 space-y-4 ${urbanist.className}`}>
      <h2 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Filters & Sort</h2>
      
      {/* Gender - Changed to radio buttons */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Gender</h4>
        <div className="space-y-1 text-[#767e8a]">
          {GENDERS.map((g) => (
            <label key={g} className={`block text-sm text-[var(--coolgray)] font-medium ${urbanist.className}`}>
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

      {/* Price - Changed to radio buttons */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Price (Hourly Rate)</h4>
        {PRICES.map((range, idx) => (
          <label key={idx} className={`block text-sm text-[#767e8a] font-medium ${urbanist.className}`}>
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

      {/* Location - Changed to radio buttons */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Location</h4>
        {LOCATIONS.map((loc) => (
          <label key={loc.label} className={`block text-sm text-[#767e8a] font-medium ${urbanist.className}`}>
            <input
              type="radio"
              name="location"
              checked={locationRange === loc.label}
              onChange={() => handleLocationChange(loc.label)}
              className="mr-2 accent-[#233D4D]"
            />
            {loc.label}
          </label>
        ))}
      </div>

      {/* PRN - Changed to radio buttons */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>PRN (Pro re nata)</h4>
        <label className={`block text-sm text-[#767e8a] font-medium ${urbanist.className}`}>
          <input
            type="radio"
            name="prn"
            className="mr-2 accent-[#233D4D]"
            checked={prn === true}
            onChange={() => handlePrnChange(true)}
          />
          As Needed
        </label>
        <label className={`block text-sm text-[#767e8a] font-medium ${urbanist.className}`}>
          <input
            type="radio"
            name="prn"
            className="mr-2 accent-[#233D4D]"
            checked={prn === false}
            onChange={() => handlePrnChange(false)}
          />
          Fixed Schedule
        </label>
      </div>
      
      {/* Experience - Changed to radio buttons */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Experience</h4>
        <div className="space-y-1">
          {EXPERIENCES.map((exp, idx) => (
            <label key={idx} className={`block text-sm text-[#767e8a] font-medium ${urbanist.className}`}>
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

      {/* Languages - Keep as checkboxes for multiple selection */}
      <div>
        <h4 className={`text-md font-semibold mb-4 text-[var(--navy)] ${urbanist.className}`}>Language</h4>
        {LANGUAGES.map((lang) => (
          <label key={lang} className={`block text-sm text-[#767e8a] font-medium ${urbanist.className}`}>
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
