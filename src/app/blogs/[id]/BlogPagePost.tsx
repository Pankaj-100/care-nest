import MainContent from "@/components/Blog/MainContent";
import Sidebar from "@/components/Blog/Sidebar";
import React from "react";


const BlogPostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      <MainContent/>
      <Sidebar />
    </div>
  );
};

export default BlogPostPage;
