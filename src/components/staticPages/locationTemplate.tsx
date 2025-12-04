"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface LocationServiceData {
  city: string;
  state: string;
  heroTitle: string;
  heroImage?: string;
  heroDescription: string;
  whyChooseTitle: string;
  whyChooseDescription: string;
  // API does not currently return highlights array, keep optional for future
  whyChooseHighlights?: string[];
  servicesIntro: string;
  servicesDescription?: string;
  services: {
    id: string;
    title: string;
    items: string[];
    image: string;
  }[];
  careDesignedTitle: string;
  careDesignedDescription: string;
  careDesignedImage?: string;
  proudlyServingTitle: string;
  proudlyServingDescription: string;
  steadyPartnerTitle: string;
  steadyPartnerDescription: string;
}

interface LocationTemplateProps {
  slug: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "";

export default function LocationTemplate({ slug }: LocationTemplateProps) {
  const [data, setData] = useState<LocationServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!API_BASE || !slug) {
        setLoading(false);
        return;
      }

      try {
        const [cityPart, statePart] = slug.split("-");
        if (!cityPart || !statePart) {
          setLoading(false);
          return;
        }

        const city = decodeURIComponent(cityPart);
        const state = decodeURIComponent(statePart).toUpperCase();

        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/location-services/city/${encodeURIComponent(
          city
        )}/state/${encodeURIComponent(state)}`;

        const res = await fetch(endpoint);
        if (!res.ok) {
          setLoading(false);
          return;
        }

        const json = await res.json();
        const location = json?.data?.locationService as LocationServiceData | undefined;
        if (location) {
          setData(location);
        }
      } catch (err) {
        console.error("Failed to fetch location service page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full">
        {/* Hero Section Skeleton */}
        <section className="bg-white py-26 px-6 md:px-8 lg:px-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <Skeleton height={48} width="75%" style={{ marginBottom: 24 }} />
            </div>
            <div>
              <Skeleton height={24} width="100%" style={{ marginBottom: 8 }} />
              <Skeleton height={24} width="83%" style={{ marginBottom: 8 }} />
              <Skeleton height={24} width="66%" />
            </div>
          </div>
        </section>

        {/* Hero Image Skeleton */}
        <section className="relative w-full h-[400px] md:h-[500px]">
          <Skeleton height="100%" width="100%" style={{ position: "absolute", inset: 0 }} />
        </section>

        {/* Why Choose Section Skeleton */}
        <section className="bg-[#F5F5DC] py-26 px-6 md:px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <Skeleton height={40} width="50%" style={{ marginBottom: 32, marginLeft: "auto", marginRight: "auto" }} />
            <div className="space-y-4">
              <Skeleton height={24} width="100%" />
              <Skeleton height={24} width="83%" />
            </div>
          </div>
        </section>

        {/* Services Section Skeleton */}
        <section className="bg-white py-16 px-6 md:px-8 lg:px-24">
          <div className="max-w-8xl mx-auto">
            <Skeleton height={32} width="33%" style={{ marginBottom: 16, marginLeft: "auto", marginRight: "auto" }} />
            <Skeleton height={32} width="50%" style={{ marginBottom: 32, marginLeft: "auto", marginRight: "auto" }} />
            <Skeleton height={24} width="66%" style={{ marginBottom: 16, marginLeft: "auto", marginRight: "auto" }} />
            <div className="space-y-12">
              {[1,2].map((_, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Skeleton height={24} width="50%" style={{ marginBottom: 16 }} />
                    <div className="space-y-3">
                      {[1,2,3].map((__, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Skeleton circle height={24} width={24} />
                          <Skeleton height={20} width="66%" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Skeleton height="100%" width="100%" style={{ position: "absolute", inset: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Care Designed & Community Section Skeleton */}
        <section className="bg-white py-16 px-6 md:px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
                <Skeleton height="100%" width="100%" style={{ position: "absolute", inset: 0 }} />
              </div>
              <div className="space-y-12">
                <div>
                  <Skeleton height={32} width="66%" style={{ marginBottom: 24 }} />
                  <Skeleton height={24} width="100%" />
                </div>
                <div>
                  <Skeleton height={28} width="50%" style={{ marginBottom: 16 }} />
                  <Skeleton height={24} width="100%" />
                </div>
                <div>
                  <Skeleton height={28} width="50%" style={{ marginBottom: 16 }} />
                  <Skeleton height={24} width="100%" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-lg text-gray-600">Location details not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white py-26 px-6 md:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-5xl md:text-5xl font-bold text-[#2C3E50] mb-6 leading-tight">
              {data.heroTitle}
            </h1>
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed text-justify text-lg">
              {data.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={data.heroImage || "/locationHero.png"}
          alt={`Home care services in ${data.city}`}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#F5F5DC] py-26 px-6 md:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-center text-[#2C3E50] mb-8">
            {data.whyChooseTitle}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-justify text-lg">
              {data.whyChooseDescription}
            </p>
            {data.whyChooseHighlights?.map((highlight, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed text-justify text-xl"
              >
                {highlight}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 px-6 md:px-8 lg:px-24">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#2C3E50] mb-4">
            Our Senior Home Care
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#2C3E50] mb-8">
            Services In {data.city}
          </h3>
          <p className="text-center text-gray-700 text-lg mb-4 max-w-5xl mx-auto">
            {data.servicesIntro}
          </p>
          {data.servicesDescription && (
            <p className="text-center text-gray-700 text-lg mb-12 max-w-5xl mx-auto">
              {data.servicesDescription}
            </p>
          )}

          <div className="space-y-12">
            {data.services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h4 className="text-4xl font-bold text-[#2C3E50] mb-4">
                        {service.title}
                      </h4>
                      <ul className="space-y-3">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#2C3E50] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-xl">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden order-2 md:order-1">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="order-1 md:order-2">
                      <h4 className="text-5xl font-bold text-[#2C3E50] mb-4">
                        {service.title}
                      </h4>
                      <ul className="space-y-3">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#2C3E50] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Designed & Community Section */}
      <section className="bg-white py-16 px-6 md:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left side - Image */}
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={data.careDesignedImage || "/location/location5.png"}
                alt="Care designed for your family"
                fill
                className="object-cover"
              />
            </div>

            {/* Right side - Three sections stacked */}
            <div className="space-y-12">
              {/* Care Designed Section */}
              <div>
                <h2 className="text-4xl md:text-4xl font-bold text-[#2C3E50] mb-6">
                  {data.careDesignedTitle}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed text-justify">
                  {data.careDesignedDescription}
                </p>
              </div>

              {/* Proudly Serving Section */}
              <div>
                <h3 className="text-4xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                  {data.proudlyServingTitle}
                </h3>
                <p className="text-gray-700  text-lg leading-relaxed text-justify">
                  {data.proudlyServingDescription}
                </p>
              </div>

              {/* Steady Partner Section */}
              <div>
                <h3 className="text-4xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                  {data.steadyPartnerTitle}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed text-justify">
                  {data.steadyPartnerDescription}
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </section>
    {/* Contact Banner Section */}
    <div className="w-full bg-[#F2A307] py-10 px-2">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-4 leading-tight">
          Get In Touch With Us
        </h2>
        <p className="text-lg lg:text-2xl text-white font-light leading-relaxed mb-4 max-w-7xl mx-auto">
          Have questions about our senior home care services or want to discuss your family’s needs? Our team is here to help you every step of the way. Reach out today for personalized support and guidance.
        </p>
        <button className="bg-[#233D4D] hover:bg-[#1a2a35] text-white font-semibold px-10 py-5 rounded-full text-xl transition-colors duration-300 flex items-center gap-2 mx-auto">
          Contact Us
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  </div>
  );
}
