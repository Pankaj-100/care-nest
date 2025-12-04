"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { allServicesData } from './data';

// API Response Types
export interface ApiServiceItem {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceIcon?: string;
  careType: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
  description3Image?: string;
  description3List: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiFaqItem {
  id: string;
  faqType: string;
  sectionTitle: string;
  faqItems: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceTemplateProps {
  careType: string;
  fallbackData?: ApiServiceItem;
  fallbackKey?: string; // e.g., 'personalCare', 'companionCare'
}

// convert "Personal Care" -> "personalCare", "Home Maker Service" -> "homeCare"
// Special cases for FAQ API types
function titleToFaqType(title: string) {
  const lowerTitle = title.toLowerCase();
  
  // Handle special cases
  if (lowerTitle.includes("specialized care")) {
    return "specalizedCare";
  }
  if (lowerTitle.includes("home maker")) {
    return "homeCare";
  }
  if (lowerTitle.includes("sitter")) {
    return "sitter";
  }
  
  const parts = title
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return title.toLowerCase();
  return parts
    .map((p, i) => (i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()))
    .join("");
}


export default function ServiceTemplate({ careType, fallbackKey = "personalCare" }: ServiceTemplateProps) {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [serviceData, setServiceData] = useState<ApiServiceItem | null>(null);
  const [faqData, setFaqData] = useState<ApiFaqItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Get static contact banner data from data.tsx
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactBannerData = (allServicesData as any)[fallbackKey]?.contactBanner || allServicesData.personalCare.contactBanner;

  useEffect(() => {
    async function fetchData() {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

      // If no API_BASE or careType is undefined/empty, do not fetch
      if (!API_BASE || !careType || careType === "undefined") {
        setLoading(false);
        setServiceData(null);
        return;
      }

      try {
        // Fetch service data with timeout
        const serviceEndpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/service-cms/care-type/${encodeURIComponent(careType)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const serviceRes = await fetch(serviceEndpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (serviceRes.ok) {
          const serviceJson = await serviceRes.json();
          const apiItem = Array.isArray(serviceJson?.data?.services) && serviceJson.data.services.length > 0
            ? serviceJson.data.services[0]
            : null;

          if (apiItem) {
            setServiceData(apiItem);

            // Fetch FAQ data using careType from API
            const faqSourceTitle = (apiItem?.careType || careType).toString();
            const faqType = titleToFaqType(faqSourceTitle);

            const faqEndpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/${encodeURIComponent(faqType)}`;
            const faqController = new AbortController();
            const faqTimeoutId = setTimeout(() => faqController.abort(), 10000);

            const faqRes = await fetch(faqEndpoint, {
              headers: {
                'Content-Type': 'application/json',
              },
              signal: faqController.signal,
            });
            clearTimeout(faqTimeoutId);

            if (faqRes.ok) {
              const faqJson = await faqRes.json();
              const apiFaq = Array.isArray(faqJson?.data?.faqs) && faqJson.data.faqs.length > 0
                ? faqJson.data.faqs[0]
                : null;

              if (apiFaq) {
                setFaqData(apiFaq);
              }
            }
          } else {
            setServiceData(null);
          }
        } else {
          setServiceData(null);
        }
      } catch {
        setServiceData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [careType]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  // Helper function to parse HTML content into paragraphs
  const parseHtmlToParagraphs = (html: string): string[] => {
    if (!html) return [];
    const paragraphs = html
      .split(/<\/?p>/gi)
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => p.replace(/<\/?[^>]+(>|$)/g, "").trim())
      .filter(p => p.length > 0);
    return paragraphs.length > 0 ? paragraphs : [html.replace(/<\/?[^>]+(>|$)/g, "").trim()].filter(p => p.length > 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Location Section Skeleton */}
        <div className="w-full bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-16">
              <Skeleton width={400} height={60} className="mx-auto" />
            </h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              <Skeleton count={3} height={24} />
            </div>
          </div>
        </div>

        {/* Main Section Skeleton */}
        <div className="w-full bg-[#F7F7F3] py-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 lg:pr-8">
              <Skeleton width="100%" height={80} className="mb-8" />
            </div>
            <div className="flex-1 space-y-6">
              <Skeleton count={4} height={20} />
            </div>
          </div>
        </div>

        {/* Services Section Skeleton */}
        <div className="w-full bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">
            <div className="flex-1">
              <Skeleton width={300} height={50} className="mb-12" />
              <div className="space-y-4">
                <Skeleton count={8} height={24} />
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton width={400} height={300} className="rounded-lg" />
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16">
            <Skeleton count={3} height={20} />
          </div>
        </div>

        {/* Contact Banner Skeleton */}
        <div className="w-full bg-[#F2A307] py-10 px-2">
          <div className="max-w-5xl mx-auto text-center">
            <Skeleton width={400} height={50} className="mb-4 mx-auto" baseColor="#d4950a" highlightColor="#f5b742" />
            <Skeleton count={2} height={24} className="mb-4 mx-auto max-w-4xl" baseColor="#d4950a" highlightColor="#f5b742" />
            <Skeleton width={150} height={50} className="rounded-full mx-auto" baseColor="#233D4D" highlightColor="#3a5d6d" />
          </div>
        </div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Service not found</p>
          <p className="text-gray-500 text-sm mt-2">Please check the service type or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      

      {/* Location Section */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl lg:text-5xl font-bold text-[#233D4D] mb-16">
            {serviceData.title2}
          </h2>
          
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto">
            {parseHtmlToParagraphs(serviceData.description2 || "").map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className="w-full bg-[#F7F7F3] py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 lg:pr-8">
            <h1 className="text-5xl lg:text-5xl font-bold text-[#233D4D] leading-tight mb-8">
              {serviceData.title1}
            </h1>
          </div>
          
          <div className="flex-1 space-y-6">
            {parseHtmlToParagraphs(serviceData.description1 || "").map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Services We Provide Section */}
      <div className="w-full bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          {/* Image: above content on mobile, beside on md+ */}
          <div className="w-full md:w-auto flex justify-center mb-4 md:mb-0 md:order-2">
            <div className="relative w-92 h-66 sm:w-80 sm:h-64 md:w-80 md:h-64 lg:w-116 lg:h-72">
              <Image
                src={serviceData.description3Image || "/service-default.jpg"}
                alt={`${serviceData.serviceName} service`}
                fill
                className="rounded-lg shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="flex-1 md:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-12">
              {serviceData.title3}
            </h2>
            <div className="space-y-4">
              {(serviceData.description3List || []).map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#233D4D] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg text-[#233D4D] font-medium">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 space-y-6">
          {parseHtmlToParagraphs(serviceData.description3 || "").map((description, index) => (
            <p key={index} className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      {faqData && faqData.faqItems && faqData.faqItems.length > 0 && (
        <div className="w-full bg-[#F7F7F3] py-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
            <div className="flex-1 lg:pr-8">
              <p className="text-[#F2A307] font-semibold text-lg mb-4">
                {faqData.sectionTitle}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] leading-tight">
                Frequently asked questions
              </h2>
            </div>
            
            <div className="flex-1 bg-[#233D4D0A] space-y-4">
              {faqData.faqItems.map((faq, index) => (
                <div key={faq.id} className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <span className="font-semibold text-[#233D4D] text-lg pr-4">
                      {faq.question}
                    </span>
                    <span className="text-[#233D4D] text-2xl font-light flex-shrink-0">
                      {openFAQ === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Banner Section */}
      <div className="w-full bg-[#F2A307] py-10 px-2">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-4 leading-tight">
            {contactBannerData.title}
          </h2>
          
          <p className="text-lg lg:text-2xl text-white font-light leading-relaxed mb-4 max-w-7xl mx-auto">
            {contactBannerData.description}
          </p>
          
          <button className="bg-[#233D4D] hover:bg-[#1a2a35] text-white font-semibold px-10 py-5 rounded-full text-xl transition-colors duration-300 flex items-center gap-2 mx-auto">
            {contactBannerData.buttonText}
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>

    </div>
  );
}