import React from "react";
import { Service1, Service2, Service3, Service4, Service5, Service6 } from "../icons/page";

const SERVICES = [
  {
    title: "Personal Care",
    desc: "Find your professional personal care provider for daily assistance, hygiene, mobility, and compassionate support.",
    Icon: Service1,
  },
  {
    title: "Home Maker Service",
    desc: "Home maker service providers can assist by doing what the client can no longer do, or they can aid the individual...",
    Icon: Service2,
  },
  {
    title: "Specialized Care",
    desc: "Specialized care provides specialized support for individuals with dementia or Alzheimer’s, ensuring safety...",
    Icon: Service3,
  },
  {
    title: "Sitter Services",
    desc: "Sitter services provide reliable support and supervision for your loved ones when you can’t be there...",
    Icon: Service4,
  },
  {
    title: "Companion Care",
    desc: "Companion care is a very useful form of long-term home care, focused on providing the elderly with emotio...",
    Icon: Service5,
  },
  {
    title: "Transportation",
    desc: "Transportation service is a critical support for older adults to access community services and visit family...",
    Icon: Service6,
  },
];

const ServiceWeProvide = () => {
  return (
    <div className="flex flex-col justify-center w-full min-h-screen bg-[#F7F0D3] px-4 py-12">
      <h1 className="font-semibold text-6xl mt-15 text-center mb-12 text-[#233D4D] font-urbanist">
        Services We Provide
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className={`
              rounded-2xl p-8 flex flex-col h-full transition-colors duration-200
              bg-[#0000000A] text-[#233D4D]
              hover:bg-[#233D4D] hover:text-white hover:shadow-lg
              group
            `}
          >
            {/* Icon */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-6
                bg-[#233D4D1A] group-hover:bg-[#2F3C51]
                transition-colors duration-200
              `}
            >
              {/* Make sure your icon supports color via className */}
              <service.Icon className="text-[#233D4D] group-hover:text-[#F2E9CE] transition-colors duration-200" />
            </div>
            <h3
              className={`
                font-semibold text-2xl mb-4 font-urbanist
                text-[#233D4D] group-hover:text-[#F2A307]
                transition-colors duration-200
              `}
            >
              {service.title}
            </h3>
            <p className={`
              text-lg font-urbanist mb-8
              text-[#233D4D] group-hover:text-white
              transition-colors duration-200
            `}>
              {service.desc}
            </p>
            <button
              className={`
                mt-auto flex items-center gap-2 font-semibold text-lg cursor-pointer transition
                text-[#233D4D] hover:text-[#F2A307] group-hover:text-[#F2A307]
              `}
            >
              View More <span className="ml-1">&#8594;</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="text-[#233D4D] cursor-pointer font-semibold text-2xl hover:text-[#F2A307] transition">
          Load More
        </button>
      </div>
    </div>
  );
};

export default ServiceWeProvide;
