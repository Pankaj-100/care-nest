"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';

import { CustomButton } from "@/components/common/CustomInputs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { formatTime } from "@/lib/resuable_funs";
import {
  useVerifyEmailMutation,
  useResendOtpMutation,
} from "@/store/api/authApi"; // Adjust path as needed

interface Props {
  isEmailVerify?: boolean;
}

function OTPForm({ isEmailVerify }: Props) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(30);
  const router = useRouter();

  const userId = Cookies.get("userId") || ""; // Fallback to prop or context if not in cookie
  const type = isEmailVerify ? "account_verification" : "password_reset";

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleSubmit = async () => {
    if (otp.length < 4) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    try {
      const res = await verifyEmail({
        userId,
        code: otp,
        type,
      }).unwrap();

      if (res.success) {
      if (isEmailVerify) {
          // Store tokens in cookies for email verification flow
          Cookies.set("authToken", res.data.accessToken, { expires: 1 }); // 1 day
          Cookies.set("refreshToken", res.data.refreshToken, { expires: 7 }); // 7 days
          Cookies.remove("userId");
          router.push("/"); // Redirect to dashboard or home page
        } else {
          // For password reset flow
          console.log("Password reset successful");
          Cookies.set("resetToken", res.data.token || "", { expires: 1/24 }); // 1 hour
          router.push("/reset-password");
        }
      } else {
        toast.error("Verification failed.");
      }
    }catch (err: unknown) {
  if (typeof err === "object" && err !== null && "data" in err) {
    const errorData = err as { data?: { message?: string } };
    toast.error(errorData.data?.message || "invalid or Expired OTP. Please try again.");
  } else {
    toast.error("invalid OTP or expired. Please try again.");
  }}
  };

  const handleResend = async () => {
    if (time > 0) {
      toast.warning(`Please wait ${formatTime(time)} seconds to resend.`);
      return;
    }

    try {
      const res = await resendOtp({
        userId,
        type,
      }).unwrap();

      if (res.success) {
        toast.success("OTP is sent to your mail ID. OTP is valid for 10 minutes.");
        setTime(30);
      } else {
        toast.error("Failed to resend OTP.");
      }
    }catch (err: unknown) {
  if (typeof err === "object" && err !== null && "data" in err) {
    const errorData = err as { data?: { message?: string } };
    toast.error(errorData.data?.message || "Failed to resend OTP. Try again.");
  } else {
    toast.error("Failed to resend OTP. Try again.");
  }}
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-[8rem]">
      <ToastContainer position="top-center" />

      <div className="font-semibold text-2xl">OTP Verification</div>
      <div className="mt-3">
        We&apos;ve sent a one-time password to your email — please enter it below.
      </div>

      <div className="my-8 flex flex-col gap-4">
        <div className="space-y-2 mx-2 self-center">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="flex gap-4">
              {[0, 1, 2, 3].map((_, index) => (
                <div key={index} className="bg-[#fff] rounded-3xl">
                  <InputOTPSlot
                    index={index}
                    className="focus:outline-none px-8 py-7 text-lg !ring-0 !shadow-none !border-none"
                  />
                </div>
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <CustomButton className="mt-6" onClick={handleSubmit}
        //  disabled={isVerifying}
         >
          {isVerifying ? "Verifying..." : "Verify and continue"}
        </CustomButton>

        <div className="text-center text-[1.1rem] font-medium mt-2">
          {formatTime(time)} secs
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 mt-5">
        <div>Didn’t receive OTP yet?</div>
        <button
          className="p-0 m-0 text-[var(--golden-yellow)] font-medium"
          onClick={handleResend}
          disabled={isResending}
        >
          {isResending ? "Resending..." : "Resend"}
        </button>
      </div>
    </div>
  );
}

export default OTPForm;
