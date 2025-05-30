import Image from "next/image";
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







export const CareGiverHero = () => {
    return (
        <div className='relative h-[300px]'>
            <div className='w-full h-[300px] absolute right-0 '>
                <div className='absolute right-0 w-2/3 h-full'>
                    <Image src="/hero-care-provider.jpg" alt="hero care provider" fill style={{ objectFit: 'cover' }} />
                </div>

                <div className="absolute top-0 left-0 h-full w-2/3 pointer-events-none " style={{ background: 'linear-gradient(to left, #233d4d00 0%, #233d4d 50%, #233d4d 100%)', }}></div>
            </div>

            <h1 className='absolute text-5xl text-white left-38 font-bold -translate-y-1/2 top-1/2'>Find A Caregiver</h1>

            <div className="flex max-w-7xl mx-auto items-center justify-center absolute -bottom-12 -translate-x-1/2 left-1/2">
        <CareType />
      </div>
        </div>
    )
}


export const CareType = () => {
  return (
    <div className="flex items-center w-[80vw] bg-white rounded-xl p-4 py-6 gap-x-7">
      {/* <div className="w-52">
        <h3 className="font-semibold text-lg mb-1">Browse caregivers</h3>
        <p className="text-xs text-gray-500">
          Create your free profile to discover verified, compassionate
          caregivers.
        </p>
      </div> */}

      <div>
        <h3 className="mb-3 font-semibold text-sm">Care type</h3>
        <SelectWithOption
          selectPlaceholder="Select care"
          selectLabel="Care type"
          selectItem={[
          "live-in care",
          "hourly care",
          "overnight care",
          ]}
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
