"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3  bg-[#fff] p-2 rounded-md">
    <div className="text-xl bg-[#233D4D] rounded-full p-4">
      <Image
        src={icon}
        alt={label}
        width={30}
        height={30}
        className="w-5 h-5"
      />
    </div>
    <div>
      <p className="text-md font-medium">{label}</p>
      {(() => {
        const trimmed = (value || "").trim();
        if (!trimmed) return <p className="text-md text-[var(--cool-gray)]">{value}</p>;

        const lower = (label || "").toLowerCase();
        let href: string | undefined;
        let external = false;

        if (lower.includes("phone")) {
          const tel = trimmed.replace(/[^\d+]/g, "");
          if (tel) href = `tel:${tel}`;
        } else if (lower.includes("email")) {
          href = `mailto:${trimmed}`;
        } else if (lower.includes("address")) {
          href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
          external = true;
        }

        if (!href) {
          return <p className="text-md text-[var(--cool-gray)]">{value}</p>;
        }

        return (
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-lg text-[var(--cool-gray)] hover:text-[var(--navy)]  break-all"
            aria-label={`${label} ${trimmed}`}
          >
            {value}
          </a>
        );
      })()}
    </div>
  </div>
);

type ContactPayload = {
  id?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  businessHours?: string;
};

const ContactInfo: React.FC = () => {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  const [contact, setContact] = useState<ContactPayload>({
    phoneNumber: "976543210",
    email: "care@wellnurtured.com",
    address: "123, East Sample Street, City, State",
    businessHours: "09:00 AM - 08:00 PM",
  });

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/contact`;

    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json;
      })
      .then((json) => {
        if (!mounted) return;
        const payload = json?.data?.contact ?? null;
        if (payload) {
          setContact({
            phoneNumber: payload.phoneNumber ?? contact.phoneNumber,
            email: payload.email ?? contact.email,
            address: payload.address ?? contact.address,
            businessHours: payload.businessHours ?? contact.businessHours,
          });
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch contact:", err);
        // keep defaults on error
      });

    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE]);

  return (
    <div className="space-y-6 lg:p-4 ">
      <h2 className="text-3xl text-[var(--navy)] font-semibold mb-4 ">
        Contact Us
      </h2>
      <ContactItem
        icon={"/Contact/phone.png"}
        label={"Phone Number"}
        value={contact.phoneNumber ?? ""}
      />
      <ContactItem
        icon={"/Contact/email.png"}
        label={"Email ID"}
        value={contact.email ?? ""}
      />
      <ContactItem
        icon={"/Contact/location.png"}
        label={"Address"}
        value={contact.address ?? ""}
      />
      <ContactItem
        icon={"/Contact/clock.png"}
        label={"Business Hours"}
        value={contact.businessHours ?? ""}
      />
    </div>
  );
};

export default ContactInfo;
