
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Post {
  id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  avatar: string;
}

// ...existing code...

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <div>
      <h2 className="text-3xl text-[var(--navy)] font-semibold mb-4">Recent Posts</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="flex gap-3 items-start group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <Image
              src={post.image}
              alt={`Thumbnail for ${post.title}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-2xl"
            />
            <div>
              <p className="text-md text-[var(--navy)] font-semibold leading-[150%] font-urbanist group-hover:text-[#F2A307] transition-colors">
                {post.title}
              </p>

              <div className="flex items-center gap-x-2">
                <div className="relative w-6 h-6 rounded-full border border-[var(--navy)] overflow-hidden">
                  <Image
                    src={post.avatar && post.avatar.trim() !== "" ? post.avatar : "/Blog/avatar_img.png"}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
