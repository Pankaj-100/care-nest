// components/FilterSidebar.tsx
import React from "react";

const FilterSidebar = () => {
  return (
    <aside className="w-full md:w-[250px] border rounded-xl p-4 space-y-4">

      <h2 className="text-md font-semibold mb-4 text-[var(--navy)]">Filters & Sort </h2>
      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Gender</h4>
        <div className="space-y-1">
          <label className="text-sm text-[var(--coolgray)] font-medium"><input type="checkbox" className="mr-2 " /> Male</label><br />
          <label className="text-sm text-[var(--coolgray)] font-medium"><input type="checkbox" className="mr-2" /> Female</label>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Price (Hourly Rate)</h4>
        {["$100 - $200", "$200 - $300", "$300 - $400", "$400+"].map((range, idx) => (
          <label key={idx} className="block text-sm text-[var(--coolgray)] font-medium">
            <input type="checkbox" className="mr-2" />
            {range}
          </label>
        ))}
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Location</h4>
        {["Within 2 miles", "Within 10 miles", "Within 15 miles", "Within 20 miles", "Within 30 miles"].map((loc, idx) => (
          <label key={idx} className="block text-sm text-[var(--coolgray)] font-medium">
            <input type="checkbox" className="mr-2" />
            {loc}
          </label>
        ))}
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">PRN (Pro rata)</h4>
        <label className="text-sm text-[var(--coolgray)] font-medium"><input type="checkbox" className="mr-2" /> As Needed</label><br />
        <label className="text-sm text-[var(--coolgray)] font-medium"><input type="checkbox" className="mr-2" /> Fixed Schedule</label>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Experience</h4>
        {["0-1 years", "2-5 years", "6-10 years", "10+ years"].map((exp, idx) => (
          <label key={idx} className="block text-sm text-[var(--coolgray)] font-medium">
            <input type="checkbox" className="mr-2" />
            {exp}
          </label>
        ))}
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Certified</h4>
        <label className="text-sm text-[var(--coolgray)] font-medium"><input type="checkbox" className="mr-2" /> Yes</label><br />
        <label className="text-sm text-[var(--coolgray)] font-medium"><input type="checkbox" className="mr-2" /> No</label>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 text-[var(--navy)]">Language</h4>
        {["English", "Spanish", "French", "German", "Russian", "Japanese"].map((lang, idx) => (
          <label key={idx} className="block text-sm text-[var(--coolgray)] font-medium">
            <input type="checkbox" className="mr-2" />
            {lang}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
