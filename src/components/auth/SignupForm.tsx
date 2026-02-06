"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PasswordInput, TextInput } from "@/components/common/CustomInputs";
import Cookies from "js-cookie";
import {
  addressIcon,
  zipCodeIcon,
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
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    zipCode: false,
    password: false,
    confirmPassword: false,
  });

  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required";
        return /^[a-zA-Z\s]*$/.test(value) ? "" : "Name can only contain letters and spaces";
      case "email":
        if (!value.trim()) return "EmailId is required";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone must be 10 digits";
      case "address":
        return value.trim() ? "" : "Address is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "zipCode":
        if (!value.trim()) return "Zip code is required";
        return /^\d{5}$/.test(value.trim()) ? "" : "Zip code must be 5 digits";
        case "password": {
          // At least 8 characters, one uppercase, one lowercase, one number, one special symbol
          if (value.length < 8) return "Password must be at least 8 characters";
          if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter";
          if (!/[a-z]/.test(value)) return "Password must include a lowercase letter";
          if (!/[0-9]/.test(value)) return "Password must include a number";
          if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`\[\]\/\\]/.test(value)) return "Password must include a special symbol";
          return "";
        }
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
      city: validateField("city", city),
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
      city: true,
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
        zipcode: zipcodeNum,
        password,
        role: "user",
      };

      const response = await signup(payload).unwrap();
      if (response?.data?.userId) {
        Cookies.set("userId", response.data.userId, { expires: 1 / 24 });
        toast.success("Account creation successful!");
        router.push("/email-verification");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data?: { message?: string } };
        let errorMsg = errorData.data?.message || "Signup failed. Please try again.";
        if (errorMsg.toLowerCase().includes("email is incorrect")) {
          errorMsg = "Email already registered";
        }
        toast.error(errorMsg);
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
        onChange={(e) => {
          const value = e.target.value.replace(/[0-9]/g, "");
          setName(value);
        }}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />
      <TextInput
        text={email}
        setText={setEmail}
        Icon={EmailIcon}
        type="email"
        placeholder="Enter Email ID"
        error={touched.email ? errors.email : ""}
        onBlur={() => handleBlur("email", email)}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />
      <TextInput
        text={phone}
        setText={setPhone}
        Icon={phoneIcon}
        placeholder="Enter Phone Number"
        error={touched.phone ? errors.phone : ""}
        onBlur={() => handleBlur("phone", phone)}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />
      <TextInput
        text={address}
        setText={setAddress}
        Icon={addressIcon}
        placeholder="Enter Service Address"
        error={touched.address ? errors.address : ""}
        onBlur={() => handleBlur("address", address)}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />
      <TextInput
        text={city}
        setText={setCity}
        Icon={addressIcon}
        placeholder="Enter City"
        error={touched.city ? errors.city : ""}
        onBlur={() => handleBlur("city", city)}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />
      {/* Zip Code */}
      <TextInput
        text={zipCode}
        setText={setZipCode}
        Icon={zipCodeIcon}
        placeholder="Enter Zip Code"
        // use tel to surface numeric keypad on mobile
        type="tel"
        error={touched.zipCode ? errors.zipCode : ""}
        onBlur={() => handleBlur("zipCode", zipCode)}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
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
