import {useState } from 'react';
import ActionDialog from "../common/ActionDialog";
import { binIcon } from "@/lib/svg_icons";

interface goToProps {
  goTo: (value: string) => void;
}
const AccountDelete =  ({ goTo }: goToProps)=> {
  const [openDeleteDialog, setOpenDialog] = useState(true);

  const handleOpen = () => {
    setOpenDialog(false);
    goTo("Manage Profile"); // Navigate back
  };

  return (
    <div>
      <ActionDialog
        open={openDeleteDialog}
        handleOpen={handleOpen}
        icon={binIcon}
        confirmText="Delete"
        handleConfirm={() => {
      
        }}
        heading="Account Deletion"
        subheading="Are you sure you want to delete the Account?"
      />
    </div>
  );
};

export default AccountDelete;
