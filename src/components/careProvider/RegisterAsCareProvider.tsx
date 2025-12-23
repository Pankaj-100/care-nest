"use client";
import Image from "next/image";
import React, { useState } from "react";
import { YellowButton } from "../common/CustomButton";
import {PhoneIcon4, DescriptionIcon, AddressIcon, zipCodeIcon, MailIcon4, GenderIcon } from "../icons/page"
import { Phone } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "";

const RegisterAsCareProvider = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required.";
    else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ""))) newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    if (!gender.trim()) newErrors.gender = "Gender is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!zipcode.trim()) newErrors.zipcode = "Zipcode is required.";
    else if (!/^\d{5}$/.test(zipcode)) newErrors.zipcode = "Enter a valid 5-digit zipcode.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getEmailSuggestions = () => {
    if (!email || !email.includes("@")) return [];
    
    const [username, domain] = email.split("@");
    if (!username) return [];
    
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "aol.com",
    ];
    
    if (!domain) {
      // If user hasn't typed domain yet, show all suggestions
      return commonDomains.map(d => `${username}@${d}`);
    }
    
    // Filter domains that start with what user typed
    return commonDomains
      .filter(d => d.startsWith(domain.toLowerCase()))
      .map(d => `${username}@${d}`);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setShowEmailSuggestions(value.includes("@") && !value.endsWith(".com"));
  };

  const handleEmailSuggestionClick = (suggestion: string) => {
    setEmail(suggestion);
    setShowEmailSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API_BASE || submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/caregiver-application`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          gender,
          address,
          zipcode,
          description,
        }),
      });

      if (!res.ok) {
        console.error("Failed to submit caregiver application", await res.text());
        return;
      }

      // Reset form on success
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setGender("");
      setAddress("");
      setZipcode("");
      setDescription("");
      setErrors({});

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting caregiver application:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto relative">
      {showSuccess && (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div className="max-w-md w-full rounded-2xl bg-green-600 text-white px-4 py-3 shadow-lg text-center text-sm md:text-base">
            Application submitted successfully.
          </div>
        </div>
      )}
      <div className="relative w-full h-[550px] sm:h-[650px] lg:min-h-[1100px] lg:min-w-1/2">
        <Image
          src={"/register-care-provider.jpg"}
          alt="faq"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="lg:px-20 px-8 lg:py-20 py-12 flex justify-center bg-[var(--whiteSmoke)] lg:min-w-1/2 w-full">
        <div>
          <h1 className="text-4xl font-semibold  text-[var(--navy)]">
            Start Caring, Start Earning –  <br />Register as a Caregiver Now
          </h1>

          <form className="mt-8" onSubmit={handleSubmit} noValidate>
            <Input
              placeholder="Enter Name"
              icon="/user-icon.svg"
              type="text"
              value={fullName}
              onChange={setFullName}
              error={errors.fullName}
            />
            <EmailInput
              placeholder="Enter Email ID"
              icon={MailIcon4}
              value={email}
              onChange={handleEmailChange}
              error={errors.email}
              suggestions={getEmailSuggestions()}
              showSuggestions={showEmailSuggestions}
              onSuggestionClick={handleEmailSuggestionClick}
              onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
            />
            <Input
              placeholder="Enter Phone Number"
              icon={PhoneIcon4}
              type="tel"
              value={phoneNumber}
              onChange={(val) => setPhoneNumber(val.replace(/[^\d]/g, ""))}
              error={errors.phoneNumber}
            />
            <Input
              placeholder="Enter Gender"
              icon={GenderIcon}
              type="text"
              value={gender}
              onChange={setGender}
              error={errors.gender}
            />
            <Input
              placeholder="Enter Address"
              icon={AddressIcon}
              type="text"
              value={address}
              onChange={setAddress}
              error={errors.address}
            />
            <Input
              placeholder="Enter Zipcode"
              icon={AddressIcon}
              type="text"
              value={zipcode}
              onChange={(val) => setZipcode(val.replace(/[^\d]/g, ""))}
              error={errors.zipcode}
            />
            <InputArea icon={DescriptionIcon} value={description} onChange={setDescription} error={errors.description} />
            <YellowButton className="w-full mt-8 text-lg py-6" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </YellowButton>
          </form>
        </div>
      </div>
    </div>
  );
};

interface InputProps {
  placeholder: string;
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Input = ({ placeholder, icon, type = "text", value, onChange, error }: InputProps) => {
  const Icon = typeof icon === 'string' ? null : icon;
  return (
    <div className="flex flex-col mb-5">
      <div className="flex bg-white rounded-3xl p-4 items-center gap-x-5">
        <div className="relative w-5 h-5">
          {typeof icon === 'string' ? (
            <Image src={icon} alt="icon" fill />
          ) : (
            Icon && <Icon />
          )}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="outline-none w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>}
    </div>
  );
};

interface EmailInputProps {
  placeholder: string;
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  suggestions: string[];
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onBlur: () => void;
}

const EmailInput = ({ placeholder, icon, value, onChange, error, suggestions, showSuggestions, onSuggestionClick, onBlur }: EmailInputProps) => {
  const Icon = typeof icon === 'string' ? null : icon;
  return (
    <div className="flex flex-col mb-5 relative">
      <div className="flex bg-white rounded-3xl p-4 items-center gap-x-5">
        <div className="relative w-5 h-5">
          {typeof icon === 'string' ? (
            <Image src={icon} alt="icon" fill />
          ) : (
            Icon && <Icon />
          )}
        </div>
        <input
          type="email"
          placeholder={placeholder}
          className="outline-none w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {error && <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>}
    </div>
  );
};

interface InputAreaProps {
  icon?: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const InputArea = ({ icon, value, onChange, error }: InputAreaProps) => {
  const Icon = typeof icon === 'string' ? null : icon;
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-start bg-white rounded-3xl p-3 gap-3">
        <div className="w-6 h-6 min-w-[24px] relative mt-2">
          {typeof icon === 'string' ? (
            <Image src={icon} alt="icon" fill />
          ) : (
            Icon ? <Icon /> : <Image src="/write-icon.svg" alt="write icon" fill />
          )}
        </div>
        <textarea
          className="w-full rounded-2xl p-2 outline-none resize-none"
          placeholder="Write a brief description"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      </div>
      {error && <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>}
    </div>
  );
};

export default RegisterAsCareProvider;
