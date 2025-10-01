"use client";

import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { googleIcon } from "@/lib/svg_icons";
import { CustomButton } from "../common/CustomInputs"; // adjust if path differs
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCredentials, setAccessToken } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { clearPendingBooking } from "@/store/slices/bookingSlice";
import { useCreateBookingMutation } from "@/store/api/bookingApi";

interface GoogleButtonProps {
  role?: "user" | "giver";
  redirectPath?: string;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

function GoogleButton({ role = "user", redirectPath = "/" }: GoogleButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pendingBooking = useAppSelector((state) => state.booking.pendingBooking);
  const [createBooking] = useCreateBookingMutation();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response?.access_token) {
        toast.error("No Google token");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v1/user/google-auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            googleToken: response.access_token,
            role,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data?.message || "Google login failed");
          setLoading(false);
          return;
        }

        const accessToken = data?.data?.accessToken;
        const refreshToken = data?.data?.refreshToken;

        if (accessToken) {
          Cookies.set("authToken", accessToken, { expires: 7 });
          if (refreshToken) Cookies.set("refreshToken", refreshToken, { expires: 7 });

          if (typeof setCredentials === "function") {
            dispatch(setCredentials({ accessToken, refreshToken }));
          } else {
            dispatch(setAccessToken(accessToken));
          }
        }

        // Check for pending booking - SAME LOGIC AS SigninForm
        if (pendingBooking) {
          try {
            const result = await createBooking(pendingBooking).unwrap();
            if (result.success) {
              dispatch(clearPendingBooking());
              router.push("/care-giver?bookingSuccess=true");
              return;
            }
          } catch (error) {
            console.error("Booking failed:", error);
            // Still redirect to care-giver page even if booking fails
            router.push("/care-giver");
            return;
          }
        }

        toast.success("Google login successful!");
        router.push(redirectPath); // now /profile by default
      } catch (err) {
        console.error("Google login error:", err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.error("Google login failed:", err);
      toast.error("Google login failed");
    },
  });

  return (
    <CustomButton
      disabled={loading}
      className="bg-white hover:bg-white text-[var(--blue-gray)]"
      onClick={() => googleLogin()}
    >
      <div className="flex gap-2 items-center">
        <div className={loading ? "opacity-50" : ""}>{googleIcon}</div>
        <div>{loading ? "Signing in..." : "Continue with Google"}</div>
      </div>
    </CustomButton>
  );
}

export default GoogleButton;
