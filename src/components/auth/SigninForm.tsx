"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { PasswordInput, TextInput, CustomButton } from "@/components/common/CustomInputs";
import { EmailIcon, passwordIcon } from "@/lib/svg_icons";
import GoogleButton from "./GoogleButton";
import TextWithLines from "../common/TextWithLine";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

import { useSigninMutation } from "@/store/api/authApi"; // Adjust path as needed
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearPendingBooking } from "@/store/slices/bookingSlice";
import { useCreateBookingMutation } from "@/store/api/bookingApi";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("false");

  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();
  const pendingBooking = useAppSelector(state => state.booking.pendingBooking);
  const dispatch = useAppDispatch();
  const [createBooking] = useCreateBookingMutation();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

     try {
      const response = await signin({
        email,
        password,
        role: "user"
      }).unwrap();

      if (response && response.success) {
        // Set tokens with appropriate expiration
        if (rememberMe === "true") {
          Cookies.set("authToken", response.data.accessToken, { expires: 7 }); // 1 week
          Cookies.set("refreshToken", response.data.refreshToken, { expires: 30 }); // 1 month
        } else {
          Cookies.set("authToken", response.data.accessToken); // Session cookie
          Cookies.set("refreshToken", response.data.refreshToken); // Session cookie
        }
        
        if (pendingBooking) {
          try {
            const result = await createBooking(pendingBooking).unwrap();
            if (result.success) {
              dispatch(clearPendingBooking());
              router.push("/care-giver?bookingSuccess=true");
              return;
            }
          } catch {
            // Optionally show error
          }
        }
        router.push("/");
      } else {
        toast.error(response?.message || "Login failed. Please check your credentials and try again.");
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        const err = error as { data?: { message?: string }; message?: string };
        toast.error(
          err.data?.message ||
          err.message ||
          "Login failed. Please check your credentials and try again."
        );
        console.error("Login failed:", error);
      } else {
        toast.error("Login failed. Please check your credentials and try again.");
        console.error("Login failed:", error);
      }
    } 
  };

  return (
    <div className="my-6 flex flex-col gap-4">
      <TextInput
        text={email}
        setText={setEmail}
        Icon={EmailIcon}
        type="email"
        placeholder="Enter Email ID"
      />

      <PasswordInput
        text={password}
        setText={setPassword}
        Icon={passwordIcon}
        placeholder="Enter Password"
      />

      <RadioGroup
        value={rememberMe}
        onValueChange={(val) => {
          setRememberMe(val === rememberMe ? "false" : val);
        }}
        className="gap-2"
      >
        <div className="flex items-center font-medium text-md space-x-2">
          <RadioGroupItem value="true" id="option-one" />
          <Label htmlFor="option-one" className="text-md">Remember me</Label>
        </div>
      </RadioGroup>

      <CustomButton className="mt-4 mb-3 text-lg" onClick={handleSubmit} 
      //disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </CustomButton>

      <div className="text-center">
        <Link href="/forgot-password" className="text-[#667085] font-medium text-lg">
          Forgot your password?
        </Link>
      </div>

      <TextWithLines text="or" />
      <GoogleButton />
    </div>
  );
}

export default SigninForm;
