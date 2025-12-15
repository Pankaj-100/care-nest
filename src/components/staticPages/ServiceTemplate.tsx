import Image from 'next/image';
import 'react-loading-skeleton/dist/skeleton.css';
import { allServicesData } from './data';
import * as React from "react";
import FAQSection from "./FAQSection";

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


export default async function ServiceTemplate({ careType, fallbackKey = "personalCare", fallbackData }: ServiceTemplateProps) {
  // SSR: fetch service and FAQ data server-side
  let serviceData: ApiServiceItem | null = null;
  let faqData: ApiFaqItem | null = null;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  if (API_BASE && careType && careType !== "undefined") {
    try {
      const serviceEndpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/service-cms/care-type/${encodeURIComponent(careType)}`;
      const serviceRes = await fetch(serviceEndpoint, { headers: { 'Content-Type': 'application/json' }, cache: "no-store" });
      if (serviceRes.ok) {
        const serviceJson = await serviceRes.json();
        serviceData = Array.isArray(serviceJson?.data?.services) && serviceJson.data.services.length > 0
          ? serviceJson.data.services[0]
          : null;
        if (serviceData) {
          const faqSourceTitle = (serviceData?.careType || careType).toString();
          const faqType = titleToFaqType(faqSourceTitle);
          const faqEndpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/${encodeURIComponent(faqType)}`;
          const faqRes = await fetch(faqEndpoint, { headers: { 'Content-Type': 'application/json' }, cache: "no-store" });
          if (faqRes.ok) {
            const faqJson = await faqRes.json();
            faqData = Array.isArray(faqJson?.data?.faqs) && faqJson.data.faqs.length > 0
              ? faqJson.data.faqs[0]
              : null;
          }
        }
      }
    } catch {
      // ignore error
    }
  }

  // SSR: FAQ toggle state must be client-side
  // Create a client component for FAQ toggling
  // Get static contact banner data from data.tsx
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactBannerData = (allServicesData as any)[fallbackKey]?.contactBanner || allServicesData.personalCare.contactBanner;

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

  // SSR fallback
  if (!serviceData && fallbackData) {
    serviceData = fallbackData;
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

// FAQSection is now imported as a client component

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
          <div className="w-full md:w-auto flex justify-center mb-5 md:mb-0 md:order-2">
            <div className="relative mt-22 w-92 h-92 sm:w-80 sm:h-64 md:w-80 md:h-64 lg:w-116 lg:h-92">
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
      {faqData && faqData.faqItems && faqData.faqItems.length > 0 && <FAQSection faqData={faqData} />}
      {/* Contact Banner Section */}
      <div className="w-full bg-[#F2A307] py-10 px-2">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-4 leading-tight">
            {contactBannerData.title}
          </h2>
          <p className="text-lg lg:text-2xl text-white font-light leading-relaxed mb-4 max-w-7xl mx-auto">
            {contactBannerData.description}
          </p>
          <a href="/contact">
            <button className="bg-[#233D4D] hover:bg-[#1a2a35] text-white font-semibold px-12 py-6 rounded-full text-2xl transition-colors duration-300 flex items-center gap-2 mx-auto">
              {contactBannerData.buttonText}
              <span className="text-xl">→</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}