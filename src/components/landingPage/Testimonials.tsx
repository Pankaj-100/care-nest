"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomCarousel from "../common/CustomCarousel";
import Autoplay from "embla-carousel-autoplay";
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

const cdnURL = "https://creative-story.s3.us-east-1.amazonaws.com";

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
    <div className="py-12 sm:py-20 bg-[var(--whiteSmoke)] px-4 sm:px-10 lg:px-24 xl:px-28">
      <div className="text-center flex items-center justify-center mb-10">
        <div className="flex flex-col font-semibold text-3xl sm:text-4xl lg:text-5xl capitalize items-center gap-2 sm:gap-3">
          <div>Trusted by Houston Families</div>
          <div>Who Count on Quality Care</div>
        </div>
      </div>

      <CustomCarousel plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}>
        {loading
          ? // show 3 skeleton slides while loading
            [0, 1, 2].map((i) => (
              <CarouselItem key={i} className="basis-full sm:basis-4/5 md:basis-2/3 lg:basis-1/2 xl:basis-2/5 px-2 flex justify-center">
                <div className="p-6 w-full bg-white rounded-3xl animate-pulse min-h-[260px]">
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
              <CarouselItem key="err" className="basis-full sm:basis-4/5 md:basis-2/3 lg:basis-1/2 xl:basis-2/5 px-2 flex justify-center">
                <div className="p-6 w-full bg-white rounded-3xl">
                  <p className="text-red-600">Failed to load testimonials.</p>
                </div>
              </CarouselItem>,
            ]
          : // render all testimonials
            (items ?? []).map((t) => {
              const description = t.description ?? "";
              const isLong = description.length > 150;
              const isExpanded = expandedItems.has(t.id);
              const displayText = isLong && !isExpanded ? description.slice(0, 150) + "..." : description;

              return (
                <CarouselItem
                  key={t.id}
                  className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/3 px-2 flex justify-center"
                >
                  <a
                    href="https://maps.app.goo.gl/iCk7qtVoxYZefKEF7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 sm:p-8 w-full bg-white rounded-3xl h-full min-h-[260px] flex flex-col focus:outline-none focus:ring-2 focus:ring-[var(--yellow)]"
                  >
                    <div className="flex items-center gap-x-4 sm:gap-x-6 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={t.profilePic ?? "/profile pic.jpg"}
                          alt={t.name ?? "User"}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-medium truncate">{t.name ?? "Anonymous"}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm truncate">{t.profession ?? ""}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-3 my-3">
                      <p className="text-sm sm:text-base">{Array.from({ length: (t.rating ?? 0) }).map(() => "⭐").join("")}</p>
                      <p className="text-sm sm:text-base">{t.rating ?? 0}.0</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-base sm:text-lg font-medium flex-1 leading-relaxed">{displayText}</p>
                      {isLong && (
                        <button
                          onClick={() => toggleExpanded(t.id)}
                          className="text-[var(--navy)] hover:text-[var(--yellow)] font-semibold text-sm sm:text-base mt-2 transition-colors self-start"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </a>
                </CarouselItem>
              );
            })}
      </CustomCarousel>
    </div>
  );
};

export default Testimonials;
