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

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "";

  useEffect(() => {
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
              data.points.map((pt: any) => ({
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
    <div className="lg:p-18 p-8  bg-[var(--cream)] h-auto">
      <h1 className="font-medium text-5xl leading-11 text-[var(--navy)] lg:w-1/2">
        {title}
      </h1>

      <div className="mt-12 grid lg:grid-cols-3 grid-cols-2 gap-8">
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
    <div className="">
      <div className="p-2 bg-[var(--navy)] rounded-full w-8 h-8 flex items-center justify-center">
        <div className="absolute w-5 h-5">
          <Image
            src={icon || "/clock-line-icon.svg"}
            alt={"perk icon"}
            fill
          />
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
