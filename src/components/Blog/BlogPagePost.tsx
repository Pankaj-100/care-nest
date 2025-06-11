import MainContent from "@/components/Blog/MainContent";
import Sidebar from "@/components/Blog/Sidebar";
import React from "react";

const BlogPostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex flex-col md:flex-row gap-8 lg:mx-[4.2rem] mx-[1.2rem] my-4 ">
      <MainContent />
      <Sidebar />
    </div>
  );
};

export default BlogPostPage;
