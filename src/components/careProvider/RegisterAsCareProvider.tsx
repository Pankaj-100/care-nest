import Image from "next/image";
import React from "react";
import { YellowButton } from "../common/CustomButton";

const inputsData = [
  {
    placeholder: "Full Name",
    icon: "/user-icon.svg",
    type: "text",
  },
  {
    placeholder: "Enter Email ID",
    icon: "/email-icon.svg",
    type: "email",
  },
  {
    placeholder: "Enter Phone Number",
    icon: "/phone-icon.svg",
    type: "number",
  },
  {
    placeholder: "Enter Gender",
    icon: "/gender-icon.svg",
    type: "text",
  },
  {
    placeholder: "Enter Address",
    icon: "/map-icon.svg",
    type: "text",
  },
  {
    placeholder: "Enter Availability",
    icon: "/correct-notcorrect-icon.svg",
    type: "text",
  },
];

const RegisterAsCareProvider = () => {
  return (
    <div className="flex h-auto ">
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

          <form className="mt-8">
            {inputsData.map((input, index) => (
              <Input
                key={index}
                placeholder={input.placeholder}
                icon={input.icon}
                type={input.type}
              />
            ))}
            <InputArea />
            <YellowButton className="w-full mt-8">Submit</YellowButton>
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
}

const Input = ({ placeholder, icon, type = "text" }: InputProps) => {
  return (
    <div className="flex bg-white rounded-3xl p-4 items-center gap-x-3 mb-5">
      <div className="relative w-5 h-5">
        <Image src={icon} alt="icon" fill />
      </div>
      <input type={type} placeholder={placeholder} className="outline-none" />
    </div>
  );
};

const InputArea = () => {
  return (
    <div className="flex items-start bg-white rounded-3xl p-3 gap-3">
      <div className="w-6 h-6 min-w-[24px] relative mt-2">
        <Image src="/write-icon.svg" alt="write icon" fill />
      </div>
      <textarea
        className="w-full rounded-2xl p-2 outline-none resize-none"
        placeholder="Write a brief description"
        rows={4}
      ></textarea>
    </div>
  );
};

export default RegisterAsCareProvider;
