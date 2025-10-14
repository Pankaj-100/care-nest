"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PasswordInput, TextInput } from "@/components/common/CustomInputs";
import Cookies from "js-cookie";
import {
  addressIcon,
  EmailIcon,
  passwordIcon,
  personIcon,
  phoneIcon,
} from "@/lib/svg_icons";
import { CustomButton } from "@/components/common/CustomInputs";
import GoogleButton from "./GoogleButton";
import TextWithLines from "../common/TextWithLine";
import { useSignupMutation } from "@/store/api/authApi";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    zipCode: false,
    password: false,
    confirmPassword: false,
  });

  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone must be 10 digits";
      case "address":
        return value.trim() ? "" : "Address is required";
      case "zipCode":
        // 6 digits (adjust if needed)
        return /^\d{6}$/.test(value.trim()) ? "" : "Invalid zip code";
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters";
      case "confirmPassword":
        return value === password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const handleBlur = (field: keyof typeof touched, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }) as typeof prev);
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      phone: validateField("phone", phone),
      address: validateField("address", address),
      zipCode: validateField("zipCode", zipCode),
      password: validateField("password", password),
      confirmPassword: validateField("confirmPassword", confirmPassword),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
      zipCode: true,
      password: true,
      confirmPassword: true,
    });

    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // ensure numeric ZIP for backend
    const zipcodeNum = Number(zipCode.trim());
    if (!Number.isFinite(zipcodeNum)) {
      toast.error("Zip code must be a number");
      return;
    }

    try {
      const payload: Parameters<typeof signup>[0] = {
        name: name.trim(),
        email: email.trim(),
        address: address.trim(),
        mobile: phone.trim(),
        zipcode: zipcodeNum, // number as required by backend
        password,
        role: "user",
      };

      const { data } = await signup(payload).unwrap();
      if (data?.userId) {
        Cookies.set("userId", data.userId, { expires: 1 / 24 });
        router.push("/email-verification");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data?: { message?: string } };
        toast.error(errorData.data?.message || "Signup failed. Please try again.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="my-6 flex flex-col gap-4">
      <TextInput
        text={name}
        setText={setName}
        Icon={personIcon}
        placeholder="Enter User Name"
        error={touched.name ? errors.name : ""}
        onBlur={() => handleBlur("name", name)}
      />
      <TextInput
        text={email}
        setText={setEmail}
        Icon={EmailIcon}
        type="email"
        placeholder="Enter Email ID"
        error={touched.email ? errors.email : ""}
        onBlur={() => handleBlur("email", email)}
      />
      <TextInput
        text={phone}
        setText={setPhone}
        Icon={phoneIcon}
        placeholder="Enter Phone Number"
        error={touched.phone ? errors.phone : ""}
        onBlur={() => handleBlur("phone", phone)}
      />
      <TextInput
        text={address}
        setText={setAddress}
        Icon={addressIcon}
        placeholder="Enter Address"
        error={touched.address ? errors.address : ""}
        onBlur={() => handleBlur("address", address)}
      />
      {/* Zip Code */}
      <TextInput
        text={zipCode}
        setText={setZipCode}
        Icon={addressIcon}
        placeholder="Enter Zip Code"
        // use tel to surface numeric keypad on mobile
        type="tel"
        error={touched.zipCode ? errors.zipCode : ""}
        onBlur={() => handleBlur("zipCode", zipCode)}
      />
      <PasswordInput
        text={password}
        setText={setPassword}
        Icon={passwordIcon}
        placeholder="Enter Password"
        error={touched.password ? errors.password : ""}
        onBlur={() => handleBlur("password", password)}
      />
      <PasswordInput
        text={confirmPassword}
        setText={setConfirmPassword}
        Icon={passwordIcon}
        placeholder="Enter Confirm Password"
        error={touched.confirmPassword ? errors.confirmPassword : ""}
        onBlur={() => handleBlur("confirmPassword", confirmPassword)}
      />
      <CustomButton onClick={handleSubmit} className="text-lg" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </CustomButton>
      <TextWithLines text="or" />
      <GoogleButton />
    </div>
  );
}

export default SignupForm;
