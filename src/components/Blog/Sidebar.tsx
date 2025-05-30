import React from "react";
import RecentPosts from "./RecentPosts";
import ContactInfo from "../common/ContactInfo";

const Sidebar: React.FC = () => {
  return (
    <div className="w-full md:w-1/3 space-y-8">
      <RecentPosts />
      <ContactInfo />
    </div>
  );
};

export default Sidebar;
