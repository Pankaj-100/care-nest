"use client";

import Image from "next/image";
import React, { useState } from "react";
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

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + latest.length) % latest.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % latest.length);
  };

  const currentBlog = latest[currentIndex];

  return (
    <div className="py-10 sm:py-16 bg-[var(--whiteSmoke)] px-4 sm:px-8 lg:px-20 xl:px-28">
      <div className="flex items-center justify-center mb-8 sm:mb-10 text-center">
        <h1 className="font-medium text-3xl sm:text-4xl lg:text-5xl leading-snug max-w-xl sm:max-w-3xl capitalize">
          Resources Are Essential For Human Activities In Various Realms.
        </h1>
      </div>

      {/* Mobile: single card with left/right controls */}
      <div className="block md:hidden">
        {isLoading || !currentBlog ? (
          <div className="sm:p-2 sm:w-90">
            <div className="sm:w-90 h-[300px] rounded-2xl mb-3 relative overflow-hidden bg-gray-100 animate-pulse" />
            <div className="h-6 bg-gray-100 rounded w-40 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-64 mb-2 animate-pulse" />
            <div className="h-8 bg-gray-100 rounded w-full animate-pulse mt-2" />
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <BlogCard key={currentBlog.id} {...currentBlog} />
            </div>
            <div className="flex items-center justify-center gap-6 mt-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[var(--navy)] flex items-center justify-center text-[var(--navy)] text-xl"
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[var(--navy)] flex items-center justify-center text-[var(--navy)] text-xl"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tablet & Desktop: show up to three cards side by side */}
      <div className="hidden md:flex flex-wrap items-stretch justify-center gap-8 lg:gap-10">
        {isLoading
          ? [0, 1, 2].map((i) => (
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
    <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg sm:p-2">
      <div className="w-full h-72 sm:h-80 md:h-[360px] rounded-3xl mb-4 relative overflow-hidden">
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
            <div className="relative w-7 h-7 rounded-full border border-[var(--navy)] overflow-hidden">
              <Image
                src={"/profile pic.jpg"}
                alt={`${author} avatar`}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[var(--navy)] text-sm sm:text-base">{author}</p>
          </div>

          <p className="text-[var(--navy)] text-sm sm:text-base">{date}</p>
        </div>
        <h3 className="font-semibold text-2xl sm:text-3xl my-3 text-[var(--navy)]">
          {title}
        </h3>
        <p className="w-full text-base sm:text-lg text-[var(--navy)] mb-6 line-clamp-3">
          {excerpt}
        </p>
      </div>
      <TransparentButton className="w-full text-base sm:text-lg py-3 sm:py-4 rounded-full" onClick={handleLearnMore}>
        Learn More
      </TransparentButton>
    </div>
  );
};

export default BlogsSection;
