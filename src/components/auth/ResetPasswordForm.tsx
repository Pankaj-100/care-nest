"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { PasswordInput } from "@/components/common/CustomInputs";
import { passwordIcon } from "@/lib/svg_icons";
import { CustomButton } from "@/components/common/CustomInputs";
import { useResetPasswordMutation } from "@/store/api/authApi"; // Adjust path as needed

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const router = useRouter();

  // Strong password validation
  const validatePassword = (pwd: string): string => {
    if (!pwd) {
      return "Password is required";
    }
    if (pwd.length < 8) {
      return "Password must contain at least 8 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleSubmit = async () => {
    const newErrors = { password: "", confirmPassword: "" };
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please fill the confirmation password";
      toast.error("Please fill the confirmation password");
      setErrors(newErrors);
      return;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      setErrors(newErrors);
      toast.error("Passwords do not match.");
      return;
    }

    setErrors(newErrors);
    if (newErrors.password) {
      toast.error(newErrors.password);
      return;
    }

    const resetToken = Cookies.get("resetToken");
    if (!resetToken) {
      toast.error("Reset token is missing or expired.");
      return;
    }

    try {
      const res = await resetPassword({
        password,
        role: "user", // change to "giver" if needed
      }).unwrap();

      toast.success("Password Updated Successfully");
      // Add a slight delay before redirecting to ensure user sees the success message
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    }catch (err: unknown) {
  if (typeof err === "object" && err !== null && "data" in err) {
    const errorData = err as { data?: { message?: string } };
    toast.error(errorData.data?.message || "Failed to reset password. Try again.");
  } else {
    toast.error("Failed to reset password.");
  }
    }
  };

  return (
    <div className="my-6 flex flex-col gap-4">
      <PasswordInput
        text={password}
        setText={setPassword}
        Icon={passwordIcon}
        placeholder="Enter Password"
        error={errors.password}
      />

      <PasswordInput
        text={confirmPassword}
        setText={setConfirmPassword}
        Icon={passwordIcon}
        placeholder="Enter Confirm Password"
        error={errors.confirmPassword}
      />

      <CustomButton className="mt-4 mb-3" onClick={handleSubmit} 
      // disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Save & Continue"}
      </CustomButton>
    </div>
  );
}

export default ResetPasswordForm;
