import React from "react";
import ProfilePic from "@/assets/profilepic1.png";
import DP from "@/components/common/DP";

function NameHeader() {
  return (
    <div className="flex justify-between items-center border-b border-dashed border-[#EEEEEE] pb-4">
      <div className="flex gap-3 items-center">
        <DP url={ProfilePic} alt="Me" />
        <div className="text-lg font-medium">Admin</div>
      </div>
    </div>
  );
}

export default NameHeader;