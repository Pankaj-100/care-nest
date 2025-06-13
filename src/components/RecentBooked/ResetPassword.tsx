import React, { useState } from "react";
import { FiLock } from "react-icons/fi";

const ResetPassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resetting password:", form);
    // Add API call or logic here
  };

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 max-w-[818px] w-full mx-auto mt-10 shadow-sm">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-medium text-[#2B384C]">Reset Password</h2>
          <button
            type="submit"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[var(--navy)] px-4 py-2 rounded-full transition duration-200 ease-in-out font-semibold"
          >
            Save <span><img src="/Recent/file.png" alt="save" /></span>
          </button>
        </div>

        <div className="border border-b-1 my-4"></div>

        {[
          { label: "Current Password", name: "currentPassword" },
          { label: "New Password", name: "newPassword" },
          { label: "Confirm Password", name: "confirmPassword" },
        ].map((field) => (
          <div
            key={field.name}
            className="flex items-center px-5 py-4 rounded-full bg-[#F5F5F5] focus-within:ring-2 ring-yellow-400"
          >
            <input
              type={showPassword[field.name as keyof typeof showPassword] ? "text" : "password"}
              name={field.name}
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              placeholder={field.label}
              className="flex-1 bg-transparent outline-none text-[#2B384C]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility(field.name as keyof typeof showPassword)}
              className="text-gray-500 focus:outline-none ml-3"
              title="Toggle password visibility"
            >
              <FiLock className="text-xl" />
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ResetPassword;
