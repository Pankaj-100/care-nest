"use client";

import Image from "next/image";
import React, { useState } from "react";
import { quotes } from "@/lib/svg_icons";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    text: "I’ve been working as a caregiver for over 5 years, but this platform gave me better visibility and more consistent opportunities. Plus, the in-app communication and timely payments make the whole experience smooth.",
    author: "David R., Vancouver, BC",
  },
  {
    text: "This platform helped me connect with the right clients and build long-term trust. Payments are always on time and the process is super simple.",
    author: "Sarah K., Toronto, ON",
  },
  {
    text: "As a part-time caregiver, I love how flexible and transparent this app is. I can manage my schedule and focus on quality care.",
    author: "Michael L., Calgary, AB",
  },
];

const TestimonialCareProvider = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-x-16 gap-y-8 items-center justify-start lg:p-18 p-8 w-full">
      {/* Left Section - Testimonial Text */}
      <div className="w-full lg:w-[40%]">
        <Testimonial />
      </div>

      {/* Right Section - Title + Images */}
      <div className="w-full lg:w-[60%]">
        <h1 className="font-semibold lg:text-4xl text-xl text-[var(--navy)] text-center lg:text-right">
          Caregiver’s Testimonial
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-6 sm:justify-end lg:justify-end lg:ml-auto">
          <div className="relative w-full sm:basis-[42%] h-64 md:h-72 lg:h-[24rem] xl:h-[28rem] overflow-hidden">
            <Image
              src={"/care-provider-testimonial-1.png"}
              alt="Care provider with client"
              fill
              className="object-cover"
              sizes="(min-width:1280px) 36rem, (min-width:1024px) 30rem, (min-width:640px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="relative w-full sm:basis-[42%] h-64 md:h-72 lg:h-[24rem] xl:h-[28rem] overflow-hidden">
            <Image
              src={"/care-provider-testimonial-2.png"}
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

export const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <div className="max-w-[30rem] mx-auto lg:mx-0 text-center lg:text-left">
      {/* Quote Icon */}
      <div className="mb-6 flex justify-center lg:justify-start">{quotes}</div>

      {/* Testimonial Text */}
      <p className="text-gray-600">{testimonials[index].text}</p>

      {/* Author */}
      <p className="mt-4 font-bold lg:text-lg text-[var(--navy)]">
        {testimonials[index].author}
      </p>

      {/* Navigation Buttons */}
      <div className="flex justify-center lg:justify-start gap-6 mt-6">
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
      </div>
    </div>
  );
};

export default TestimonialCareProvider;
