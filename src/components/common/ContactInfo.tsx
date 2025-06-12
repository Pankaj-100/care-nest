import Image from "next/image";
import React from "react";

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
        width={24}
        height={24}
        className="w-4 h-4"
      />
    </div>
    <div>
      <p className="text-md font-medium">{label}</p>
      <p className="text-md text-[var(--cool-gray)]">{value}</p>
    </div>
  </div>
);

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6 lg:p-4 ">
      <h2 className="text-3xl text-[var(--navy)] font-semibold mb-4 ">
        Contact Us
      </h2>
      <ContactItem
        icon={"/Contact/phone.png"}
        label={"Phone Number"}
        value={"976543210"}
      />
      <ContactItem
        icon={"/Contact/email.png"}
        label={"Email ID"}
        value={"care@wellnurtured.com"}
      />
      <ContactItem
        icon={"/Contact/location.png"}
        label={"Address"}
        value={"123, East Sample Street, City, State"}
      />
      <ContactItem
        icon={"/Contact/clock.png"}
        label={"Business Hours"}
        value={"09:00 AM - 08:00 PM"}
      />
    </div>
  );
};

export default ContactInfo;
