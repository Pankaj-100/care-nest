"use client";
import React from "react";

import MessageList from "@/components/inbox/MessageList";
import Messages from "./Messages";

function InboxBlock() {
  return (
    <div className="bg-[#F8F9FA] h-[50rem] grid grid-cols-12 gap-6 px-[3rem]">
      <div className="col-start-1 col-end-5 hide-scrollbar flex flex-col card overflow-y-auto">
        <MessageList />
      </div>

      <div className=" col-start-5 col-end-13">
        <Messages />
      </div>
    </div>
  );
}

export default InboxBlock;
