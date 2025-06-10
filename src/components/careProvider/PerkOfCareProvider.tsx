import Image from "next/image";
import React from "react";

interface PerksProps {
  title: string;
  description: string;
}
const perksData: PerksProps[] = [
  {
    title: "Flexible Scheduling",
    description:
      "You can work on your own schedule, from Monday to Sunday, and choose the time that suits you best.",
  },
  {
    title: "Competitive Pay",
    description:
      "Earn higher wages compared to traditional agencies. Payments are direct, transparent, and processed on time.",
  },
  {
    title: "Matched with the Right Clients",
    description:
      "Get connected with clients that match your skills, location, and preferences, making your work more rewarding and personalized.",
  },
  {
    title: "Professional Support",
    description:
      "Access a dedicated support team and resources to help you navigate any challenges, from onboarding to day-to-day tasks.",
  },
  {
    title: "Flexible Scheduling",
    description:
      "You can work on your own schedule, from Monday to Sunday, and choose the time that suits you best.",
  },
  {
    title: "Build Trust with a Verified Profile",
    description:
      "Showcase your experience, certifications, and reviews. A complete and verified profile builds credibility and attracts more opportunities.",
  },
];

const PerkOfCareProvider = () => {
  return (
    <div className="lg:p-18 p-8  bg-[var(--cream)] h-auto">
      <h1 className="font-semibold text-4xl leading-11 text-[var(--navy)] lg:w-1/2">
        Perks of Joining as a Caregiver on Our Platform
      </h1>

      <div className="mt-12 grid lg:grid-cols-3 grid-cols-2 gap-8">
        {perksData.map((perk, index) => (
          <Perks
            key={index}
            title={perk.title}
            description={perk.description}
          />
        ))}
      </div>
    </div>
  );
};

export const Perks = ({ title, description }: PerksProps) => {
  return (
    <div className="">
      <div className="p-2 bg-[var(--navy)] rounded-full w-8 h-8 flex items-center justify-center">
        <div className="absolute w-5 h-5">
          <Image src={"/clock-line-icon.svg"} alt={"clock icon"} fill />
        </div>
      </div>

      <div className="mt-2">
        <h2 className="text-xl font-semibold text-[var(--navy)] mb-2">
          {title}
        </h2>
        <p className="text-sm text-[var(--navy)]">{description}</p>
      </div>
    </div>
  );
};
export default PerkOfCareProvider;
