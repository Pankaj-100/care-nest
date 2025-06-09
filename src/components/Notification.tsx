import React, { useState } from "react";
import { IoIosArrowRoundBack as BackIcon } from "react-icons/io";
import { LuDot as DotIcon } from "react-icons/lu";

import CustomSheet from "./common/CustomSheet";
import data from "@/lib/dummy_data/notification.json";
import { noNotificationIcon, notificationIcon } from "@/lib/svg_icons";

interface Props {
  open: boolean;
  handleOpen: () => void;
}

function Notification({ open, handleOpen }: Props) {
  const notifications = data?.notifications;

  const noNotifications = notifications?.length === 0;

  return (
    <CustomSheet
      open={open}
      handleOpen={handleOpen}
      className="md:!max-w-[25rem] !w-full rounded-l-3xl px-5 text-[var(--blue-gray)] mx-0 "
    >
      <div className="mt-10">
        <div className="flex items-center">
          <button
            className="bg-[#233D4D1A] border-0 p-3 rounded-full"
            onClick={handleOpen}
          >
            <BackIcon size={20} />
          </button>

          <div className="ms-[5rem] text-xl font-semibold">Notification</div>
        </div>

        <div className="mt-8 flex flex-col items-center ">
          {noNotifications && (
            <div className="flex flex-col items-center gap-4 mt-10  ml-[3.1rem]">
              <div> {noNotificationIcon}</div>
              <div className="text-medium">
                You have not received any notifications.
              </div>
            </div>
          )}

          {!noNotifications &&
            notifications?.map((notification) => (
              <div className="flex gap-x-3 items-center">
                <div className={notification.seen ? "invisible" : "visible"}>
                  <div className="w-2 h-2 rounded-full bg-[var(--golden-yellow)]"></div>
                </div>

                <div className="flex gap-2 border-b border-[#EBEBEB] py-4">
                  <div className="bg-[#233D4D1A] rounded-md p-3">
                    {notificationIcon}
                  </div>
                  <div className="flex flex-col ">
                    <div>{notification.title}</div>
                    <div className="text-[#B9B9B9] text-sm">
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </CustomSheet>
  );
}

export default Notification;
