"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import DP from "@/components/common/DP";
import user1ProfilePic from "@/assets/profilepic1.png";
import { chatMessageType } from "@/lib/interface-types";
import ProfilePic from "@/assets/profilepic1.png";
import { format, isToday, isYesterday } from "date-fns";
import { useAppSelector } from "@/store/hooks";

interface Props {
  messages: chatMessageType[];
  otherUserDetails?: { name: string; avatar: string | null };
}

// CDN base for relative avatar paths
const cdnURL = "https://creative-story.s3.us-east-1.amazonaws.com";

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
  const myAvatar = useAppSelector((s) => s.profile.avatar);

  const myResolvedAvatar = myAvatar
    ? myAvatar.startsWith("http")
      ? myAvatar
      : `${cdnURL}/${myAvatar.replace(/^\/+/, "")}`
    : null;

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div
      className="flex flex-col flex-grow h-full overflow-y-auto hide-scrollbar gap-3 p-2 sm:gap-4 sm:p-4"
      ref={containerRef}
    >
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="w-48 h-48 sm:w-56 sm:h-56 relative">
            <Image
              src="/Inbox-no-message.png"
              alt="No messages"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
        <div key={dateLabel}>
          <div className="flex justify-center my-3 sm:my-4">
            <span className="bg-gray-100 text-gray-700 px-4 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
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
                    isOther
                      ? "/admin.png"
                      : myResolvedAvatar || ProfilePic
                  }
                  alt={isOther ? otherUserDetails?.name || "Admin" : "You"}
                  className="!w-8 !h-8 sm:!w-10 sm:!h-10 rounded-full"
                />
                <div className="flex flex-col text-sm sm:text-base text-black max-w-[15rem] sm:max-w-[21rem]">
                  <div
                    className={`rounded-2xl px-3 py-2 sm:px-5 sm:py-3 ${
                      isOther ? "bg-[#e5e7e8]" : "bg-[#233D4D33] text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                    <div
                      className={
                        isOther
                          ? "ms-1 text-[gray] text-xs sm:text-xs mt-2"
                          : "self-end text-[gray] mr-1 mt-2 text-xs sm:text-xs"
                      }
                    >
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