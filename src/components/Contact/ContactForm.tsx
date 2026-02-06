"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
  zipcode: string;
  phone: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormProps>({
    name: "",
    email: "",
    message: "",
    zipcode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false); // changed code: loading state
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormProps, string>>>({});

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || ""; // changed code: env base

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormProps]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only digits
    const numericValue = value.replace(/\D/g, "");
    
    if (errors[name as keyof ContactFormProps]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormProps, string>> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Zipcode validation (5 digits)
    const zipcodeRegex = /^\d{5}$/;
    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Zip code is required";
    } else if (!zipcodeRegex.test(formData.zipcode)) {
      newErrors.zipcode = "Please enter a valid 5-digit zip code";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setLoading(true);
    try {
      const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/inquiry`;
      const payload = {
        name: formData.name,
        email: formData.email,
        description: formData.message, // API expects "description"
        zipcode: formData.zipcode,
        phone: formData.phone,
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
      toast.success("Contact us form submitted successfully, We will respond shortly!");
      setFormData({ name: "", email: "", message: "", zipcode: "", phone: "" });
    } catch (err) {
      console.error("Contact us form submit error:", err);
      toast.error("Failed to submit contact us form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[41rem] bg-[var(--cream)] rounded-3xl shadow-md px-4 py-6 sm:px-6 sm:py-7 lg:px-10 lg:py-10 text-lg">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:mt-10 mt-3 lg:mb-10 mb-4 "
      >
        <h3 className="text-2xl lg:text-3xl font-semibold text-[var(--navy)] mb-4">
          Get In Touch With Us
        </h3>

        <div>
          <div className="relative">
            <Image
              src="/Contact/user-icon.png"
              alt="Name"
              width={20}
              height={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
            />
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className={`w-full pl-12 pr-4 px-4 py-3 border bg-white rounded-full focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
              required
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 ml-4">{errors.name}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Image
              src="/Contact/email-icon.png"
              alt="Email"
              width={20}
              height={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter EmailID"
              className={`w-full pl-12 pr-4 px-4 py-3 border bg-white rounded-full focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ml-4">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Image
              src="/Contact/location2.png"
              alt="Zip code"
              width={20}
              height={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
            />
            <input
              name="zipcode"
              type="text"
              value={formData.zipcode}
              onChange={handleNumericInput}
              placeholder="Enter Zip code"
              maxLength={5}
              className={`w-full pl-12 pr-4 px-4 py-3 border bg-white rounded-full focus:outline-none ${errors.zipcode ? 'border-red-500' : ''}`}
              required
            />
          </div>
          {errors.zipcode && (
            <p className="text-red-500 text-sm mt-1 ml-4">{errors.zipcode}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Image
              src="/Contact/phone2.png"
              alt="Phone No"
              width={20}
              height={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
            />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleNumericInput}
              placeholder="Enter Phone No"
              maxLength={10}
              className={`w-full pl-12 pr-4 px-4 py-3 border bg-white rounded-full focus:outline-none ${errors.phone ? 'border-red-500' : ''}`}
              required
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 ml-4">{errors.phone}</p>
          )}
        </div>


        <div>
          <div className="relative">
            <Image
              src="/Contact/majesticons-icon.png"
              alt="Name"
              width={20}
              height={20}
              className="absolute left-4 top-4 w-5 h-5 z-10"
            />

            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write a brief description"
              className={`w-full pl-12 pr-4 px-4 py-3 border bg-white rounded-3xl focus:outline-none ${errors.message ? 'border-red-500' : ''}`}
              required
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 ml-4">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-[var(--navy)] text-white py-3 rounded-full transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
