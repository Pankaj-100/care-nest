"use client";
import React, { useState } from "react";

// import MessageList from "./MessageList";
import Messages from "./Messages";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CustomSheet from "@/components/common/CustomSheet";

function InboxBlock() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openMessages, setOpenMessages] = useState(false);

  const myMessages = <Messages />;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpenMessages = () => {
    setOpenMessages((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F7F3]">
      {/* Show chat/messages on all screens, hide only on desktop if using sheet/modal */}
      <div className="w-full max-w-5xl mx-auto card flex-grow overflow-y-auto hidden md:flex">
        {myMessages}
      </div>
      {/* Mobile: show chat/messages directly */}
      <div className="w-full max-w-5xl mx-auto card flex flex-grow overflow-y-auto md:hidden">
        {myMessages}
      </div>
      {/* Sheet/modal for mobile if needed (optional, can be removed if not used) */}
      {/*
      <div>
        <CustomSheet
          open={openMessages}
          handleOpen={handleOpenMessages}
          className="py-10"
          showCrossButton={true}
        >
          {myMessages}
        </CustomSheet>
      </div>
      */}
    </div>
  );
}

export default InboxBlock;