
import Image from "next/image";
import { useState } from "react";
import ActionDialog from "../common/ActionDialog";
import { binIcon } from "@/lib/svg_icons";

const caregivers = [
  {
    name: "Joe Doe",
    specialty: "Elderly Care",
    experience: "12+ Years",
    rate: "$150/hr",
    selected: true,
    imgSrc: "/care-giver/boy-icon.png",
  },
  {
    name: "Joe Doe",
    specialty: "Elderly Care",
    experience: "12+ Years",
    rate: "$150/hr",
    selected: false,
    imgSrc: "/care-giver/boy-icon.png",
  },
  {
    name: "Joe Doe",
    specialty: "Elderly Care",
    experience: "12+ Years",
    rate: "$150/hr",
    selected: false,
    imgSrc: "/care-giver/boy-icon.png",
  },
];


export default function BookingDetails() {
  const [caregiverList] = useState(caregivers);
  const [openDeleteDialog, setOpenDialog] = useState(false); // initially false

  const handleOpen = () => {
    setOpenDialog(false);
   
  };

  const handleCancelBooking = () => {
    // you can trigger any logic here
    console.log("Booking canceled");
    setOpenDialog(false);
   

  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-[#F8F9FA]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#1A1C1F]">
            Recent Bookings / <span className="text-[#2F3C51]">#15678</span>
          </h2>
          <p className="text-sm text-[#7A8699] mt-2">
            <span className="block">
              Booking ID: <span className="text-[#2F3C51]">#15678</span>
            </span>
            <span className="block">
              Care Type: <span className="text-[#2F3C51]">Personal Care</span>
            </span>
            <span className="block">
              Booked On: <span className="text-[#2F3C51]">06 Apr 2025</span>
            </span>
          </p>
        </div>
<div className="flex justify-end w-full">
  <div className="flex flex-col items-end">
        <button
          onClick={() => setOpenDialog(true)}
          className="text-[#ED4B5F] border border-[#ED4B5F] rounded-full  px-6 py-2 mb-6 hover:bg-[#FFF2F3] transition"
        >
          Cancel Booking
        </button>
            <div className="flex items-center gap-4 mb-8">
        <span className="bg-[#2F3C51] text-white px-4 py-1 rounded-full text-sm">
          Accepted
        </span>
        <span className="border border-[#2F3C51] text-[#2F3C51] px-4 py-1 rounded-full text-sm">
          12 Apr 2025
        </span>
        <span className="border border-[#2F3C51] text-[#2F3C51] px-4 py-1 rounded-full text-sm">
          1 Month
        </span>
      </div>
      </div>  
        </div>
      </div>

  

      <div className="space-y-4">
        {caregiverList.map((cg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 flex items-center justify-between border"
          >
            <div className="flex items-center gap-4">
              <Image
                src={cg.imgSrc}
                alt={cg.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h4 className="font-semibold text-lg">{cg.name}</h4>
                <p className="text-sm text-[#7A8699]">{cg.specialty}</p>
                <div className="flex gap-2 mt-1">
                  <span className="border border-[#D1D5DB] rounded-full px-3 py-1 text-sm">
                    {cg.experience}
                  </span>
                  <span className="border border-[#D1D5DB] rounded-full px-3 py-1 text-sm">
                    {cg.rate}
                  </span>
                </div>
              </div>
            </div>
            {cg.selected && (
              <span className="bg-[#2F3C51] text-white px-4 py-1 rounded-full text-sm">
                Selected Caregiver
              </span>
            )}
          </div>
        ))}
      </div>

      <ActionDialog
        open={openDeleteDialog}
        handleOpen={handleOpen}
        icon={binIcon}
        confirmText="Cancel"
        handleConfirm={handleCancelBooking}
        heading="Confirm Cancellation"
        subheading="Are you sure you want to cancel this booking?"
      />
    </div>
  );
}
