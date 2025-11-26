"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { quotes } from "@/lib/svg_icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
interface ApiTestimonial {
  id: string;
  name: string;
  description: string;
}

const TestimonialCareProvider = () => {
  const [title, setTitle] = useState("Caregiver’s Testimonial");
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [image1, setImage1] = useState("/care-provider-testimonial-1.png");
  const [image2, setImage2] = useState("/care-provider-testimonial-2.png");

  useEffect(() => {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "";
    const fetchBecomeCaregiver = async () => {
      if (!API_BASE) return;
      try {
        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/become-caregiver`;
        const res = await fetch(endpoint);
        if (!res.ok) return;

        const json = await res.json();
        const data = json?.data?.becomeCaregiver;
        if (data) {
          if (data.title3) setTitle(data.title3);
          if (Array.isArray(data.testimonials)) {
            setTestimonials(
              data.testimonials.map((t: { id: string; name: string; description: string }) => ({
                id: t.id,
                name: t.name,
                description: t.description,
              }))
            );
          }
          if (data.testImage1) setImage1(data.testImage1);
          if (data.testImage2) setImage2(data.testImage2);
        }
      } catch (err) {
        console.error("Failed to fetch become-caregiver content for testimonials:", err);
      }
    };

    fetchBecomeCaregiver();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col gap-x-16 gap-y-8 items-center justify-start lg:p-18 p-8 w-full">
      {/* Left Section - Testimonial Text */}
      <div className="w-full lg:w-[40%]">
        <Testimonial testimonials={testimonials} />
      </div>

      {/* Right Section - Title + Images */}
      <div className="w-full lg:w-[60%]">
        <h1 className="font-semibold lg:text-4xl text-xl text-[var(--navy)] text-center lg:text-right">
          {title}
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-6 sm:justify-end lg:justify-end lg:ml-auto">
          <div className="relative w-full sm:basis-[42%] h-64 md:h-72 lg:h-[24rem] xl:h-[28rem] overflow-hidden">
            <Image
              src={image1}
              alt="Care provider with client"
              fill
              className="object-cover"
              sizes="(min-width:1280px) 36rem, (min-width:1024px) 30rem, (min-width:640px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="relative w-full sm:basis-[42%] h-64 md:h-72 lg:h-[24rem] xl:h-[28rem] overflow-hidden">
            <Image
              src={image2}
              alt="Conversation with client"
              fill
              className="object-cover"
              sizes="(min-width:1280px) 26rem, (min-width:1024px) 22rem, (min-width:640px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestimonialProps {
  testimonials: ApiTestimonial[];
}

export const Testimonial = ({ testimonials }: TestimonialProps) => {
  const [index, setIndex] = useState(0);

  const hasTestimonials = testimonials.length > 0;

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  const nextSlide = () =>
    setIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="max-w-[30rem] mx-auto lg:mx-0 text-center lg:text-left">
      {/* Quote Icon */}
      <div className="mb-6 flex justify-center lg:justify-start">{quotes}</div>

      {/* Testimonial Text */}
      <p className="text-gray-600">
        {hasTestimonials
          ? testimonials[index].description
          : "Working with CareWorks has been life-changing. The support and meaningful connections with clients make every day rewarding."}
      </p>

      {/* Author */}
      <p className="mt-4 font-bold lg:text-lg text-[var(--navy)]">
        {hasTestimonials ? testimonials[index].name : "Caregiver"}
      </p>

      {/* Navigation Buttons */}
      <div className="flex justify-center lg:justify-start gap-6 mt-6">
        {hasTestimonials && (
          <>
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F2A307] hover:bg-orange-400 transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F2A307] hover:bg-orange-400 transition"
            >
              <ArrowRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialCareProvider;
