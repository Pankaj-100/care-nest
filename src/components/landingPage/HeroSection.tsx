import React from "react";
import Image from "next/image";

import { RedirectButton } from "../common/CustomButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  return (
    <div className="relative h-[550px]">
      <div className="h-full w-full relative ">
        <div className="w-full h-[550px] absolute right-0 ">
          <div className=" w-3/4 h-[550px] absolute right-0 ">
            <Image
              src={"/hero-background.png"}
              alt="hero background"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className="absolute top-0 left-0 h-full w-2/3 pointer-events-none "
            style={{
              background:
                "linear-gradient(to left, #233d4d00 0%, #233d4d 50%, #233d4d 100%)",
            }}
          ></div>
        </div>

        <div className="absolute lg:left-28 left-8 sm:top-1/7 top-1/2 sm:-translate-y-0 -translate-y-1/2 hyphens-auto text-white sm:w-[500px] break-words w-[calc(100vw-8rem)]">
          <div>
            <h1 className="font-semibold sm:text-4xl text-3xl sm:leading-11 ">
              Find Trusted, Compassionate Caregivers for Your Loved Ones at Home
            </h1>
          </div>
          <div className="my-5  ">
            <p className="font-light">
              Easily connect with trusted professionals who provide personal
              care and support tailored to your family’s needs.Create your free
              profile to discover verified, compassionate caregivers.
            </p>
          </div>

          <div>
            <RedirectButton
              className="px-12"
              path="/care-giver"
              title="Find a Caregiver"
            />
          </div>
        </div>
      </div>

      <div className="lg:flex hidden items-center justify-center absolute sm:-bottom-12  -bottom-[18rem] -translate-x-1/2 left-1/2">
        <BrowseCaregiver />
      </div>
    </div>
  );
};

interface Props {
  noDescription?: boolean;
}
export const BrowseCaregiver = ({ noDescription }: Props) => {
  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-y-4 lg:w-[80vw] bg-white rounded-xl lg:p-6 p-4 py-6 gap-x-7 w-full">
      <div className={`lg:w-52 ${noDescription ? "hidden" : "block"}`}>
        <h3 className="font-semibold text-lg mb-1">Browse Caregivers</h3>
        <p className="text-xs text-gray-500">
          Create your free profile to discover verified, compassionate
          caregivers.
        </p>
      </div>

      <div className="flex-grow flex gap-4 flex-wrap">
        <div className="flex-1">
          <h3 className="mb-3  font-semibold text-sm">Care Type</h3>
          <SelectWithOption
            selectPlaceholder="Select Care"
            selectLabel="Care Type"
            selectItem={[
              "Personal care",
              "Assisted care/Home care",
              "Memory care",
              "Private pay skilled nursing",
            ]}
            className="!w-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-sm">Recipient</h3>
          <SelectWithOption
            selectPlaceholder="Select Recipient"
            selectLabel="Recipient"
            selectItem={[
              "Recipient1",
              "Recipient2",
              "Recipient3",
              "Recipient4",
            ]}
            className="!w-full"
          />
        </div>
        <div className="flex-1 ">
          <h3 className="mb-3 font-semibold text-sm">Zip Code</h3>
          <input
            type="text"
            placeholder="Enter Zip Code"
            className="w-full min-w-[5rem] rounded-2xl outline-none border py-[5px] border-gray-300 text-gray-500 px-3"
          />
        </div>

        <div className="lg:mt-auto mt-4 lg:w-auto w-full ">
          <RedirectButton
            className="px-10 max-w-[10rem]"
            path="/care-giver?type=personal&recipient=seff&zipcode=1234567"
            title="Search Caregiver"
          />
        </div>
      </div>
    </div>
  );
};

interface SelectWithOptionProps {
  selectPlaceholder: string;
  selectLabel: string;
  selectItem: string[];
  className?: string;
}
export const SelectWithOption = ({
  selectPlaceholder,
  selectLabel,
  selectItem,
  className,
}: SelectWithOptionProps) => {
  return (
    <Select>
      <SelectTrigger
        className={`w-[180px] rounded-2xl outline-none ${className}`}
      >
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
export default HeroSection;
