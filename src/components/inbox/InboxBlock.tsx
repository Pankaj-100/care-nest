"use client";
import React, { useState } from "react";

import MessageList from "@/components/inbox/MessageList";
import Messages from "./Messages";
import CustomSheet from "../common/CustomSheet";

function InboxBlock() {
  const [openMessages, setOpenMessages] = useState(false);
  const myMessages = <Messages />;

  const handleOpenMessages = () => {
    setOpenMessages((prev) => !prev);
  };

  return (
    <div className="bg-[#F8F9FA] h-[50rem] overflow-hidden grid grid-cols-12 gap-6 md:px-[3rem] ">
      <div className="col-start-1 md:col-end-5 col-end-13 hide-scrollbar flex flex-col flex-grow overflow-y-auto card ">
        <MessageList handleOpenMessages={handleOpenMessages} />
      </div>

      <div className="col-start-5 col-end-13 card md:flex flex-grow overflow-y-auto hidden ">
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
