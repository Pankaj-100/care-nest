import React from "react";
import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

function page() {
  return (
    <AuthLayout image="/auth/signup.png">
      <div>
        <div className="text-[var(--blue-gray)] mt-3 font-semibold text-4xl">
          Join Now!
        </div>
        <div className="text-[var(--blue-gray)] text-xl mt-2">
          Create your free account to schedule meetings with caregivers
        </div>

        <div className="flex items-center font-medium text-lg gap-1 mt-3">
          <div>Already have an account?</div>
          <Link
            href="signin"
            className="p-0 m-0 text-[var(--golden-yellow)] font-medium"
          >
            Signin
          </Link>
        </div>

        <SignupForm />
      </div>
    </AuthLayout>
  );
}

export default page;
