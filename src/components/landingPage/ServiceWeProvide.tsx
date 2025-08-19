import Image from "next/image";
import React from "react";
import { RedirectButton, TransparentButton } from "../common/CustomButton";

const ServiceWeProvide = () => {
  // NEW: data source for unique cards
  const SERVICES = [
    {
      title: "Personal Care",
      desc:
        "Find your professional personal care provider for daily assistance, hygiene, mobility, and compassionate support.",
      image: "/service1.png",
      path: "/service/personal-care",
    },
    {
      title: "Assisted Care/Home Care",
      desc:
        "Assisted home care provides daily support, ensuring comfort, safety, and independence for your loved ones.",
      image: "/services/services2.png",
      path: "/service/home-care",
    },
    {
      title: "Memory Care",
      desc:
        "Memory care provides specialized support for individuals with dementia or Alzheimer’s, ensuring safety and dignity.",
      image: "/services/services3.png",
      path: "/service/memory-care",
    },
    {
      title: "Private Pay Skilled Nursing",
      desc:
        "Skilled nursing offers professional medical care at home, ensuring expert attention and personalized treatment.",
      image: "/services/services4.png",
      path: "/service/private-pay-skilled-nursing",
    },
  ];

  return (
    <div className="flex flex-col justify-center w-full sm:pt-[5.5rem] pt-[2.5rem] pb-[2.5rem] bg-[var(--cream)] sm:px-28 px-4">
      <h1 className="sm:font-medium font-semibold sm:text-5xl text-3xl text-center mb-10">
        Services We Provide
      </h1>

      {/* Responsive grid for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {SERVICES.map((s) => (
          <Services
            key={s.title}
            title={s.title}
            desc={s.desc}
            image={s.image}
            path={s.path}
          />
        ))}
      </div>
    </div>
  );
};

// Update Services to accept props instead of hardcoding
type ServiceProps = {
  title: string;
  desc: string;
  image: string;
  path: string;
};

const Services = ({ title, desc, image, path }: ServiceProps) => {
  return (
    <div className="p-4">
      <div className="h-70 rounded mb-2 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-2xl object-cover"
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{desc}</p>
      </div>

      <RedirectButton
        ButtonCompo={TransparentButton}
        className="w-full"
        title="View more"
        path={path}
      />
    </div>
  );
};

export default ServiceWeProvide;
