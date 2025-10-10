"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetRequiredByQuery,
  useUpdateRequiredByMutation,
} from "@/store/api/profileApi";
import { MailIcon, UserIcon, LocationIcon, dailerIcon } from "../icons/page";

// Add a narrow type for API profile (no any)
type ProfileApi = {
  name?: string;
  email?: string;
  gender?: string;
  address?: string;
  mobile?: string;
  zipcode?: number | string;
  zipCode?: number | string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CARE_RECIPIENT_OPTIONS = [
  "Mother",
  "Father",
  "Spouse / Partner",
  "Siblings",
  "Grandparents",
  "Child",
  "Myself",
  "Other",
];

export default function ManageProfile() {
  const { data: profile, isLoading: isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const { data: requiredBy, isLoading: isRequiredByLoading } = useGetRequiredByQuery();
  const [updateRequiredBy, { isLoading: isUpdatingRequiredBy }] = useUpdateRequiredByMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    zipcode: "",
    careRecipient: "", // <-- Add this
  });

  const [careRecipient, setCareRecipient] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    zipcode: "",
  });

  useEffect(() => {
    if (profile) {
      const p = profile as ProfileApi;
      const rawZip = p.zipcode ?? p.zipCode;
      let normalizedZip: number | undefined;

      if (typeof rawZip === "number") {
        normalizedZip = rawZip;
      } else if (typeof rawZip === "string" && rawZip.trim() !== "") {
        const n = Number(rawZip);
        if (Number.isFinite(n)) normalizedZip = n;
      }

      setForm({
        name: p.name || "",
        email: p.email || "",
        gender: p.gender || "",
        address: p.address || "",
        mobile: p.mobile || "",
        zipcode: normalizedZip !== undefined ? String(normalizedZip) : "",
        careRecipient: "", // or p.careRecipient if available from API
      });
    }
  }, [profile]);

  useEffect(() => {
    if (requiredBy) {
      setCareRecipient(requiredBy);
    }
  }, [requiredBy]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "email":
        return emailRegex.test(value) ? "" : "Invalid email address";
      case "gender":
        return value.trim() === "" ? "Gender is required" : "";
      case "address":
        return value.trim() === "" ? "Address is required" : "";
      case "mobile":
        return /^\d{10}$/.test(value) ? "": "Mobile must be 10 digits";
      case "zipcode":
        // Accept 5 or 6 digits. Adjust if your region requires a fixed length.
        return /^\d{5,6}$/.test(value) ? "" : "Zip code must be 5–6 digits";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextVal =
      name === "mobile" || name === "zipcode" ? value.replace(/\D/g, "") : value;

    setForm((prev) => ({ ...prev, [name]: nextVal }));

    // Validate on change
    const error = validateField(name, nextVal);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCareRecipientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCareRecipient(e.target.value);
  };

  const hasErrors = Object.values(errors).some((msg) => msg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submit
    const newErrors = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, validateField(key, value)])
    ) as typeof errors;

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg)) return;

    // Convert zipcode to number as required by backend
    const zipNum = Number(form.zipcode);
    if (!Number.isFinite(zipNum)) {
      toast.error("Zip code must be numeric");
      return;
    }

    try {
      const payload = {
        ...form,
        zipcode: zipNum, // send number
      } as unknown as Parameters<typeof updateProfile>[0];

      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully.");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data?: { message?: string } };
        toast.error(errorData.data?.message || "Failed to update profile.");
      } else {
        toast.error("Failed to update profile.");
      }
    }
  };

  const handleCareRecipientSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careRecipient) return;
    try {
      await updateRequiredBy({ requiredBy: careRecipient }).unwrap();
      toast.success("Care recipient updated successfully.");
    } catch {
      toast.error("Failed to update care recipient.");
    }
  };

  // Skeleton loader for input fields with pulsing data area but static icon
  const InputSkeleton = ({ icon }: { icon: React.ReactNode }) => (
    <div className="flex items-center px-5 py-5 rounded-full border border-gray-300 mb-4">
      <div className="flex-1 h-6 rounded bg-gray-300 animate-pulse" />
      <span className="text-xl text-gray-500 ml-12">{icon}</span>
    </div>
  );

  return (
    <div>
      <div className="bg-[#F8F8F8] shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6 border-b pb-6">
            <h2 className="text-3xl font-semibold leading-8 text-[var(--navy)]">
              Personal Information
            </h2>
            <button
              type="submit"
              disabled={isUpdating || hasErrors}
              className={`flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[var(--navy)] px-4 py-2 rounded-full transition font-semibold ${
                isUpdating || hasErrors ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUpdating ? "Saving..." : "Save"}{" "}
              <span>
                <Image src="/Recent/file.png" alt="save" width={20} height={20} />
              </span>
            </button>
          </div>

          {isFetching ? (
            <>
              <InputSkeleton icon={UserIcon()} />
              <InputSkeleton icon={MailIcon()} />
              <InputSkeleton icon={UserIcon()} />
              <InputSkeleton icon={LocationIcon()} />
              <InputSkeleton icon={LocationIcon()} />
              <InputSkeleton icon={dailerIcon()} />
            </>
          ) : (
            <div className="space-y-4">
              <InputField
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                icon={UserIcon()}
                error={errors.name}
              />
              <InputField
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                icon={MailIcon()}
                error={errors.email}
                type="email"
                disabled={true}
              />
              <div className="space-y-1">
                <div
                  className={`flex items-center bg-white px-4 py-4 rounded-full border ${
                    errors.gender ? "border-red-500 ring-2 ring-red-400" : "focus-within:ring-2 ring-yellow-400"
                  }`}
                >
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="flex-1 bg-transparent outline-none text-lg text-[#2B384C]/60"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="text-xl ml-12 text-gray-500">
                    {UserIcon()}
                  </span>
                </div>
                {errors.gender && <p className="text-red-500 text-sm ml-4">{errors.gender}</p>}
              </div>
              <InputField
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                icon={LocationIcon()}
                error={errors.address}
              />
              {/* Zip Code */}
              <InputField
                name="zipcode"
                value={form.zipcode}
                onChange={handleChange}
                placeholder="Zip Code"
                icon={LocationIcon()}
                error={errors.zipcode}
                type="tel"
              />
              <InputField
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Phone Number"
                icon={dailerIcon()}
                error={errors.mobile}
                type="tel"
              />
            </div>
          )}
        </form>
      </div>

      {/* Care recipient section */}
      <div className="mt-10 bg-[#F8F8F8] shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto">
        <form onSubmit={handleCareRecipientSave}>
          <div className="flex justify-between items-center mb-6 border-b pb-6">
            <h2 className="text-3xl font-semibold leading-8 text-[var(--navy)]">
              Who Needs Home Care Service
            </h2>
            <button
              type="submit"
              disabled={isUpdatingRequiredBy || !careRecipient}
              className={`flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[var(--navy)] px-4 py-2 rounded-full transition font-semibold ${
                isUpdatingRequiredBy || !careRecipient ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUpdatingRequiredBy ? "Saving..." : "Save"}{" "}
              <span>
                <Image src="/Recent/file.png" alt="save" width={20} height={20} />
              </span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center bg-white px-4 py-4 rounded-full border focus-within:ring-2 ring-yellow-400">
                <select
                  name="careRecipient"
                  value={careRecipient}
                  onChange={handleCareRecipientChange}
                  className="flex-1 bg-transparent outline-none text-lg text-[#2B384C]/60"
                  disabled={isRequiredByLoading}
                >
                  <option value="">Select</option>
                  {CARE_RECIPIENT_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  type = "text",
  disabled = false,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div
        className={`flex items-center bg-white px-4 py-4 rounded-full border ${
          disabled
            ? "bg-gray-100 border-gray-300 cursor-not-allowed"
            : error
            ? "border-red-500 ring-2 ring-red-400"
            : "focus-within:ring-2 ring-yellow-400"
        }`}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 bg-transparent outline-none text-lg ${
            disabled 
              ? "text-gray-500 cursor-not-allowed" 
              : "text-[#2B384C]/60"
          }`}
          inputMode={type === "tel" ? "numeric" : undefined}
        />
        <span className={`text-xl ml-12 ${disabled ? "text-gray-400" : "text-gray-500"}`}>
          {icon}
        </span>
      </div>
      {error && <p className="text-red-500 text-sm ml-4">{error}</p>}
    </div>
  );
}
