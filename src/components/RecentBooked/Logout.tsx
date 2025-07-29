import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import ActionDialog from "../common/ActionDialog";
import {logouts } from "@/lib/svg_icons";

interface goToProps {
  goTo: (value: string) => void;
}
const Logout = ({ goTo }: goToProps) => {
  const [openDeleteDialog, setOpenDialog] = useState(true);

  const router = useRouter();

  const handleOpen = () => {
    setOpenDialog(false);
    goTo("Manage Profile"); // Or even goTo("Logout") if you want logout flow
  };

  return (
    <div>
      <ActionDialog
        open={openDeleteDialog}
        handleOpen={handleOpen}
        icon={logouts}
        confirmText="Logout"
        handleConfirm={() => {
          Cookies.remove("authToken");
          handleOpen();
          router.push("/");
        }}
        heading="Account Logout"
        subheading="Are you sure you want to Logout your Account?"
      />
    </div>
  );
};

export default Logout;
