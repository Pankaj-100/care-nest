"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomCarousel from "../common/CustomCarousel";
import { CarouselItem } from "../ui/carousel";

type TestimonialItem = {
  id: string;
  profilePic?: string;
  name?: string;
  profession?: string;
  rating?: number;
  description?: string;
  createdAt?: string;
};

const Testimonials: React.FC = () => {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/testimonial`;

    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        const list = json?.data?.testimonials ?? [];
        setItems(list);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch testimonials:", err);
        setError("Failed to load testimonials");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [API_BASE]);

  return (
    <div className="sm:py-20 py-12 bg-[var(--whiteSmoke)] sm:px-28 px-8">
      <div className="text-center flex items-center justify-center mb-10">
        <div className="flex flex-col font-medium sm:text-5xl text-5xl capitalize sm:items-center sm:gap-4">
          <div>Trusted by members across</div>
          <div>Houston</div>
        </div>
      </div>

      <CustomCarousel>
        {loading
          ? // show 3 skeleton slides while loading
            [0, 1, 2].map((i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-6 sm:w-84 w-auto bg-white rounded-2xl animate-pulse">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2 w-24" />
                  <div className="h-3 bg-gray-200 rounded mb-6 w-32" />
                  <div className="h-20 bg-gray-200 rounded" />
                </div>
              </CarouselItem>
            ))
          : error && items.length === 0
          ? // error fallback
            [
              <CarouselItem key="err" className="md:basis-1/2 lg:basis-1/3">
                <div className="p-6 sm:w-84 w-auto bg-white rounded-2xl">
                  <p className="text-red-600">Failed to load testimonials.</p>
                </div>
              </CarouselItem>,
            ]
          : // render testimonials (limit to first 6)
            (items ?? []).slice(0, 6).map((t) => {
              const description = t.description ?? "";
              const isLong = description.length > 150;
              const isExpanded = expandedItems.has(t.id);
              const displayText = isLong && !isExpanded ? description.slice(0, 150) + "..." : description;

              return (
                <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-6 sm:w-84 w-auto bg-white rounded-2xl h-full min-h-[280px] flex flex-col">
                    <div className="flex items-center gap-x-6 mb-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={t.profilePic ?? "/profile pic.jpg"}
                          alt={t.name ?? "User"}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{t.name ?? "Anonymous"}</h4>
                        <p className="text-gray-500 text-xs truncate">{t.profession ?? ""}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-3 my-3">
                      <p className="text-sm">{Array.from({ length: (t.rating ?? 0) }).map(() => "⭐").join("")}</p>
                      <p className="text-sm">{t.rating ?? 0}.0</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-base font-medium flex-1">{displayText}</p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpanded(t.id)}
                          className="text-[var(--navy)] hover:text-[var(--yellow)] font-semibold text-sm mt-2 transition-colors self-start"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
      </CustomCarousel>
    </div>
  );
};

export default Testimonials;
