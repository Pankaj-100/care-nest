import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { editprofileimage } from "@/lib/svg_icons";
import {
  useGetProfileQuery,
  useUpdateAvatarMutation,
} from "@/store/api/profileApi";
import { setProfile } from "../../store/profileSlice";

interface SidebarProps {
  onSelect: (value: string) => void;
  selected: string;
}

export function Sidebar({ onSelect, selected }: SidebarProps) {
  const dispatch = useDispatch();
  const cdnURL = "https://dev-carenest.s3.ap-south-1.amazonaws.com";

  const { data: profileData } = useGetProfileQuery();
  const [updateAvatar] = useUpdateAvatarMutation();

  const { name, email, avatar, address, mobile, gender } = useSelector(
    (state: RootState) => state.profile
  );

  // Sync fetched profile data to Redux state (prepend CDN only here)
  useEffect(() => {
    if (profileData) {
      const updatedProfile = {
        ...profileData,
        avatar: profileData.avatar
          ? `${cdnURL}/${profileData.avatar}`
          : null,
      };
      dispatch(setProfile(updatedProfile));
    }
  }, [profileData, dispatch]);

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // Make sure the field name matches API

    try {
      const res = await updateAvatar(formData).unwrap();
      if (res?.success) {
        const localAvatarURL = URL.createObjectURL(file); // Use temporary preview
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
      }
    } catch (err) {
      console.error("Failed to update avatar:", err);
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
        <div className="relative w-[75px] h-[75px]">
          <img
            src={avatar || "/Recent/profile.png"}
            alt="User Avatar"
            className="w-[75px] h-[75px] rounded-full object-cover"
          />
          <label
            htmlFor="profileImageUpload"
            className="absolute bottom-[-5px] right-[-5px] cursor-pointer"
          >
            {editprofileimage}
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
          <p className="text-sm text-gray-500">
            {email || "email@example.com"}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-7">
        {profileItem.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.name)}
            className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 font-Urbanist text-[var(--navy)] border-b border-[#00000033] transition duration-200 ease-in-out ${
              selected === item.name
                ? "bg-yellow-400 rounded-full font-semibold"
                : "hover:bg-[#F2A307] hover:rounded-full"
            }`}
          >
            <span>{item.name}</span>
            <img src={item.icon} alt="arrow" className="w-2 h-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
