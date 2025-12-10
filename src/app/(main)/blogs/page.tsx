"use client";
import React from "react";
import Section3 from "@/components/Blog/Section3";
import CardSection from "@/components/Blog/CardSection";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import { useGetBlogsQuery } from "@/store/api/blogApi";

export default function BlogsPage() {
  const [page, setPage] = React.useState(1);
  const pageSize = 9;
  const { data, isLoading, isError } = useGetBlogsQuery({ page, pageSize });
  const blogs = data?.blogs ?? [];
  const pagination = data?.pagination ?? {};
  const totalPages = pagination.totalPages ?? 1;

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
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-8">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
