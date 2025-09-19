// components/FilterSidebar.tsx
import React, { useState } from "react";

const GENDERS = ["male", "female", "other"];
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
  minExperience?: number; // Add this
  maxExperience?: number; // Add this
}

const FilterSidebar = ({ onFilterChange }: { onFilterChange: (filters: CaregiverFilters) => void }) => {
  const [gender, setGender] = useState<string>("");
  const [price, setPrice] = useState<{ min: number; max: number } | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [prn, setPrn] = useState<string[]>([]);
  const [locationMiles, setLocationMiles] = useState<number | null>(null);
  const [experience, setExperience] = useState<{ min: number; max: number } | null>(null);

  // Call this whenever a filter changes
  React.useEffect(() => {
    onFilterChange({
      gender,
      minPrice: price?.min,
      maxPrice: price?.max,
      languages,
      prn,
      // locationMiles,
      minExperience: experience?.min,
      maxExperience: experience?.max,
    });
  }, [gender, price, languages, prn, locationMiles, experience, onFilterChange]);

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
                onChange={() => setGender(g)}
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
              onChange={() => setPrice({ min: range.min, max: range.max })}
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
              type="checkbox"
              checked={locationMiles === loc.value}
              onChange={() => setLocationMiles(loc.value)}
              className="mr-2 accent-[#233D4D]"
            />
            {loc.label}
          </label>
        ))}
      </div>
      {/* PRN (Pro rata) */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">PRN (Pro re nata)</h4>
        <label className="text-sm text-[#98A2B3] font-medium">
          <input
            type="checkbox"
            className="mr-2 accent-[#233D4D]"
            checked={prn.includes("as_needed")}
            onChange={() =>
              setPrn((prev) =>
                prev.includes("as_needed")
                  ? prev.filter((v) => v !== "as_needed")
                  : [...prev, "as_needed"]
              )
            }
          />
          As Needed
        </label>
        <br />
        <label className="text-sm text-[#98A2B3] font-medium">
          <input
            type="checkbox"
            className="mr-2 accent-[#233D4D]"
            checked={prn.includes("fixed_schedule")}
            onChange={() =>
              setPrn((prev) =>
                prev.includes("fixed_schedule")
                  ? prev.filter((v) => v !== "fixed_schedule")
                  : [...prev, "fixed_schedule"]
              )
            }
          />
          Fixed Schedule
        </label>
      </div>
      {/* Experience */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Experience</h4>
        {EXPERIENCES.map((exp, idx) => (
          <label key={idx} className="block text-sm text-[#98A2B3] font-medium">
            <input
              type="checkbox"
              checked={experience?.min === exp.min && experience?.max === exp.max}
              onChange={() => setExperience(exp)}
              className="mr-2 accent-[#233D4D]"
            />
            {exp.label}
          </label>
        ))}
      </div>
      {/* Languages */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Language</h4>
        {LANGUAGES.map((lang) => (
          <label key={lang} className="block text-[#98A2B3] font-medium">
            <input
              type="checkbox"
              checked={languages.includes(lang)}
              onChange={() =>
                setLanguages((prev) =>
                  prev.includes(lang)
                    ? prev.filter((l) => l !== lang)
                    : [...prev, lang]
                )
              }
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
