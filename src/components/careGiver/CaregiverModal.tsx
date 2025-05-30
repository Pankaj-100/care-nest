import React from "react";
import { ContactItem } from "../common/ContactInfo";

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
}

const CaregiverModal: React.FC<CaregiverModalProps> = ({
  isOpen,
  onClose,
  caregiver,
  onBookmarkToggle,
  isBookmarked,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-[#F8F9FA] rounded-xl p-8 max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Caregiver Info Section */}
        <div className="flex flex-row gap-6 justify-between items-center">
          {/* Left side: Image and basic info */}
          <div className="flex gap-6 items-center">
            <img src={imgSrc} alt="avatar" className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{name}</h2>
              <p className="text-gray-500 mb-2 text-md">
                123 Evergreen Street, Willow Creek, California, 90210
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 border rounded-full">
                  {experience}
                </span>
                <span className="px-4 py-2 border rounded-full">{rate}</span>
              </div>
            </div>
          </div>

          {/* Right side: Bookmark icon & Add Campaign button */}
          <div className="flex flex-row gap-4 items-center">
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

            <button
              className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition cursor-pointer"
              onClick={() => {
                onBookmarkToggle(name);
                onClose();
              }}
            >
              Add CareGiver
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[var(--navy)]">About</h3>
          <p className="text-[var(--cool-gray)] mt-2 leading-6 font-normal">
            Hello! I’m {name}, a dedicated {specialty} with {experience} of
            experience in caregiving. I specialize in {specialty} and take pride
            in providing compassionate and personalized care.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[var(--navy)]">
            Contact Details
          </h3>
          <div className="flex flex-row gap-14 mt-3">
            <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
              <ContactItem
                icon={"/Contact/phone.png"}
                label={"Phone Number"}
                value={"976543210"}
              />
            </div>
            <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
              <ContactItem
                icon={"/Contact/email.png"}
                label={"Email ID"}
                value={"care@wellnurtured.com"}
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[var(--navy)]">
            My Services
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {serviceTypes.map((service) => (
              <div
                key={service.name}
                className="flex flex-row gap-4 items-center p-4 bg-gray-100 rounded-lg"
              >
                <img
                  src={service.imgSrc}
                  alt={service.name}
                  className="w-8 h-8"
                />
                <h4 className="text-md font-semibold text-[var(--cool-gray)]">
                  {service.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Me */}
        <div className="mt-6">
          <h3 className="text-xl text-[var(--navy)] font-semibold">
            Why Choose Me?
          </h3>
          <div className="space-y-4 mt-3">
            {whyChooseMe.map((item) => (
              <div
                key={item.title}
                className="flex flex-row gap-4 p-4 bg-gray-100 rounded-lg"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-[var(--navy)]">{item.title}</h4>
                  <p className="text-sm text-[var(--cool-gray)] mt-1">{item.desc}</p>
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
