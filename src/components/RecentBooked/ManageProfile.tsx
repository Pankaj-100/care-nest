import {
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,

} from "react-icons/fi";

import React, { useState } from "react";

export default function ManageProfile() {
  const [form, setForm] = useState({
    name: "Joe Done",
    email: "joedone@gmail.com",
    gender: "Female",
    address: "123, street road, place name, city",
    phone: "987 654 3210",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted profile:", form);
  
  };

  return (
    <div className="bg-[#F8F8F8] shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-6">
          <h2 className="text-3xl font-semibold leading-8 text-[var(--navy)]">
            Personal Information
          </h2>
          <button
            type="submit"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[var(--navy)] px-4 py-2 rounded-full transition duration-200 ease-in-out font-semibold"
          >
            Save <span><img src="/Recent/file.png" alt="save" /></span>
          </button>
        </div>

        <div className="space-y-4">
          <InputField
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            icon={<FiUser />}
          />
          <InputField
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            icon={<FiMail />}
          />
          <InputField
            name="gender"
            value={form.gender}
            onChange={handleChange}
            placeholder="Gender"
            icon={<FiUser />}
          />
          <InputField
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            icon={<FiMapPin />}
          />
          <InputField
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            icon={<FiPhone/>}
          />
        </div>
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
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center bg-white px-4 py-4 rounded-full border focus-within:ring-2 ring-yellow-400">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-lg text-[#2B384C]/60"
      />
      <span className="text-xl text-gray-500 ml-3">{icon}</span>
    </div>
  );
}
