// components/FilterSidebar.tsx
import React, { useState } from "react";

const GENDERS = ["male", "female", "other"];
const PRICES = [
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "$300 - $400", min: 300, max: 400 },
  { label: "$400+", min: 400, max: 700 },
];
const LANGUAGES = ["English", "Spanish", "Arabic","German", "Russian","Chinese","Portuguese","Italian","Turkish","French","Japanese", "Hindi"];

interface CaregiverFilters {
  gender?: string;
  certified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  languages?: string[];
  prn?: string[];
}

const FilterSidebar = ({ onFilterChange }: { onFilterChange: (filters: CaregiverFilters) => void }) => {
  const [gender, setGender] = useState<string>("");
  const [certified, setCertified] = useState<string>("");
  const [price, setPrice] = useState<{ min: number; max: number } | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [prn, setPrn] = useState<string[]>([]);

  // Call this whenever a filter changes
  React.useEffect(() => {
    onFilterChange({
      gender,
      certified: certified === "" ? undefined : certified === "yes",
      minPrice: price?.min,
      maxPrice: price?.max,
      languages,
      prn,
    });
  }, [gender, certified, price, languages, prn, onFilterChange]);

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
      {/* Certified */}
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Certified</h4>
        <label className="text-sm text-[#98A2B3] font-medium">
          <input
            type="radio"
            name="certified"
            checked={certified === "yes"}
            onChange={() => setCertified("yes")}
            className="mr-2 accent-[#233D4D]"
          /> Yes
        </label>
        <label className="text-sm text-[#98A2B3] font-medium ml-4">
          <input
            type="radio"
            name="certified"
            checked={certified === "no"}
            onChange={() => setCertified("no")}
            className="mr-2 accent-[#233D4D]"
          /> No
        </label>
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
    </aside>
  );
};

export default FilterSidebar;
