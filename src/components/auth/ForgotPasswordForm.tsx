"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { TextInput } from "@/components/common/CustomInputs";
import { EmailIcon } from "@/lib/svg_icons";
import { CustomButton } from "@/components/common/CustomInputs";
import { useForgotPasswordMutation } from "@/store/api/authApi";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  // Email validation regex
  const isValidEmail = (emailStr: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleSubmit = async () => {
    setEmailError("");

    if (!email) {
      setEmailError("Please enter your email.");
      toast.error("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter valid mailId");
      toast.error("Please enter valid mailId");
      return;
    }

    try {
      const res = await forgotPassword({
        email,
        role: "user", // or 'giver' depending on your use case
      }).unwrap();

      if (res.success && res.data?.userId) {
        setEmailError("");
        toast.success(res.message || "OTP sent to your email.");
        Cookies.set('userId', res.data.userId, { expires: 1/24 }); // Expires in 1 hour
        router.push("/otp-verification");
      } else {
        setEmailError("Email Id not registered Yet");
        toast.error("Email Id not registered Yet");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data?: { message?: string } };
        let errorMsg = errorData.data?.message || "Failed to send OTP. Try again.";
        if (
          errorMsg.toLowerCase().includes("email is incorrect") ||
          errorMsg.toLowerCase().includes("not registered") ||
          errorMsg.toLowerCase().includes("not found")
        ) {
          errorMsg = "Email Id not registered Yet";
        }
        setEmailError(errorMsg);
        toast.error(errorMsg);
      } else {
        setEmailError("Failed to send OTP. Try again.");
        toast.error("Failed to send OTP. Try again.");
      }
    }
  };

  return (
    <div className="my-8 flex flex-col gap-2">
      <TextInput
        text={email}
        setText={setEmail}
        Icon={EmailIcon}
        type="email"
        placeholder="Enter Email ID"
        error={emailError}
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />

      <CustomButton className="mt-6" onClick={handleSubmit} 
      //disabled={isLoading}

      >
        {isLoading ? "Sending..." : "Send"}
      </CustomButton>
    </div>
  );
}

export default ForgotPasswordForm;
