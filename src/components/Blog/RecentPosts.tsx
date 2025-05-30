import Image from "next/image";
import React from "react";

interface Post {
  title: string;
  image: string;
  author: string;
  date: string;
  avatar: string;
}

const posts: Post[] = [
  {
    title: "Elderly Care at Home: How to Ensure Comfort...",
    image: "/Blog/inner_blog5.png",
    author: "Nandy Birch",
    date: "11 January 2025",
    avatar: "/Blog/avatar_img.png",
  },
  {
    title: "Elderly Care at Home: How to Ensure Comfort...",
    image: "/Blog/inner_blog4.png",
    author: "Nandy Birch",
    date: "11 January 2025",
    avatar: "/Blog/avatar_img.png",
  },
  {
    title: "Elderly Care at Home: How to Ensure Comfort...",
    image: "/Blog/inner_blog3.png",
    author: "Nandy Birch",
    date: "11 January 2025",
    avatar: "/Blog/avatar_img.png",
  },
  {
    title: "Elderly Care at Home: How to Ensure Comfort...",
    image: "/Blog/inner_blog2.png",
    author: "Nandy Birch",
    date: "11 January 2025",
    avatar: "/Blog/avatar_img.png",
  },
  {
    title: "Elderly Care at Home: How to Ensure Comfort...",
    image: "/Blog/inner_blog1.png",
    author: "Nandy Birch",
    date: "11 January 2025",
    avatar: "/Blog/avatar_img.png",
  },
];

const RecentPosts: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl text-[var(--navy)] font-semibold mb-4">Recent Posts</h2>
      <div className="space-y-8">
        {posts.map((post, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <img
              src={post.image}
              alt={`Thumbnail for ${post.title}`}
              className="w-20 h-20 object-cover rounded-2xl"
            />
            <div>
              <p className="text-md text-[var(--navy)] font-semibold leading-[150%] font-urbanist">
                {post.title}
              </p>

              <div className="flex items-center gap-x-2">
                <div className="relative w-6 h-6 rounded-full border border-[var(--navy)] overflow-hidden">
                  <Image
                    src={post.avatar}
                    width={24}
                    height={24}
                    alt="Profile Picture"
                    className="object-cover"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  {post.author} • {post.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
