"use client";

import React, { useEffect, useState } from "react";
import {
  Service1,
  Service2,
  Service3,
  Service4,
  Service5,
  Service7,
} from "../icons/page";

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

// static meta (icons + routes) remain local
const META_SERVICES: MetaService[] = [
  {
    title: "Personal Care",
    desc: "Find your professional personal care provider for daily assistance, hygiene, mobility, and compassionate support.",
    Icon: Service1,
    route: "/care-service",
  },
  {
    title: "Home Maker Service",
    desc: "Home maker service providers can assist by doing what the client can no longer do, or they can aid the individual...",
    Icon: Service2,
    route: "/home-maker",
  },
  {
    title: "Specialized Care",
    desc: "Specialized care provides specialized support for individuals with dementia or Alzheimer's, ensuring safety...",
    Icon: Service3,
    route: "/",
  },
  {
    title: "Sitter Services",
    desc: "Sitter services provide reliable support and supervision for your loved ones when you can't be there...",
    Icon: Service4,
    route: "/sitter",
  },
  {
    title: "Companion Care",
    desc: "Companion care is a very useful form of long-term home care, focused on providing the elderly with emotio...",
    Icon: Service5,
    route: "/companion-care",
  },
  {
    title: "Transportation",
    desc: "Transportation service is a critical support for older adults to access community services and visit family...",
    Icon: Service5,
    route: "/transportation",
  },
  {
    title: "Veteran's Home Care Services",
    desc: "CareWorks can assist Houston Veterans every step of the way with the application process. Initially, ...",
    Icon: Service7,
    route: "/veterans",
  },
];

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

  // build display list: prefer API text but keep local icons/routes
  const displayList = (() => {
    // map META_SERVICES by title for quick lookup
    const metaByTitle = new Map(META_SERVICES.map((m) => [m.title.toLowerCase(), m]));

    // for each meta, find matching API item by careType or serviceName
    const result = META_SERVICES.map((meta) => {
      const found =
        apiServices.find(
          (s) =>
            (s.careType && s.careType.toLowerCase() === meta.title.toLowerCase()) ||
            (s.serviceName && s.serviceName.toLowerCase() === meta.title.toLowerCase())
        ) ?? null;

      return {
        id: found?.id ?? `meta-${meta.title}`,
        title: found?.serviceName ?? meta.title,
        desc: found?.serviceDescription ?? meta.desc,
        Icon: meta.Icon,
        route: meta.route,
      };
    });

    // append any API services that do not match existing meta (use default icon)
    const extras = apiServices
      .filter(
        (s) =>
          !metaByTitle.has((s.careType ?? "").toLowerCase()) &&
          !metaByTitle.has((s.serviceName ?? "").toLowerCase())
      )
      .map((s) => ({
        id: s.id,
        title: s.serviceName,
        desc: s.serviceDescription ?? "",
        Icon: Service5,
        route: "/",
      }));

    return [...result, ...extras];
  })();

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
              // Check if this is the last card and it's alone in the last row
              const isLast = idx === displayList.length - 1;
              const isVeterans = service.title === "Veteran's Home Care Services";
              const shouldCenter =
                isLast &&
                isVeterans &&
                displayList.length === META_SERVICES.length &&
                META_SERVICES.length % 3 !== 0 &&
                idx % 3 === 0;

              const IconComp = service.Icon;

              return (
                <div
                  key={service.id}
                  className={`rounded-2xl p-8 flex flex-col h-full transition-colors duration-200 bg-[#0000000A] text-[#233D4D] hover:bg-[#233D4D] hover:text-white hover:shadow-lg group ${
                    shouldCenter ? "col-span-full justify-self-center w-full max-w-md" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-[#233D4D1A] group-hover:bg-[#2F3C51] transition-colors duration-200`}
                  >
                    <IconComp
                      width={24}
                      height={24}
                      className="text-[#233D4D] group-hover:text-[#F2E9CE] transition-colors duration-200"
                    />
                  </div>

                  <h3
                    className={`font-semibold text-2xl mb-4 font-urbanist text-[#233D4D] group-hover:text-[#F2A307] transition-colors duration-200`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-lg font-urbanist mb-8 text-[#233D4D] group-hover:text-white transition-colors duration-200`}
                  >
                    {service.desc}
                  </p>

                  <button
                    onClick={() => (window.location.href = service.route)}
                    className={`mt-auto flex items-center gap-2 font-semibold text-lg cursor-pointer transition text-[#233D4D] hover:text-[#F2A307] group-hover:text-[#F2A307]`}
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
