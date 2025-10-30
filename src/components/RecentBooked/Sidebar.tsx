import React, { useEffect } from "react";
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

interface SidebarProps {
  onSelect: (value: string) => void;
  selected: string;
}

export function Sidebar({ onSelect, selected }: SidebarProps) {
  const dispatch = useDispatch();
  const cdnURL = "https://creative-story.s3.us-east-1.amazonaws.com";

  const { data: profileData } = useGetProfileQuery();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();

  const { name, email, avatar, address, mobile, gender } = useSelector(
    (state: RootState) => state.profile
  );

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
        // Create a temporary preview URL for immediate feedback
        const localAvatarURL = URL.createObjectURL(file);
        
        dispatch(
          setProfile({
            name,
            email,
            avatar: localAvatarURL,
            address,
            mobile,
            gender,
          })
        );
        
        toast.success("Profile image updated successfully");
        
        // Refresh the profile data after a short delay to get the actual S3 URL
        setTimeout(() => {
          // This will trigger a re-fetch of profile data
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
    { id: 1, name: "Manage Profile", icon: "/Recent/right-arrow.png" },
    { id: 2, name: "Recent Booking", icon: "/Recent/right-arrow.png" },
    { id: 3, name: "Saved Caregivers", icon: "/Recent/right-arrow.png" },
    { id: 4, name: "Reset Password", icon: "/Recent/right-arrow.png" },
    { id: 5, name: "Delete Account", icon: "/Recent/right-arrow.png" },
    { id: 6, name: "Logout", icon: "/Recent/right-arrow.png" },
  ];

  return (
    <div className="w-full md:w-1/4 p-6 shadow-lg rounded-lg h-[520px] mt-10">
      {/* Profile Info */}
      <div className="mt-2 flex flex-row items-center gap-2 mb-6 border-b border-[#00000033] py-1">
        <div className="relative w-[68px] h-[68px] group">
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

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[var(--navy)]">
            {name || "Your Name"}
          </h2>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-7">
        {profileItem.map((item, idx) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.name)}
            className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 font-Urbanist text-[var(--navy)] transition duration-200 ease-in-out ${
              selected === item.name
                ? "bg-yellow-400 rounded-full font-semibold"
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
    </div>
  );
}
