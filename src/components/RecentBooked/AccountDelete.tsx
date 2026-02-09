"use client";

import { useState } from "react";
import ActionDialog from "../common/ActionDialog";
import { binIcon } from "@/lib/svg_icons";
import { useDeleteAccountMutation } from "@/store/api/profileApi";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/store/authSlice";  
import Cookies from "js-cookie";

interface goToProps {
  goTo: (value: string) => void;
}

const AccountDelete = ({ goTo }: goToProps) => {
  const [openDeleteDialog, setOpenDialog] = useState(true);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpenDialog(false);
    goTo("Manage Profile");
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAccount().unwrap();
      toast.success(res.message || "Account deleted successfully.");
      
      // Wait for toast to be visible before redirecting
      setTimeout(() => {
        dispatch(clearAuth());
        Cookies.remove("authToken");
        setOpenDialog(false);
        goTo("Manage Profile");
        router.push("/signin");
      }, 2000);
    } catch (err: unknown) {
  if (typeof err === "object" && err !== null && "data" in err) {
    const errorData = err as { data?: { message?: string } };
    toast.error(errorData.data?.message || "Failed to delete account. Try again.");
  } else {
    toast.error("Failed to delete account.");
  }
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <ActionDialog
        open={openDeleteDialog}
        handleOpen={handleOpen}
        icon={binIcon}
        confirmText={isLoading ? "Deleting..." : "Delete"}
        handleConfirm={handleDelete}
        heading="Account Deletion"
        subheading="Are you sure you want to delete the Account?"
      />
    </div>
  );
};

export default AccountDelete;
