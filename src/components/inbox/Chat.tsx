"use client";
import React, { useEffect, useRef } from "react";
import DP from "@/components/common/DP";
import user1ProfilePic from "@/assets/profilepic1.png";
import { chatMessageType } from "@/lib/interface-types";
import ProfilePic from "@/assets/profilepic1.png";
import { format, isToday, isYesterday } from "date-fns";

interface Props {
  messages: chatMessageType[];
  otherUserDetails?: { name: string; avatar: string | null };
}

// Group messages by date
function groupMessagesByDate(messages: chatMessageType[]) {
  const groups: Record<string, chatMessageType[]> = {};
  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt);
    let label;
    if (isToday(msgDate)) label = "Today";
    else if (isYesterday(msgDate)) label = "Yesterday";
    else label = format(msgDate, "dd MMM yyyy");
    if (!groups[label]) groups[label] = [];
    groups[label].push(msg);
  });
  return groups;
}

const Chat = ({ messages, otherUserDetails }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div
      className="flex flex-col flex-grow h-full overflow-y-auto hide-scrollbar gap-4 p-4"
      ref={containerRef}
    >
      {messages.length === 0 && (
        <div className="self-center text-gray-400">No messages yet</div>
      )}

      {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
        <div key={dateLabel}>
          <div className="flex justify-center my-4">
            <span className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full text-sm font-semibold">
              {dateLabel}
            </span>
          </div>
          {msgs.map((msg) => {
            const isOther = msg.isOtherUserMessage;
            return (
              <div
                key={msg.id}
                className={`flex gap-2 items-end ${
                  isOther ? "self-start" : "self-end flex-row-reverse"
                }`}
              >
                <DP
                  url={
                    isOther && otherUserDetails?.avatar
                      ? ProfilePic
                      : isOther
                      ? user1ProfilePic
                      : ProfilePic
                  }
                  alt={isOther ? otherUserDetails?.name || "User" : "You"}
                  className="!w-10 !h-10 rounded-full"
                />
                <div className="flex flex-col text-base text-black max-w-[21rem]">
                  <div
                    className={`rounded-2xl px-5 py-3 ${
                      isOther ? "bg-[#e5e7e8]" : "bg-[#233D4D33] text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className={isOther ? "ms-1 text-[gray]" : "self-end text-[gray] mr-1"}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Chat;