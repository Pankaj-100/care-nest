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
import HeroSectionProtected from "../common/HeroSectionProtected";
import { BrowseCaregiver } from "../landingPage/HeroSection";

export const CareGiverHero = () => {
  return (
    <div className="relative  ">
      <HeroSectionProtected title="Find A Caregiver" />

      <div className="lg:flex items-center justify-center lg:absolute sm:-bottom-20  bottom-0 lg:-translate-x-1/2 lg:left-1/2 lg:m-0 m-4">
        <BrowseCaregiver noDescription={true} />
      </div>
    </div>
  );
};

export const CareType = () => {
  return (
    <div className="flex items-center w-[80vw] bg-white rounded-xl p-4 py-6 gap-x-7">
      <div>
        <h3 className="mb-3 font-semibold text-sm">Care type</h3>
        <SelectWithOption
          selectPlaceholder="Select care"
          selectLabel="Care type"
          selectItem={["live-in care", "hourly care", "overnight care"]}
        />
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-sm">Recipient</h3>
        <SelectWithOption
          selectPlaceholder="Recipient"
          selectLabel="Recipient"
          selectItem={["Recipient1", "Recipient2", "Recipient3", "Recipient4"]}
        />
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-sm">Zip code</h3>
        <input
          type="text"
          placeholder="Enter zip code"
          className="w-80 not-odd:rounded-2xl outline-none border py-[5px] border-gray-300 text-gray-500 px-3"
        />
      </div>
      <div className="mt-6">
        <YellowButton>Search caregiver</YellowButton>
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
