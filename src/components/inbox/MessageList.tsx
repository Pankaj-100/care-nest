"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

import { Input } from "../ui/input";
import data from "@/lib/dummy_data/chats.json";
import NoItems from "../common/NoItems";
import DP from "../common/DP";
import ProfilePic from "@/assets/profilepic1.png";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  handleOpenMessages: () => void;
}

function MessageList({ handleOpenMessages }: Props) {
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const chatList = data?.chatList;
  const noChats = chatList?.length === 0;
  // const noChats = true;

  const handleClick = () => {
    if (isMobile) {
      handleOpenMessages();
    }
  };

  return (
    <div className="w-full flex flex-col flex-grow h-full  ">
      <div className="flex items-center rounded-full px-4 py-1 bg-[var(--light-gray)] mb-2 ">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ps-0 border-none focus-visible:ring-0 "
          placeholder="Search here..."
        />
        <SearchIcon size={18} className="text-[var(--cool-gray)] " />
      </div>

      {noChats && <NoItems className="mt-8" />}

      {!noChats && (
        <div
          className="flex flex-col h-full flex-grow overflow-y-auto hide-scrollbar"
          onClick={handleClick}
        >
          {chatList?.map((chat) => (
            <div
              className="flex justify-between py-2 hover:cursor-pointer hover:bg-gray-100  px-4 rounded-md transition-all "
              key={chat.id}
            >
              <div className="flex gap-4">
                <div className=" relative rounded-full flex w-12 h-12">
                  <DP url={chat?.profilePic || ProfilePic} alt={chat?.name} />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="font-semibold"> {chat?.name}</div>
                  <div className="text-sm text-[var(--cool-gray)]">
                    {" "}
                    {chat?.message?.content}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="text-[var(--cool-gray)] text-[0.8rem]">
                  {" "}
                  {chat?.message?.time}
                </div>
                {chat?.unread > 0 && (
                  <div className="bg-[var(--golden-yellow)] text-[#fff] px-2  rounded-full text-sm">
                    {" "}
                    {chat?.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;
