"use client";

import React, { useEffect, useRef } from "react";
import { ContactItem } from "../common/ContactInfo";
import { CustomButton } from "../common/CustomInputs";
import { useGetCaregiverDetailsQuery } from "@/store/api/bookingApi";
import Image from "next/image";

interface WhyChooseItem {
  title: string;
  description: string;
}
interface CaregiverDetail {
  id: string;
  name: string;
  address?: string;
  experience?: number;
  price?: number;
  about?: string;
  mobile?: string;
  email?: string;
  services?: string[];
  whyChooseMe?: WhyChooseItem[];
  avatar?: string;
}

interface CaregiverModalProps {
  isOpen: boolean;
  caregiverId: string | null;
  onClose: () => void;
  onAddCaregiver: (id: string) => void;
  isBookmarked?: boolean;
}

const cdnURL = "https://dev-carenest.s3.ap-south-1.amazonaws.com";

const CaregiverModal: React.FC<CaregiverModalProps> = ({
  isOpen,
  onClose,
  caregiverId,
  onAddCaregiver,
  isBookmarked,
}) => {
  const { data, isLoading, isError } = useGetCaregiverDetailsQuery(
    caregiverId || "",
    { skip: !isOpen || !caregiverId }
  );

  const viewedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sendView = async (id: string) => {
      try {
        const token =
          (typeof window !== "undefined" &&
            (localStorage.getItem("authToken") || "")) ||
          "";
        if (!token) return;
        const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";
        await fetch(`${base}/api/v1/views/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* silent */
      }
    };

    if (
      isOpen &&
      caregiverId &&
      !isLoading &&
      !isError &&
      data?.data?.details &&
      !viewedRef.current.has(caregiverId)
    ) {
      viewedRef.current.add(caregiverId);
      const key = "caregiver_views_tracked";
      try {
        const stored = JSON.parse(sessionStorage.getItem(key) || "[]") as string[];
        if (!stored.includes(caregiverId)) {
          sendView(caregiverId);
          sessionStorage.setItem(key, JSON.stringify([...stored, caregiverId]));
        }
      } catch {
        sendView(caregiverId);
      }
    }
  }, [isOpen, caregiverId, isLoading, isError, data]);

  if (!isOpen || !caregiverId) return null;
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !data?.data?.details) return <div className="p-6">Failed to load caregiver</div>;

  const raw = data.data.details as CaregiverDetail | CaregiverDetail[];
  const caregiver: CaregiverDetail = Array.isArray(raw) ? raw[0] : raw;

  const bookmarkStatus = isBookmarked ?? false;

  const avatarSrc =
    caregiver.avatar && caregiver.avatar.trim() !== ""
      ? caregiver.avatar.startsWith("http")
        ? caregiver.avatar
        : `${cdnURL}/${caregiver.avatar}`
      : "/care-giver/boy-icon.png";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 max-w-screen">
      <div className="bg-[var(--light-gray)] rounded-xl p-8 py-4 max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex lg:flex-row flex-col gap-6 justify-between items-center break-all">
          <div className="flex gap-6 items-center">
            <Image
              src={avatarSrc}
              alt="avatar"
              width={96}
              height={96}
              className="lg:w-24 w-15 lg:h-24 h-15 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{caregiver.name}</h2>
              <p className="text-[var(--cool-gray)] mb-2 text-md">
                {caregiver.address || "—"}
              </p>
              <div className="flex flex-wrap gap-4 text-[var(--blue-gray)]">
                <span className="px-4 py-2 border rounded-full bg-white border-[var(--blue-gray)]">
                  {caregiver.experience ?? 0} yrs
                </span>
                <span className="px-4 py-2 border rounded-full bg-white border-[var(--blue-gray)]">
                  ${caregiver.price ?? 0}/hrs
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center ms-auto">
            <Image
              src={
                bookmarkStatus
                  ? "/care-giver/bookmark-bold.png"
                  : "/care-giver/bookmark.png"
              }
              alt="Bookmark"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <CustomButton
              onClick={() => caregiver.id && onAddCaregiver(caregiver.id)}
              className="!px-5"
            >
              Add CareGiver
            </CustomButton>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-[var(--navy)]">About</h3>
          <p className="text-[var(--cool-gray)] mt-2 leading-6">
            {caregiver.about ?? "No description available."}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-[var(--navy)]">Contact Details</h3>
          <div className="flex lg:flex-row flex-col gap-x-14 gap-y-4 mt-3">
            <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
              <ContactItem
                icon="/Contact/phone.png"
                label="Phone Number"
                value={caregiver.mobile ?? "N/A"}
              />
            </div>
            <div className="w-full sm:w-1/2 bg-gray-100 rounded-lg">
              <ContactItem
                icon="/Contact/email.png"
                label="Email ID"
                value={caregiver.email ?? "N/A"}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-[var(--navy)]">My Services</h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {(caregiver.services ?? []).map((service, idx) => (
              <div
                key={`${service}-${idx}`}
                className="flex gap-4 items-center p-4 bg-white rounded-md"
              >
                <Image
                  src="/care-giver/home.png"
                  alt={service}
                  width={16}
                  height={16}
                  className="w-8 h-8"
                />
                <h4 className="text-md font-medium text-[var(--cool-gray)]">
                  {service}
                </h4>
              </div>
            ))}
            {(caregiver.services ?? []).length === 0 && (
              <p className="col-span-2 text-sm text-gray-400">
                No services listed.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 mb-4">
          <h3 className="text-xl text-[var(--navy)] font-medium">
            Why Choose Me?
          </h3>
          <div className="space-y-4 mt-3">
            {(caregiver.whyChooseMe ?? []).map(
              (item: WhyChooseItem, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-md">
                  <Image
                    src="/care-giver/flexible.png"
                    alt={item.title}
                    width={40}
                    height={40}
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
              )
            )}
            {(caregiver.whyChooseMe ?? []).length === 0 && (
              <p className="text-sm text-gray-400">
                No additional reasons provided.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverModal;

