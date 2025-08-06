"use client";

import React from "react";
import { ContactItem } from "../common/ContactInfo";
import { CustomButton } from "../common/CustomInputs";
import { useGetCaregiverDetailsQuery } from "@/store/api/bookingApi";

interface CaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverId: string | null;
  onBookmarkToggle: (id: string) => void;
  isBookmarked?: boolean;
  isLoggedInUser?: boolean;
}

const CaregiverModal: React.FC<CaregiverModalProps> = ({
  isOpen,
  onClose,
  caregiverId,
  onBookmarkToggle,
  isBookmarked,
  isLoggedInUser,
}) => {
  const { data, isLoading, isError } = useGetCaregiverDetailsQuery(
    caregiverId || "",
    { skip: !caregiverId }
  );

  if (!isOpen || !caregiverId) return null;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data.details[0]) return <div>Failed to load caregiver</div>;

  const caregiver = data.data.details[0];

  const bookmarkStatus = isBookmarked ?? false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 max-w-screen">
      <div className="bg-[var(--light-gray)] rounded-xl p-8 py-4 max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Info Header */}
        <div className="flex lg:flex-row flex-col gap-6 justify-between items-center break-all">
          <div className="flex gap-6 items-center">
            <img
             // src={caregiver.avatar}
             src={`/care-giver/boy-icon.png`}
              alt="avatar"
              className="lg:w-24 w-15 lg:h-24 h-15 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{caregiver.name}</h2>
              <p className="text-[var(--cool-gray)] mb-2 text-md">
                {caregiver.address}
              </p>
              <div className="flex flex-wrap gap-4 text-[var(--blue-gray)]">
                <span className="px-4 py-2 border rounded-full bg-[#fff] border-[var(--blue-gray)]">
                  {caregiver.experience} yrs 
                </span>
                <span className="px-4 py-2 border rounded-full bg-[#fff] border-[var(--blue-gray)]">
                  ${caregiver.price}/hrs
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center ms-auto">
            <div>
              <img
                src={
                  bookmarkStatus
                    ? "/care-giver/bookmark-bold.png"
                    : "/care-giver/bookmark.png"
                }
                alt="Bookmark"
                className="w-4 h-4"
              />
            </div>
            <CustomButton
              onClick={() => {
                onBookmarkToggle(caregiver.id);
                onClose();
              }}
              className="!px-6"
            >
              Add CareGiver
            </CustomButton>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-[var(--navy)]">About</h3>
          <p className="text-[var(--cool-gray)] mt-2 leading-6">
            {caregiver.about}
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-[var(--navy)]">
            Contact Details
          </h3>
          <div className="flex lg:flex-row flex-col gap-x-14 gap-y-4 mt-3">
            <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
              <ContactItem
                icon={"/Contact/phone.png"}
                label={"Phone Number"}
                value={isLoggedInUser ? caregiver.mobile : "XXXXXXXXXX"}
              />
            </div>
            <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
              <ContactItem
                icon={"/Contact/email.png"}
                label={"Email ID"}
                value={isLoggedInUser ? caregiver.email : "XXXXXXXXXX"}
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-[var(--navy)]">
            My Services
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {caregiver.services.map((service) => (
              <div
                key={service}
                className="flex gap-4 items-center p-4 bg-[#fff] rounded-md"
              >
                <img
                  src="/care-giver/home.png"
                  alt={service}
                  className="w-8 h-8"
                />
                <h4 className="text-md font-medium text-[var(--cool-gray)]">
                  {service}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Me */}
        <div className="mt-6 mb-4">
          <h3 className="text-xl text-[var(--navy)] font-medium">
            Why Choose Me?
          </h3>
          <div className="space-y-4 mt-3">
            {caregiver.whyChooseMe.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 bg-[#fff] rounded-md"
              >
                <img
                  src="/care-giver/flexible.png"
                  alt={item.title}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-[var(--navy)]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[var(--cool-gray)] mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverModal;
