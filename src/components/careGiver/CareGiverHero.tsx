// import Image from "next/image";
import React from "react";
import { YellowButton } from "../common/CustomButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BrowseCaregiver } from "../landingPage/HeroSection";
import HeroSectionCareProvider from "../careProvider/HeroSectionCareProvider";

export const CareGiverHero = () => {
  return (
    <div className="relative  ">
      <HeroSectionCareProvider title="Find A Caregiver" />

      <div className="lg:flex items-center justify-center lg:absolute sm:-bottom-20  bottom-0 lg:-translate-x-1/2 lg:left-[890px] lg:m-0 m-4">
        <BrowseCaregiver
          // show heading + helper text in the hero box
          // Choose caregivers to schedule your meeting.
          title="Select Caregivers"
          description={
            <> 
              Choose{" "}
              <span className="text-[var(--yellow)] font-semibold">
                caregivers
              </span>{" "}
              to schedule your meeting.
            </>
          }
        /> 
      </div>
    </div>
  );
};

export const CareType = () => {
  return (
    <div className="flex items-center w-[80vw] bg-white rounded-xl p-4 py-6 gap-x-7">
      <div>
        <h3 className="mb-3 font-semibold text-sm">Zip Code</h3>
        <input
          type="text"
          placeholder="Enter Zip Code"
          className="w-80 not-odd:rounded-2xl outline-none border py-[5px] border-gray-300 text-gray-500 px-3"
        />
      </div>
      <div className="mt-6">
        <YellowButton>Search Caregiver</YellowButton>
      </div>
    </div>
  );
};

interface SelectWithOptionProps {
  selectPlaceholder: string;
  selectLabel: string;
  selectItem: string[];
}
export const SelectWithOption = ({
  selectPlaceholder,
  selectLabel,
  selectItem,
}: SelectWithOptionProps) => {
  return (
    <Select>
      <SelectTrigger className="w-80  rounded-2xl outline-none">
        <SelectValue placeholder={selectPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {selectItem.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default CareType;
