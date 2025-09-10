"use client";

import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { toast } from "react-toastify";
import Image from "next/image";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/profileApi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ManageProfile() {
  const { data: profile, isLoading: isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    zipcode: "",
  });

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
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        gender: profile.gender || "",
        address: profile.address || "",
        mobile: profile.mobile || "",
        // profile.zipcode can be number or string; normalize to string for input
        zipcode:
          typeof (profile as any).zipcode === "number"
            ? String((profile as any).zipcode)
            : (profile as any).zipcode || "",
      });
    }
  }, [profile]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Keep only digits for numeric fields
    const nextVal =
      name === "mobile" || name === "zipcode" ? value.replace(/\D/g, "") : value;

    setForm((prev) => ({ ...prev, [name]: nextVal }));

    // Validate on change
    const error = validateField(name, nextVal);
    setErrors((prev) => ({ ...prev, [name]: error }));
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

  // Skeleton loader for input fields with pulsing data area but static icon
  const InputSkeleton = ({ icon }: { icon: React.ReactNode }) => (
    <div className="flex items-center px-4 py-4 rounded-full border border-gray-300 mb-4 ">
      <div className="flex-1  rounded bg-gray-300 animate-pulse " />
      <span className="text-xl text-gray-500 ml-3">{icon}</span>
    </div>
  );

  return (
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
            <InputSkeleton icon={<FiUser />} />
            <InputSkeleton icon={<FiMail />} />
            <InputSkeleton icon={<FiUser />} />
            <InputSkeleton icon={<FiMapPin />} />
            <InputSkeleton icon={<FiMapPin />} />
            <InputSkeleton icon={<FiPhone />} />
          </>
        ) : (
          <div className="space-y-4">
            <InputField
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              icon={<FiUser />}
              error={errors.name}
            />
            <InputField
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              icon={<FiMail />}
              error={errors.email}
              type="email"
            />
            <InputField
              name="gender"
              value={form.gender}
              onChange={handleChange}
              placeholder="Gender"
              icon={<FiUser />}
              error={errors.gender}
            />
            <InputField
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              icon={<FiMapPin />}
              error={errors.address}
            />
            {/* Zip Code */}
            <InputField
              name="zipcode"
              value={form.zipcode}
              onChange={handleChange}
              placeholder="Zip Code"
              icon={<FiMapPin />}
              error={errors.zipcode}
              type="tel"
            />
            <InputField
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Phone Number"
              icon={<FiPhone />}
              error={errors.mobile}
              type="tel"
            />
          </div>
        )}
      </form>
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
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <div className="space-y-1">
      <div
        className={`flex items-center bg-white px-4 py-4 rounded-full border ${
          error
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
          className="flex-1 bg-transparent outline-none text-lg text-[#2B384C]/60"
          inputMode={type === "tel" ? "numeric" : undefined}
        />
        <span className="text-xl text-gray-500 ml-3">{icon}</span>
      </div>
      {error && <p className="text-red-500 text-sm ml-4">{error}</p>}
    </div>
  );
}
