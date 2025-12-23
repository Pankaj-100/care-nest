"use client";

import React, { useEffect, useState } from "react";
import { LinkIcon } from "../icons/page";

type ResourceCard = {
  id: string;
  title: string;
  badges: string[];
  description: string;
  redirectUrl: string;
};

type ResourcesPayload = {
  id: string;
  title: string;
  description: string;
  resourceCards: ResourceCard[];
};

export default function ResourcesPage() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [data, setData] = useState<ResourcesPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let mounted = true;
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/resources`;

    setLoading(true);
    fetch(endpoint, { method: "GET" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json;
      })
      .then((json) => {
        if (!mounted) return;
        const resources = json?.data?.resources ?? null;
        if (!resources) {
          setError("No resources found");
        } else {
          setData(resources);
          const count = resources.resourceCards?.length ?? 0;
          setTotalPages(Math.max(1, Math.ceil(count / pageSize)));
          setPage(1);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch resources:", err);
        setError("Failed to load resources");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span>Loading resources...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span className="text-red-600">{error ?? "No resources available"}</span>
      </div>
    );
  }

  const allCards = data.resourceCards ?? [];
  const cards = allCards.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
      <h4 className="text-center text-[var(--yellow)] font-semibold mb-4 text-3xl">
        Essential Resources That Support Seniors on Their Care Journey
      </h4>
      <h1 className="text-center text-[var(--navy)] font-bold text-4xl mb-6">
        {data.title}
      </h1>
      <p className="max-w-4xl text-lg text-center text-gray-500 mb-8 ">
        {data.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-[#F7F7F3] rounded-xl shadow-sm p-6 flex flex-col justify-between"
          >
            <div className="flex gap-2 mb-2 flex-wrap">
              {card.badges.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#E7E7E7] text-[#233D4D] text-md font-semibold px-4 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-[#233D4D] mb-2">
              {card.title}
            </h3>
            <p className="text-gray-500 text-lg mb-6 line-clamp-4">
              {card.description}
            </p>
            <a
              href={card.redirectUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#233D4D] text-white px-3 py-2 rounded-full font-semibold text-md hover:bg-[#1a2c3b] transition"
            >
              Explore Resources
              <LinkIcon />
            </a>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 rounded-full bg-[#233D4D] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-[#233D4D] font-semibold">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
            className="px-4 py-2 rounded-full bg-[#233D4D] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}