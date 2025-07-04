import React from "react";

import { CustomDialog } from "./CustomDialog";
import { CustomButton } from "./CustomInputs";

interface Props {
  open: boolean;
  handleOpen: () => void;
  icon: React.JSX.Element;
  confirmText?: string;
  handleConfirm: () => void;
  heading?: string;
  subheading?: string;
  showCancelButton?: boolean;
}

function ActionDialog({
  open,
  handleOpen,
  icon,
  confirmText,
  handleConfirm,
  heading,
  subheading,
  showCancelButton,
}: Props) {
  return (
    <CustomDialog
      open={open}
      handleOpen={handleOpen}
      className="w-max py-6 px-6"
    >
      <div className="flex flex-col items-center">
        <div className="p-5 mb-4 rounded-full bg-[#F2A3071A]">{icon}</div>
        <div className="flex flex-col gap-1 items-center">
          {heading && <div className="text-xl font-semibold">{heading}</div>}
          {subheading && (
            <div className="text-sm text-[var(--cool-gray)]  text-wrap text-center max-w-75">
              {subheading}
            </div>
          )}
        </div>

        <div className="mt-6  w-full flex gap-2 ">
          {!showCancelButton && (
            <CustomButton
              className="flex-1 py-5 bg-gray-200 hover:bg-gray-200 hover:opacity-90 "
              onClick={handleOpen}
            >
              Cancel
            </CustomButton>
          )}
          <CustomButton className="flex-1 py-5" onClick={handleConfirm}>
            {confirmText || "Confirm"}
          </CustomButton>
        </div>
      </div>
    </CustomDialog>
  );
}

export default ActionDialog;
