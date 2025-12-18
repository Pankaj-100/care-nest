"use client";

import React, { useEffect, useState } from "react";


type ApiService = {
  id: string;
  serviceName: string;
  serviceDescription?: string;
  serviceIcon?: string;
  careType?: string;
};

type MetaService = {
  title: string;
  desc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  route: string;
};



const ServiceWeProvide: React.FC = () => {
  const [apiServices, setApiServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/service-cms/homepage`;

    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json;
      })
      .then((json) => {
        if (!mounted) return;
        const list: ApiService[] = json?.data?.services ?? [];
        setApiServices(list);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch services:", err);
        setError("Failed to load services");
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

  // Map API careType values to actual route slugs
  const careTypeSlugMap: Record<string, string> = {
    "companion care": "/service/companion-care",
    "home maker service": "/service/home-maker",
    "specialized care": "/service/specialized-care",
    "personal care": "/service/personal-care",
    "sitter services": "/service/sitter-service",
    "transportation": "/service/transportation",
  };

  const buildServicePath = (careType?: string, fallbackName?: string) => {
    const key = (careType || fallbackName || "").toLowerCase().trim();
    if (key && careTypeSlugMap[key]) {
      return careTypeSlugMap[key];
    }
    // Fallback: best-effort slug from provided text
    const slug = key
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return "/service/" + slug;
  };


  // Only use API data for display list
  const displayList = apiServices;

  return (
    <div className="flex flex-col justify-center w-full min-h-screen bg-[#F7F0D3] px-4 py-12">
      <h1 className="font-semibold text-6xl mt-15 text-center mb-12 text-[#233D4D] font-urbanist">
        Services We Provide
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto place-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-8 w-full max-w-md bg-[#0000000A] animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto place-items-center">
            {displayList.map((service, idx) => {
              return (
                <div
                  key={service.id}
                  className="rounded-2xl p-8 flex flex-col h-full transition-colors duration-200 bg-[#0000000A] text-[#233D4D] hover:bg-[#233D4D] hover:text-white hover:shadow-lg group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-[#bcbdbd1a] group-hover:bg-[#F2E9CE] transition-colors duration-200"
                  >
                    {service.serviceIcon ? (
                      <img src={service.serviceIcon} alt={service.serviceName} width={24} height={24} className="object-contain" />
                    ) : null}
                  </div>

                  <h3 className="font-semibold text-xl mb-4 font-urbanist text-[#233D4D] group-hover:text-[#F2A307] transition-colors duration-200">
                    {service.serviceName}
                  </h3>

                  <p className="text-lg font-urbanist mb-8 text-[#233D4D] group-hover:text-white transition-colors duration-200">
                    {service.serviceDescription}
                  </p>

                  <button
                    onClick={() => {
                      const path = buildServicePath(service.careType, service.serviceName);
                      window.location.href = path || "/";
                    }}
                    className="mt-auto flex items-center gap-2 font-semibold text-md cursor-pointer transition text-[#233D4D] hover:text-[#F2A307] group-hover:text-[#F2A307]"
                  >
                    View More <span className="ml-1">&#8594;</span>
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceWeProvide;
