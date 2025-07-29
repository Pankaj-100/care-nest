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

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("false");

  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

     try {
      const response = await signin({
        email,
        password,
        role: "user" // or "receiver" based on your application
      }).unwrap();

      if (response.success) {
        // Set tokens with appropriate expiration
        if (rememberMe === "true") {
          Cookies.set("authToken", response.data.accessToken, { expires: 7 }); // 1 week
          Cookies.set("refreshToken", response.data.refreshToken, { expires: 30 }); // 1 month
        } else {
          Cookies.set("authToken", response.data.accessToken); // Session cookie
          Cookies.set("refreshToken", response.data.refreshToken); // Session cookie
        }
        
        router.push("/");
      } else {
       
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
    // Use error.message in your UI
  } else {
    console.error("An unknown error occurred");
    // Fallback error message
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
        defaultValue={rememberMe}
        onValueChange={setRememberMe}
        className="gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="option-one" />
          <Label htmlFor="option-one">Remember me</Label>
        </div>
      </RadioGroup>

      <CustomButton className="mt-4 mb-3" onClick={handleSubmit} 
      //disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </CustomButton>

      <div className="text-center">
        <Link href="/forgot-password" className="text-[#667085]">
          Forgot your password?
        </Link>
      </div>

      <TextWithLines text="or" />
      <GoogleButton />
    </div>
  );
}

export default SigninForm;
