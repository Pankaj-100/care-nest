import React from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import SigninForm from "@/components/auth/SigninForm";
import Link from "next/link";

function page() {
  return (
    <AuthLayout image="/auth/signin.png">
      <div className="mt-6">
        <div className="font-semibold text-3xl">Welcome back!</div>
        <div className="mt-1 font-medium">
          Sign in to find your ideal caregiver and start receiving personalized care.
        </div>

        <div className="flex font-medium items-center gap-1 mt-5">
          <div>Don’t have an account?</div>
          <Link
            href="/signup"
            className="p-0 m-0 text-[var(--golden-yellow)] font-medium"
          >
            Sign Up
          </Link>
        </div>

        <SigninForm />
      </div>
    </AuthLayout>
  );
}

export default page;
