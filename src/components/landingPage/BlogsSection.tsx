"use client";

import Image from "next/image";
import React from "react";
import { TransparentButton } from "../common/CustomButton";
import { useRouter } from "next/navigation";

type Blog = {
  id: string; // Add id field
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
};

const BLOGS: Blog[] = [
  {
    id: "b1", // Add unique id
    title: "Elderly Care at Home: How to Ensure Comfort & Safety",
    author: "Nataly Birch",
    date: "11 January 2025",
    image: "/service1.png",
    excerpt: "What the data says about the harm of unnecessary medical tests",
  },
  {
    id: "b2", // Add unique id
    title: "Assisted Care/Home Care: How to Ensure Comfort & Safety",
    author: "Alex Morgan",
    date: "05 January 2025",
    image: "/blog/blog2.png",
    excerpt: "Assisted home care provides daily support for comfort and safety.",
  },
  {
    id: "b3", // Add unique id
    title: "Memory Care: How to Ensure Comfort & Safety",
    author: "Jordan Lee",
    date: "02 January 2025",
    image: "/blog/blog3.png",
    excerpt: "Specialized support for dementia or Alzheimer's with compassion.",
  },
];

const BlogsSection = () => {
  return (
    <div className="sm:py-20 py-12 bg-[var(--whiteSmoke)] sm:px-28 px-8">
      <div className="sm:text-center flex items-center justify-center mb-10">
        <h1 className="font-medium sm:text-5xl text-3xl sm:text-center sm:w-2/3 capitalize">
          Resources are essential for human activities in various realms.
        </h1>
      </div>

      <div className="flex flex-wrap gap-y-8 items-center justify-center gap-10">
        {BLOGS.map((b) => (
          <BlogCard key={b.title} {...b} />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ id, title, author, date, image, excerpt }: Blog) => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(`/blogs/${id}`);
  };

  return (
    <div className="sm:p-2 sm:w-90">
      <div className="sm:w-90 h-[300px] rounded-2xl mb-3 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:1024px) 320px, 90vw"
          className="rounded-2xl object-cover"
          priority
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div className="relative w-5 h-5 rounded-full border border-[var(--navy)] overflow-hidden">
              <Image
                src={"/profile pic.jpg"}
                alt={`${author} avatar`}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[var(--navy)] text-sm">{author}</p>
          </div>

          <p className="text-[var(--navy)] text-sm">{date}</p>
        </div>
        <h3 className=" font-medium text-2xl my-2 text-[var(--navy)]">
          {title}
        </h3>
        <p className="w-full text-sm text-[var(--navy)] mb-3">{excerpt}</p>
      </div>
      <TransparentButton className="w-full" onClick={handleLearnMore}>
        Learn more
      </TransparentButton>
    </div>
  );
};

export default BlogsSection;
