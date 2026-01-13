import MainContent from "@/components/Blog/MainContent";
import Sidebar from "@/components/Blog/Sidebar";
import React from "react";

type BlogItem = {
  id: string;
  mainImage?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorProfilePic?: string;
  blogDate?: string;
  content?: string;
};

const BlogPostPage: React.FC<{ blog?: BlogItem | null }> = ({ blog }) => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:mx-[4.2rem] mx-[1.2rem] my-4 ">
      <MainContent blog={blog} />
      <Sidebar />
    </div>
  );
};

export default BlogPostPage;
