"use client";
import Image from "next/image";
import React, { useState } from "react";
import { YellowButton } from "../common/CustomButton";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API_BASE || submitting) return;

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

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting caregiver application:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-auto relative">
      {showSuccess && (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div className="max-w-md w-full rounded-2xl bg-green-600 text-white px-4 py-3 shadow-lg text-center text-sm md:text-base">
            Application submitted successfully.
          </div>
        </div>
      )}
      <div className="relative   lg:min-h-[800px] lg:min-w-1/2">
        <Image
          src={"/register-care-provider.jpg"}
          alt="faq"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="lg:px-20 px-8 lg:py-20 py-12 flex justify-center bg-[var(--whiteSmoke)] lg:min-w-1/2">
        <div>
          <h1 className="text-4xl font-medium  text-[var(--navy)]">
            Start Caring, Start Earning –  <br />Register as a Caregiver Now
          </h1>

          <form className="mt-8" onSubmit={handleSubmit}>
            <Input
              placeholder="Full Name"
              icon="/user-icon.svg"
              type="text"
              value={fullName}
              onChange={setFullName}
            />
            <Input
              placeholder="Enter Email ID"
              icon="/email-icon.svg"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              placeholder="Enter Phone Number"
              icon="/phone-icon.svg"
              type="tel"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            <Input
              placeholder="Enter Gender"
              icon="/gender-icon.svg"
              type="text"
              value={gender}
              onChange={setGender}
            />
            <Input
              placeholder="Enter Address"
              icon="/map-icon.svg"
              type="text"
              value={address}
              onChange={setAddress}
            />
            <Input
              placeholder="Enter Zipcode"
              icon="/correct-notcorrect-icon.svg"
              type="text"
              value={zipcode}
              onChange={setZipcode}
            />
            <InputArea value={description} onChange={setDescription} />
            <YellowButton className="w-full mt-8 text-lg py-4" disabled={submitting}>
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
  icon: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ placeholder, icon, type = "text", value, onChange }: InputProps) => {
  return (
    <div className="flex bg-white rounded-3xl p-4 items-center gap-x-3 mb-5">
      <div className="relative w-5 h-5">
        <Image src={icon} alt="icon" fill />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="outline-none w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const InputArea = ({ value, onChange }: InputAreaProps) => {
  return (
    <div className="flex items-start bg-white rounded-3xl p-3 gap-3">
      <div className="w-6 h-6 min-w-[24px] relative mt-2">
        <Image src="/write-icon.svg" alt="write icon" fill />
      </div>
      <textarea
        className="w-full rounded-2xl p-2 outline-none resize-none"
        placeholder="Write a brief description"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default RegisterAsCareProvider;
