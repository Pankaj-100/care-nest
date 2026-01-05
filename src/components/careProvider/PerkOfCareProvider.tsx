"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PerksProps {
  title: string;
  description: string;
  icon?: string;
}

const PerkOfCareProvider = () => {
  const [perksData, setPerksData] = useState<PerksProps[]>([]);

  useEffect(() => {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "";
    const fetchBecomeCaregiver = async () => {
      if (!API_BASE) return;
      try {
        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/become-caregiver`;
        const res = await fetch(endpoint);
        if (!res.ok) return;

        const json = await res.json();
        const data = json?.data?.becomeCaregiver;
        if (data) {
          if (Array.isArray(data.points)) {
            setPerksData(
              data.points.map((pt: { heading: string; description: string; icon?: string }) => ({
                title: pt.heading,
                description: pt.description,
                icon: pt.icon,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch become-caregiver content for perks:", err);
      }
    };

    fetchBecomeCaregiver();
  }, []);

  return (
    <div className="w-full bg-[var(--cream)] px-6 sm:px-8 lg:px-18 py-10 lg:py-18">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-[var(--navy)] w-full">
        {/* {title} */}
        Perks Of Joining As A<br />Caregiver On Our Platform
      </h1>

      <div
        className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-none"
      >
        {perksData.map((perk, index) => (
          <Perks
            key={index}
            title={perk.title}
            description={perk.description}
            icon={perk.icon}
          />
        ))}
      </div>
    </div>
  );
};

export const Perks = ({ title, description, icon }: PerksProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="p-2  rounded-full w-10 h-10 flex items-center justify-center">
        <div className="relative w-13 h-7">
          <Image
            src={icon || ""}
            alt={"perk icon"}
            fill
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-2xl font-bold text-[var(--navy)] mb-2">
          {title}
        </h2>
        <p className="text-xl sm:text-xl text-[var(--navy)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
export default PerkOfCareProvider;
