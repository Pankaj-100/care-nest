"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { CustomDialog } from "../common/CustomDialog";
import { CustomButton } from "../common/CustomInputs";

interface Props {
  open: boolean;
  handleOpen: () => void;
}

function LoginRedirectModal({ open, handleOpen }: Props) {
  const router = useRouter();

  const handleClick = () => {
    handleOpen();
    router.push("/signin");
  };

  return (
    <CustomDialog
      open={open}
      handleOpen={handleOpen}
      className="py-6 px-8 w-max "
    >
      <div className="flex flex-col items-center gap-2 mt-1">
        <div className="text-lg font-semibold">Get Started for Free</div>
        <div className="flex flex-col items-center text-sm text-[var(--cool-gray)]">
          <div>Create a free account or log in to book or</div>
          <div> save caregivers.</div>
        </div>

        <CustomButton className="w-[18rem] mt-4" onClick={handleClick}>
          Go to Login
        </CustomButton>
      </div>
    </CustomDialog>
  );
}

export default LoginRedirectModal;
