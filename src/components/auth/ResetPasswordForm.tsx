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
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
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

      toast.success(res.message || "Password reset successful.");
      router.push("/signin");
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
      />

      <PasswordInput
        text={confirmPassword}
        setText={setConfirmPassword}
        Icon={passwordIcon}
        placeholder="Enter Confirm Password"
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
