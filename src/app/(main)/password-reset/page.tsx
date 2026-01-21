"use client";
import { Sidebar } from "@/components/RecentBooked/Sidebar";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";


import ResetPassword from "@/components/RecentBooked/ResetPassword";
import { useState } from "react";

export default function password_reset (){
    const [selectedOption, setSelectedOption] = useState("Reset Password");
    return (
        <>
      <HeroSectionCareProvider title="Reset Password" />
      <div className=" bg-[#F8F9FA] max-w-7xl mx-auto flex flex-col md:flex-row p-4 gap-4">
        <Sidebar onSelect={setSelectedOption} selected={selectedOption} />
        <div className="w-full md:w-3/4">
          <ResetPassword />
        </div>
      </div>
    </>
    )
}