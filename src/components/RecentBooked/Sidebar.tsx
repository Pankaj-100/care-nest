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
import { X } from "lucide-react"; // Add this import at the top

interface SidebarProps {
  onSelect: (value: string) => void;
  selected: string;
}

export function Sidebar({ onSelect, selected }: SidebarProps) {
  const dispatch = useDispatch();
  const cdnURL = "https://dev-carenest.s3.ap-south-1.amazonaws.com";

  const { data: profileData } = useGetProfileQuery();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();

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
        toast.success("Profile image updated successfully");
      }
    } catch (err) {
      toast.error("Failed to update profile image");
    }
  };

  const handleRemoveAvatar = async () => {
    try{
      const res = await removeAvatar().unwrap();
      if(res?.success){
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
          <img
            src={avatar || "/Recent/profile.png"}
            alt="User Avatar"
            className="w-[68px] h-[68px] rounded-full object-cover"
          />
          {/* X icon appears only on hover and centered */}
          {avatar && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="absolute inset-0 flex items-center cursor-pointer justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Remove profile image"
            >
              <span className="bg-white rounded-full p-1 shadow ">
                <X size={15} />
              </span>
            </button>
          )}
          <label
            htmlFor="profileImageUpload"
            className="absolute bottom-0 right-0 cursor-pointer w-6 h-6 flex items-center justify-center transition"
            style={{ transform: "translate(30%, 30%)" }}
          >
            <span className="w-5 h-5 flex items-center justify-center " >{editprofileimage}</span>
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
