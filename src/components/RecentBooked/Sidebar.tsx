import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { editprofileimage } from "@/lib/svg_icons";
import {
  useGetProfileQuery,
  useUpdateAvatarMutation,
  useRemoveAvatarMutation,
} from "@/store/api/profileApi";
import { setProfile } from "../../store/profileSlice";
import { toast } from "react-toastify";
import { X } from "lucide-react"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import AccountDelete from "./AccountDelete";

interface SidebarProps {
  onSelect: (value: string) => void;
  selected: string;
}

export function Sidebar({ onSelect, selected }: SidebarProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cdnURL = process.env.NEXT_STORAGE_BUCKET || "";

  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();

  const { name, email, avatar, address, mobile, gender } = useSelector(
    (state: RootState) => state.profile
  ) as { name: string; email: string; avatar: string | null; address: string; mobile: string; gender: string };

  const [showLogout, setShowLogout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Helper function to construct proper avatar URL
  const getAvatarUrl = (avatarPath: string | null | undefined): string | null => {
    if (!avatarPath) return null;
    
    // If it's already a complete URL, return as is
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
      return avatarPath;
    }
    
    // Clean up the path - remove leading slashes
    const cleanPath = avatarPath.replace(/^\/+/, '');
    
    // Return the properly constructed URL
    return `${cdnURL}/${cleanPath}`;
  };

  // Sync fetched profile data to Redux state
  useEffect(() => {
    if (profileData) {
      const avatarUrl = getAvatarUrl(profileData.avatar);
      const updatedProfile = {
        ...profileData,
        avatar: avatarUrl,
      };
      dispatch(setProfile(updatedProfile));
    }
  }, [profileData, dispatch]);

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await updateAvatar(formData).unwrap();
      if (res?.success) {
        toast.success("Profile image updated successfully");
        
        // Refetch profile data and wait for it to complete before rendering
        await refetch();
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
        dispatch(
          setProfile({
            name,
            email,
            avatar: null,
            address,
            mobile,
            gender,
          })
        );
        toast.success("Profile image removed successfully");
      }
    } catch (error) {
      console.error('Avatar removal error:', error);
      toast.error("Failed to remove profile image");
    }
  };

  const profileItem = [
    { id: 1, name: "Manage Profile", icon: "/Recent/right-arrow.png", route: "/profile" },
    { id: 2, name: "Recent Care Requests", icon: "/Recent/right-arrow.png", route: "/recent-booking" },
    { id: 3, name: "Saved Caregivers", icon: "/Recent/right-arrow.png", route: "/saved-caregiver" },
    { id: 4, name: "Reset Password", icon: "/Recent/right-arrow.png", route: "/password-reset" },
    { id: 5, name: "Delete Account", icon: "/Recent/right-arrow.png" },
    { id: 6, name: "Logout", icon: "/Recent/right-arrow.png" },
  ];

  return (
    <>
      <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 p-4 md:p-4 lg:p-6 shadow-lg rounded-lg h-auto md:h-[550px] lg:h-[520px] mt-10">
        {isLoading ? (
          /* Skeleton Loading State */
          <div className="animate-pulse">
            {/* Profile Info Skeleton */}
            <div className="mt-2 flex flex-row items-start gap-3 mb-6 border-b border-[#00000033] pb-1">
              <div className="w-[68px] h-[68px] rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="flex flex-col flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>

            {/* Menu Items Skeleton */}
            <ul className="space-y-4 md:space-y-4 lg:space-y-7">
              {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                <li
                  key={item}
                  className={`flex items-center justify-between gap-2 px-4 py-2 text-sm md:text-sm lg:text-base ${
                    idx !== 5 ? "border-b border-[#00000033]" : ""
                  }`}
                >
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded"></div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {/* Profile Info */}
            <div className="mt-2 flex flex-row items-start gap-3 mb-6 border-b border-[#00000033] pb-1">
              <div className="relative w-[68px] h-[68px] flex-shrink-0 group">
                <Image
                  src={avatar || "/Recent/profile.png"}
                  alt="User Avatar"
                  width={68}
                  height={68}
                  className="w-[68px] h-[68px] rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to default image on error
                    const target = e.target as HTMLImageElement;
                    target.src = "/Recent/profile.png";
                  }}
                  unoptimized={avatar?.startsWith('blob:') || false} // For temporary blob URLs
                />
                {/* X icon appears only on hover and centered */}
                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute inset-0 flex items-center cursor-pointer justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Remove profile image"
                  >
                    <span className="bg-white rounded-full p-1 shadow">
                      <X size={15} />
                    </span>
                  </button>
                )}
                <label
                  htmlFor="profileImageUpload"
                  className="absolute bottom-0 right-0 cursor-pointer w-6 h-6 flex items-center justify-center transition"
                  style={{ transform: "translate(30%, 30%)" }}
                >
                  <span className="w-5 h-5 flex items-center justify-center">{editprofileimage}</span>
                </label>
                <input
                  type="file"
                  id="profileImageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="text-base font-bold text-[var(--navy)] break-words leading-tight line-clamp-4">
                  {name || "Your Name"}
                </h2>
              </div>
            </div>

            {/* Menu Items */}
            <ul className="space-y-4 md:space-y-4 lg:space-y-7">
              {profileItem.map((item, idx) => (
                <li
                  key={item.id}
                  onClick={() => {
                    if (item.name === "Logout") {
                      setShowLogout(true);
                      return;
                    }
                    if (item.name === "Delete Account") {
                      setShowDelete(true);
                      return;
                    }
                    onSelect(item.name);
                    if (item.route) {
                      router.push(item.route);
                    }
                  }}
                  className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 font-Urbanist text-sm md:text-sm lg:text-base text-[var(--navy)] transition duration-200 ease-in-out ${
                    selected === item.name
                      ? "bg-[#F2A307] rounded-full font-semibold"
                      : "hover:bg-[#F2A307] hover:rounded-full"
                  } ${idx !== profileItem.length - 1 ? "border-b border-[#00000033]" : ""}`}
                >
                  <span>{item.name}</span>
                  <Image
                    src={item.icon}
                    alt="arrow"
                    width={9}
                    height={9}
                    className="w-2 h-2"
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Logout dialog (mounted when requested) */}
      {showLogout && (
        <Logout
          goTo={(value: string) => {
            setShowLogout(false);
            // pass selection back to parent if needed
            onSelect?.(value);
          }}
        />
      )}

      {showDelete && (
        <AccountDelete
          goTo={(value: string) => {
            setShowDelete(false);
            onSelect?.(value);
          }}
        />
      )}
    </>
  );
}
