import { useState } from 'react';
import ActionDialog from "../common/ActionDialog";
import { binIcon } from "@/lib/svg_icons";

interface goToProps {
  goTo: (value: string) => void;
}
const Logout =  ({ goTo }: goToProps) => {
  const [openDeleteDialog, setOpenDialog] = useState(true);

  const handleOpen = () => {
    setOpenDialog(false);
    goTo("Manage Profile"); // Or even goTo("Logout") if you want logout flow
  };

  return (
    <div>
      <ActionDialog
        open={openDeleteDialog}
        handleOpen={handleOpen}
        icon={binIcon}
        confirmText="Logout"
        handleConfirm={() => {
        }}
        heading="Account Logout"
        subheading="Are you sure you want to Logout your Account?"
      />
    </div>
  );
};

export default Logout;
