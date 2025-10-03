"use client";
import React, { useState } from "react";

// import MessageList from "./MessageList";
import Messages from "./Messages";
import CustomSheet from "@/components/common/CustomSheet";

function InboxBlock() {
  const [openMessages, setOpenMessages] = useState(false);

  const myMessages = <Messages />;

  const handleOpenMessages = () => {
    setOpenMessages((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F7F7F3]">
      <div className="w-full max-w-5xl mx-auto card md:flex flex-grow overflow-y-auto hidden">
        {myMessages}
      </div>
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
    </div>
  );
}

export default InboxBlock;