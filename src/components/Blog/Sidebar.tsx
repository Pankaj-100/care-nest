import React from "react";
import RecentPosts from "./RecentPosts";
import ContactInfo from "../common/ContactInfo";

// Helper to fetch recent posts server-side
async function fetchRecentPosts() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/blog?page=1&pageSize=5`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const blogs = json?.data?.blogs ?? [];
      return blogs.map((b: {
        id: string;
        title?: string;
        mainImage?: string;
        authorName?: string;
        blogDate?: string;
        authorProfilePic?: string;
      }) => ({
        id: b.id,
        title: b.title ?? "Untitled",
        image: b.mainImage ?? "/Blog/inner_blog5.png",
        author: b.authorName ?? "Unknown",
        date: b.blogDate ? new Date(b.blogDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "—",
        avatar: b.authorProfilePic ?? "/Blog/avatar_img.png",
      }));
    }
  } catch {
    // ignore error
  }
  return [];
}

const Sidebar = async () => {
  const posts = await fetchRecentPosts();
  return (
    <div className="w-full md:w-1/3 space-y-8">
      <RecentPosts posts={posts} />
      <ContactInfo />
    </div>
  );
};

export default Sidebar;
