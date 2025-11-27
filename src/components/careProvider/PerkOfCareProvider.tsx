"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface PerksProps {
  title: string;
  description: string;
  icon?: string;
}

const PerkOfCareProvider = () => {
  const [title, setTitle] = useState(
    "Perks Of Joining As A  Caregiver On Our Platform"
  );
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
          if (data.title2) setTitle(data.title2);
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
      <h1 className="font-medium text-3xl sm:text-4xl lg:text-5xl leading-snug text-[var(--navy)] max-w-[26rem]">
        {title}
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
      <div className="p-2 bg-[var(--navy)] rounded-full w-10 h-10 flex items-center justify-center">
        <div className="relative w-5 h-5">
          <Image
            src={icon || "/clock-line-icon.svg"}
            alt={"perk icon"}
            fill
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--navy)] mb-1">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[var(--navy)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
export default PerkOfCareProvider;
