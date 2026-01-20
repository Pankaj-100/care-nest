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
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

import { useSigninMutation } from "@/store/api/authApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearPendingBooking } from "@/store/slices/bookingSlice";
import { useCreateBookingMutation } from "@/store/api/bookingApi";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);

  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();
  const pendingBooking = useAppSelector(state => state.booking.pendingBooking);
  const dispatch = useAppDispatch();
  const [createBooking] = useCreateBookingMutation();

  const getEmailSuggestions = () => {
    if (!email || !email.includes("@")) return [];
    
    const [username, domain] = email.split("@");
    if (!username) return [];
    
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "aol.com",
    ];
    
    if (!domain) {
      return commonDomains.map(d => `${username}@${d}`);
    }
    
    return commonDomains
      .filter(d => d.startsWith(domain.toLowerCase()))
      .map(d => `${username}@${d}`);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setShowEmailSuggestions(value.includes("@") && !value.endsWith(".com"));
  };

  const handleEmailSuggestionClick = (suggestion: string) => {
    setEmail(suggestion);
    setShowEmailSuggestions(false);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Address");
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
        if (rememberMe) {
          Cookies.set("authToken", response.data.accessToken, { expires: 7 }); // 1 week
          Cookies.set("refreshToken", response.data.refreshToken, { expires: 30 }); // 1 month
        } else {
          Cookies.set("authToken", response.data.accessToken); // Session cookie
          Cookies.set("refreshToken", response.data.refreshToken); // Session cookie
        }

        toast.success("Login successful!");

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
        let errorMsg = response?.message || "Login failed. Please check your credentials and try again.";
        if (errorMsg.toLowerCase().includes("email is incorrect")) {
          errorMsg = "Email was not registered";
        }
        toast.error(errorMsg);
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
      <div className="relative">
        <TextInput
          text={email}
          setText={setEmail}
          Icon={EmailIcon}
          type="email"
          placeholder="Enter Email ID"
          className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
          autoComplete="email"
          inputMode="email"
          onChange={handleEmailChange}
          onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
        />
        {showEmailSuggestions && getEmailSuggestions().length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto z-50">
            {getEmailSuggestions().map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleEmailSuggestionClick(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <PasswordInput
        text={password}
        setText={setPassword}
        Icon={passwordIcon}
        placeholder="Enter Password"
        className="text-base sm:text-sm md:text-md lg:text-lg placeholder:text-base sm:placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg"
      />

      <div className="flex items-center font-medium text-md space-x-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Label htmlFor="rememberMe" className="text-md">Remember me</Label>
      </div>

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
