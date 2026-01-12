import React from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

function page() {
  return (
    <AuthLayout image="/auth/forgot-password.png">
      <div className=" mt-0  lg:mt-[8rem]">
        <div className="text-[var(--blue-gray)] font-semibold text-2xl">
          Reset Password
        </div>
        <div className="text-[var(--blue-gray)] mt-3">
          Please provide your email to begin the password reset process.
        </div>

        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  );
}

export default page;
