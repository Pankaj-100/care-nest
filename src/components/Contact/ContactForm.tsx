"use client";

import { useState, FormEvent } from "react";

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormProps>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // add the api
  };

  return (
    <div className="w-full md:w-[32rem] lg:p-6 p-4  bg-[var(--cream)] rounded-3xl shadow-md ">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:mt-10 mt-3 lg:mb-10 mb-3 "
      >
        <h3 className="text-2xl font-semibold text-[var(--navy)] mb-4">
          Get in Touch With Us
        </h3>

        <div className="relative">
          <img
            src="/Contact/user-icon.png"
            alt="Name"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />

          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full pl-12 pr-4 max-w-lg px-4 py-3 border bg-white  rounded-full focus:outline-none  "
            required
          />
        </div>

        <div className="relative">
          <img
            src="/Contact/email-icon.png"
            alt="Name"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter EmailID"
            className="w-full pl-12 pr-4 max-w-lg  px-4 py-3 border bg-white  rounded-full focus:outline-none "
            required
          />
        </div>

        <div className="relative">
          <img
            src="/Contact/majesticons-icon.png"
            alt="Name"
            className="absolute left-4 top-4 w-5 h-5"
          />

          <textarea
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a brief description"
            className="w-full max-w-lg pl-12 pr-4 px-4 py-3 border bg-white  rounded-3xl focus:outline-none "
            required
          />
        </div>

        <button
          type="submit"
          className="w-full max-w-lg bg-[var(--navy)] text-white py-3 rounded-full transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
