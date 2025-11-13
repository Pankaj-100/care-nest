"use client";

import Image from "next/image";
import React from "react";
import { TransparentButton } from "../common/CustomButton";
import { useRouter } from "next/navigation";
import { useGetBlogsQuery } from "@/store/api/blogApi";

type Blog = {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
};

const BlogsSection = () => {
  const { data: blogs = [], isLoading } = useGetBlogsQuery();

  // sort by createdAt/newest first and take top 3
  const latest = (blogs ?? [])
    .slice()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b: any) => ({
      id: b.id,
      title: b.title ?? "Untitled",
      author: b.authorName ?? "Unknown",
      date: b.blogDate ? new Date(b.blogDate).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "—",
      image: b.mainImage ?? "/service1.png",
      excerpt: b.description ?? "",
    })) as Blog[];

  return (
    <div className="sm:py-20 py-12 bg-[var(--whiteSmoke)] sm:px-28 px-8">
      <div className="sm:text-center flex items-center justify-center mb-10">
        <h1 className="font-medium sm:text-5xl text-3xl sm:text-center sm:w-2/3 capitalize">
          Resources are essential for human activities in various realms.
        </h1>
      </div>

      <div className="flex flex-wrap gap-y-8 items-center justify-center gap-10">
        {isLoading
          ? // show three skeleton cards while loading
            [0, 1, 2].map((i) => (
              <div key={i} className="sm:p-2 sm:w-90">
                <div className="sm:w-90 h-[300px] rounded-2xl mb-3 relative overflow-hidden bg-gray-100 animate-pulse" />
                <div className="h-6 bg-gray-100 rounded w-40 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-64 mb-2 animate-pulse" />
                <div className="h-8 bg-gray-100 rounded w-full animate-pulse mt-2" />
              </div>
            ))
          : latest.map((b) => <BlogCard key={b.id} {...b} />)}
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
            <p className="text-[var(--navy)] text-base">{author}</p>
          </div>

          <p className="text-[var(--navy)] text-base">{date}</p>
        </div>
        <h3 className=" font-semibold text-2xl my-2 text-[var(--navy)]">
          {title}
        </h3>
        <p className="w-full text-md text-[var(--navy)] mb-3">{excerpt}</p>
      </div>
      <TransparentButton className="w-full text-md" onClick={handleLearnMore}>
        Learn More
      </TransparentButton>
    </div>
  );
};

export default BlogsSection;
