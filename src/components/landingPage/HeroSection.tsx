"use client";
import React, { useState } from "react";
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

import { useGetServiceNamesQuery } from "@/store/api/bookingApi";

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
              className="px-12 py-6 text-sm"
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
  const { data, isLoading } = useGetServiceNamesQuery();

  // State for selections
  const [selectedCareType, setSelectedCareType] = useState<string>("");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  // Map service data to label/value pairs
  const serviceOptions =
    data?.data?.services.map((service) => ({
      label: service.name,
      value: service.id,
    })) || [];

  // Static recipient options
  const recipientOptions = [
    { label: "Recipient1", value: "Recipient1" },
    { label: "Recipient2", value: "Recipient2" },
    { label: "Recipient3", value: "Recipient3" },
    { label: "Recipient4", value: "Recipient4" },
  ];

  // Build the dynamic redirect URL query params
  const queryParams = new URLSearchParams();
  if (selectedCareType) queryParams.append("type", selectedCareType);
  if (selectedRecipient) queryParams.append("recipient", selectedRecipient);
  if (zipCode) queryParams.append("zipcode", zipCode);

  const redirectPath = `/care-giver?${queryParams.toString()}`;

  return (
    <div
      className={`flex lg:flex-row flex-col justify-between lg:items-center gap-y-4 lg:w-[80vw] bg-white rounded-xl lg:p-6 p-4 py-6 gap-x-7 w-full ${
        noDescription ? "lg:pl-0" : ""
      }`}
    >
      <div className={`lg:w-52 ${noDescription ? "hidden" : "block"}`}>
        <h3 className="font-semibold text-lg mb-1">Browse Caregivers</h3>
        <p className="text-xs text-gray-500">
          Create your free profile to discover verified, compassionate caregivers.
        </p>
      </div>

      <div className="flex-grow flex gap-4 flex-wrap">
        {/* Care Type */}
        <div className="flex-1">
          <h3 className="mb-3 ml-2 font-semibold text-sm">Care Type</h3>
          <Select
            value={selectedCareType}
            onValueChange={setSelectedCareType}
            disabled={isLoading}
          >
            <SelectTrigger className="w-45 min-w-[5rem] py-5 rounded-4xl ml-2 outline-none ">
              <SelectValue placeholder={ "Select Care"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Care Type</SelectLabel>
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Recipient */}
        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-sm">Recipient</h3>
          <Select
            value={selectedRecipient}
            onValueChange={setSelectedRecipient}
          >
            <SelectTrigger className="w-45 min-w-[5rem] rounded-4xl outline-none py-5 ">
              <SelectValue placeholder="Select Recipient" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Recipient</SelectLabel>
                {recipientOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Zip Code */}
        <div className="flex-1">
          <h3 className="mb-3 font-semibold text-sm">Zip Code</h3>
          <input
            type="text"
            placeholder="Enter Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-45 min-w-[5rem] rounded-4xl outline-none border py-[9px] border-gray-300 text-gray-900 px-5"
          />
        </div>

        {/* Search Button */}
        <div className="lg:mt-auto mt-4 lg:w-auto w-full">
          <RedirectButton
            className="px-10 py-6 text-sm"
            path={redirectPath}
            title="Search Caregiver"
            // disabled={!selectedCareType} // optional: disable if no care type selected
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
