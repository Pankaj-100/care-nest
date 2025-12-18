"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import data from "@/lib/dummy_data/chats.json";
import NoItems from "@/components/common/NoItems";
import DP from "@/components/common/DP";
import ProfilePic from "@/assets/profilepic1.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { format, isToday, isYesterday } from "date-fns";

interface Props {
  handleOpenMessages: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupChatsByDate(chatList: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groups: Record<string, any[]> = {};
  chatList.forEach((chat) => {
    const chatDate = new Date(chat.message.time);
    let label;
    if (isToday(chatDate)) label = "Today";
    else if (isYesterday(chatDate)) label = "Yesterday";
    else label = format(chatDate, "dd MMM yyyy");
    if (!groups[label]) groups[label] = [];
    groups[label].push(chat);
  });
  return groups;
}

function MessageList({ handleOpenMessages }: Props) {
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const chatList = data?.chatList;
  const noChats = chatList?.length === 0;

  const handleClick = () => {
    if (isMobile) {
      handleOpenMessages();
    }
  };

  const cdnURL = "https://creative-story.s3.us-east-1.amazonaws.com";

  // Filter chats by search
  const filteredChats = search
    ? chatList?.filter(
        (chat) =>
          chat?.name?.toLowerCase().includes(search.toLowerCase()) ||
          chat?.message?.content?.toLowerCase().includes(search.toLowerCase())
      )
    : chatList;

  // Group chats by date
  const groupedChats = filteredChats ? groupChatsByDate(filteredChats) : {};

  return (
    <div className="w-full overflow-y-auto flex flex-col h-[45rem]">
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
          {Object.entries(groupedChats).map(([dateLabel, chats]) => (
            <div key={dateLabel}>
              <div className="px-2 py-2 text-xs font-semibold text-gray-500">
                {dateLabel}
              </div>
              {chats.map((chat) => (
                <div
                  className="flex justify-between py-2 hover:cursor-pointer hover:bg-gray-100 px-2 rounded-md transition-all"
                  key={chat.id}
                >
                  <div className="flex gap-4">
                    <div className="relative rounded-full flex w-12 h-12">
                      <DP
                        url={
                          chat?.profilePic
                            ? chat.profilePic.startsWith("http")
                              ? chat.profilePic
                              : `${cdnURL}/${chat.profilePic.replace(/^\/+/, "")}`
                            : ProfilePic
                        }
                        alt={chat?.name}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">{chat?.name}</div>
                      <div className="text-sm text-[#233D4D33]">
                        {chat?.message?.content}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-[var(--cool-gray)] text-[0.8rem]">
                      {format(new Date(chat?.message?.time), "hh:mm a")}
                    </div>
                    {chat?.unread > 0 && (
                      <div className="bg-[var(--golden-yellow)] text-[#fff] px-2 rounded-full text-sm">
                        {chat?.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;