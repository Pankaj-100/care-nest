import React from "react";

import OTPForm from "@/components/auth/OTPForm";
import AuthLayout from "@/components/auth/AuthLayout";

function page() {
  return (
    <AuthLayout image="/auth/forgot-password.png">
      <OTPForm isEmailVerify={true} />
    </AuthLayout>
  );
}

export default page;
