"use client";

import { RecentPage } from "./RecentPage";
import { useState } from "react";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";

export default function page() {
    const [selectedOption, setSelectedOption] = useState("Manage Profile");
      const title = selectedOption === "Manage Profile" ? "My Profile" : selectedOption;
  return (
    <>
  <HeroSectionCareProvider title={title} />    <RecentPage
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
}
