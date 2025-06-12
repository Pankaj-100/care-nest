"use client";

import React from "react";
import { ContactItem } from "../common/ContactInfo";
import { CustomButton } from "../common/CustomInputs";

interface Caregiver {
  name: string;
  experience: string;
  rate: string;
  specialty: string;
  imgSrc: string;
  isBookmarked?: boolean;
}

interface CaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiver: Caregiver | null;
  onBookmarkToggle: (name: string) => void;
  isBookmarked?: boolean;
  isLoggedInUser?: boolean;
}

const CaregiverModal: React.FC<CaregiverModalProps> = ({
  isOpen,
  onClose,
  caregiver,
  onBookmarkToggle,
  isBookmarked,
  isLoggedInUser,
}) => {
  if (!isOpen || !caregiver) return null;

  const { name, experience, rate, specialty, imgSrc } = caregiver;
  const bookmarkStatus = isBookmarked ?? caregiver.isBookmarked ?? false;

  const serviceTypes = [
    {
      name: "Home Assistance",
      imgSrc: "/care-giver/home.png",
    },
    {
      name: "Medical Assistance",
      imgSrc: "/care-giver/medical.png",
    },
    {
      name: "Pet Care",
      imgSrc: "/care-giver/pet.png",
    },
  ];

  const whyChooseMe = [
    {
      imgSrc: "/care-giver/search-engine.png",
      title: "Certified and background-checked",
      desc: "Certified and background-checked ✅ Flexible scheduling and availability ✅ Personalized and compassionate care.",
    },
    {
      imgSrc: "/care-giver/flexible.png",
      title: "Flexible scheduling and availability",
      desc: "Access verified property listings with accurate, up-to-date information and high-quality images for a transparent buying experience.",
    },
    {
      imgSrc: "/care-giver/contact.png",
      title: "Personalized and compassionate care",
      desc: "Receive professional assistance from our experienced agents to help you navigate the home-buying process with ease.",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 max-w-screen">
        <div className="bg-[var(--light-gray)] rounded-xl p-8 py-4 max-w-4xl w-full relative overflow-y-auto max-h-[90vh] ">
          {/* Header */}
          <div className="flex justify-end ">
            <button
              onClick={() => onClose()}
              className="text-gray-500 hover:text-gray-800 text-sm font-bold cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Caregiver Info Section */}
          <div className="flex lg:flex-row flex-col gap-6 justify-between items-center break-all">
            {/* Left side: Image and basic info */}
            <div className="flex gap-6 items-center">
              <img
                src={imgSrc}
                alt="avatar"
                className="lg:w-24 w-15 lg:h-24 h-15 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold ">{name}</h2>
                <p className="text-[var(--cool-gray)] mb-2 text-md">
                  123 Evergreen Street, Willow Creek, California, 90210
                </p>
                <div className="flex flex-wrap  gap-4 text-[var(--blue-gray)]">
                  <span className="px-4 py-2 border rounded-full bg-[#fff] border-[var(--blue-gray)] whitespace-nowrap">
                    {experience}
                  </span>
                  <span className="px-4 py-2 border border-[var(--blue-gray)] rounded-full bg-[#fff] whitespace-nowrap">
                    {rate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Bookmark icon & Add Campaign button */}
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
                  onBookmarkToggle(name);

                  onClose();
                }}
                className="!px-6"
              >
                Add CareGiver
              </CustomButton>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h3 className="text-xl font-medium text-[var(--navy)]">About</h3>
            <p className="text-[var(--cool-gray)] mt-2 leading-6 font-normal">
              Hello! I’m {name}, a dedicated {specialty} with {experience} of
              experience in caregiving. I specialize in {specialty} and take
              pride in providing compassionate and personalized care.
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
                  value={isLoggedInUser ? "976543210" : "XXXXXXXXXX"}
                />
              </div>
              <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
                <ContactItem
                  icon={"/Contact/email.png"}
                  label={"Email ID"}
                  value={
                    isLoggedInUser ? "care@wellnurtured.com" : "XXXXXXXXXX"
                  }
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
              {serviceTypes.map((service) => (
                <div
                  key={service.name}
                  className="flex flex-row gap-4 items-center p-4 bg-[#fff] rounded-md"
                >
                  <img
                    src={service.imgSrc}
                    alt={service.name}
                    className="w-8 h-8"
                  />
                  <h4 className="text-md font-medium text-[var(--cool-gray)]">
                    {service.name}
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
              {whyChooseMe.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-row gap-4 p-4 bg-[#fff] rounded-md"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-[var(--navy)]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--cool-gray)] mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaregiverModal;
