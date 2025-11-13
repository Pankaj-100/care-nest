"use client";

import React from "react";
import Section3 from "@/components/Blog/Section3";
import CardSection from "@/components/Blog/CardSection";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import { useGetBlogsQuery } from "@/store/api/blogApi";

export default function BlogsPage() {
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <span>Loading blogs...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <span className="text-red-600">Failed to load blogs</span>
      </div>
    );
  }

  const latest = blogs.length > 0 ? blogs[0] : null;
  const rest = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <main>
      <HeroSectionCareProvider title="Blogs" textClasses="lg:ml-10 " />
      <Section3 blog={latest} />
      <CardSection blogs={rest} />
    </main>
  );
}
