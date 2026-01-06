"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setProfile } from "../../store/profileSlice";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetRequiredByQuery,
  useUpdateRequiredByMutation,
  useUpdateAvatarMutation,
  useRemoveAvatarMutation,
} from "@/store/api/profileApi";
import { MailIcon, UserIcon, LocationIcon, dailerIcon } from "../icons/page";
import { editprofileimage } from "@/lib/svg_icons";

// Add a narrow type for API profile (no any)
type ProfileApi = {
  name?: string;
  email?: string;
  gender?: string;
  address?: string;
  mobile?: string;
  zipcode?: number | string;
  zipCode?: number | string;
  avatar?: string | null;
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
  const dispatch = useDispatch();
  const cdnURL = "https://creative-story.s3.us-east-1.amazonaws.com";
  
  const { data: profile, isLoading: isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();

  const { data: requiredBy, isLoading: isRequiredByLoading } = useGetRequiredByQuery();
  const [updateRequiredBy, { isLoading: isUpdatingRequiredBy }] = useUpdateRequiredByMutation();
  
  const profileState = useSelector((state: RootState) => state.profile) as {
    name: string;
    email: string;
    avatar: string | null;
    address: string;
    mobile: string;
    gender: string;
  };

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

  // Helper function to construct proper avatar URL
  const getAvatarUrl = (avatarPath: string | null | undefined): string | null => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
      return avatarPath;
    }
    const cleanPath = avatarPath.replace(/^\/+/, '');
    return `${cdnURL}/${cleanPath}`;
  };

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
        careRecipient: "",
      });
      
      // Update Redux state with avatar
      const avatarUrl = getAvatarUrl(p.avatar);
      dispatch(setProfile({
        name: p.name || "",
        email: p.email || "",
        avatar: avatarUrl,
        address: p.address || "",
        mobile: p.mobile || "",
        gender: p.gender || "",
      }));
    }
  }, [profile, dispatch]);

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
        return /^\d{5}$/.test(value) ? "" : "Zip code must be 5 digits";
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await updateAvatar(formData).unwrap();
      if (res?.success) {
        const localAvatarURL = URL.createObjectURL(file);
        dispatch(setProfile({
          ...profileState,
          avatar: localAvatarURL,
        }));
        toast.success("Profile image updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error("Failed to update profile image");
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const res = await removeAvatar().unwrap();
      if (res?.success) {
        dispatch(setProfile({
          ...profileState,
          avatar: null,
        }));
        toast.success("Profile image removed successfully");
      }
    } catch (error) {
      console.error('Avatar removal error:', error);
      toast.error("Failed to remove profile image");
    }
  };

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

 {/* const handleCareRecipientSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careRecipient) return;
    try {
      await updateRequiredBy({ requiredBy: careRecipient }).unwrap();
      toast.success("Care recipient updated successfully.");
    } catch {
      toast.error("Failed to update care recipient.");
    }
  }; /*/}

  // Skeleton loader for input fields with pulsing data area but static icon
  const InputSkeleton = ({ icon }: { icon: React.ReactNode }) => (
    <div className="flex items-center px-5 py-5 rounded-full border border-gray-300 mb-4">
      <div className="flex-1 h-6 rounded bg-gray-300 animate-pulse" />
      <span className="text-xl text-gray-500 ml-12">{icon}</span>
    </div>
  );

  return (
    <div>
      <div className="bg-[#FFFFFF] shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto mt-10">
        <form onSubmit={handleSubmit}>
          {/* Mobile Profile Header */}
          <div className="md:hidden flex items-center gap-6 mb-6 pb-6 border-b">
            <div className="relative w-20 h-20 flex-shrink-0 group">
              <Image
                src={profileState.avatar || "/Recent/profile.png"}
                alt="User Avatar"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/Recent/profile.png";
                }}
                unoptimized={profileState.avatar?.startsWith('blob:') || false}
              />
              {profileState.avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="absolute inset-0 flex items-center cursor-pointer justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Remove profile image"
                >
                  <span className="bg-white rounded-full p-1 shadow">
                    <X size={16} />
                  </span>
                </button>
              )}
              <label
                htmlFor="mobileProfileImageUpload"
                className="absolute bottom-0 right-0 cursor-pointer w-6 h-6 flex items-center justify-center transition"
                style={{ transform: "translate(20%, 20%)" }}
              >
                <span className="w-5 h-5 flex items-center justify-center">{editprofileimage}</span>
              </label>
              <input
                type="file"
                id="mobileProfileImageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-[var(--navy)] truncate">
                {profileState.name || form.name || "Your Name"}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                {profileState.email || form.email || "your@email.com"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 border-b pb-6 text-center sm:text-left">
            <h2 className="text-2xl lg:text-3xl font-semibold leading-8 text-[var(--navy)]">
              Personal Information
            </h2>
            <button
              type="submit"
              disabled={isUpdating || hasErrors}
              className={`hidden sm:flex items-center gap-2 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-[var(--navy)] px-4 py-2 rounded-full transition font-semibold ${
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
                  className={`flex items-center gap-3 bg-[#F8F8F8] px-4 py-4 rounded-full border ${
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
                  <span className="text-xl text-gray-500 flex-shrink-0">
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

          {/* Mobile Save Button - appears below fields on mobile only */}
          <button
            type="submit"
            disabled={isUpdating || hasErrors}
            className={`flex sm:hidden items-center justify-center gap-2 w-full cursor-pointer bg-[#F2A307] hover:bg-yellow-500 text-[var(--navy)] px-4 py-3 rounded-full transition font-semibold mt-6 ${
              isUpdating || hasErrors ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Saving..." : "Save"}{" "}
            <span>
              <Image src="/Recent/file.png" alt="save" width={20} height={20} />
            </span>
          </button>
        </form>
      </div>

      {/* Care recipient section 
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
      </div> */}
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
        className={`flex items-center gap-3 bg-[#F8F8F8] px-4 py-4 rounded-full border ${
          disabled
            ? "bg-[#FFFFFF] cursor-not-allowed"
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
        <span className={`text-xl ${disabled ? "text-gray-400" : "text-gray-500"} flex-shrink-0`}>
          {icon}
        </span>
      </div>
      {error && <p className="text-red-500 text-sm ml-4">{error}</p>}
    </div>
  );
}
