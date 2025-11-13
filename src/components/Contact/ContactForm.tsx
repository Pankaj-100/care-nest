"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

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

  const [loading, setLoading] = useState(false); // changed code: loading state

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || ""; // changed code: env base

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/inquiry`;
      const payload = {
        name: formData.name,
        email: formData.email,
        description: formData.message, // API expects "description"
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        const msg = json?.message || `Request failed with status ${res.status}`;
        toast.error(msg);
        setLoading(false);
        return;
      }

      // success
      toast.success(json?.message ?? "Inquiry submitted successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Inquiry submit error:", err);
      toast.error("Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[34rem] lg:p-10 p-4  px-14 bg-[var(--cream)] rounded-3xl shadow-md ">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:mt-10 mt-3 lg:mb-10 mb-3 "
      >
        <h3 className="text-2xl font-semibold text-[var(--navy)] mb-4">
          Get in Touch With Us
        </h3>

        <div className="relative">
          <Image
            src="/Contact/user-icon.png"
            alt="Name"
            width={20}
            height={20}
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
          <Image
            src="/Contact/email-icon.png"
            alt="Name"
            width={20}
            height={20}
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
          <Image
            src="/Contact/majesticons-icon.png"
            alt="Name"
            width={20}
            height={20}
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
          disabled={loading}
          className="w-full cursor-pointer max-w-lg bg-[var(--navy)] text-white py-3 rounded-full transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
