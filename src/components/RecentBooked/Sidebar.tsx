interface SidebarProps {
  onSelect: (value: string) => void;
  selected: string;
}

export function Sidebar({ onSelect, selected }: SidebarProps) {
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
      <div className="mt-2 flex flex-row items-center gap-2 mb-6 border-b border-[#00000033]">
        <img src="/Recent/profile.png" alt="User" className="w-[60px] h-[60px] rounded-full" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[var(--navy)]">Joe Done</h2>
          <p className="text-sm text-gray-500">abc@gmail.com</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-7">
        {profileItem.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.name)}
            className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 font-Urbanist text-[var(--navy)] border-b border-[#00000033] transition duration-200 ease-in-out
              ${selected === item.name ? "bg-yellow-400 rounded-full font-semibold" : "hover:bg-[#F2A307] hover:rounded-full"}
            `}
          >
            <span>{item.name}</span>
            <img src={item.icon} alt="arrow" className="w-2 h-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
