import React from "react";
import Image from "next/image";

interface LocationData {
  city: string;
  state: string;
  heroTitle: string;
  heroDescription: string;
  whyChooseTitle: string;
  whyChooseDescription: string;
  whyChooseHighlights: string[];
  servicesIntro: string;
  services: {
    title: string;
    items: string[];
    image: string;
  }[];
  careDesignedTitle: string;
  careDesignedDescription: string;
  proudlyServingTitle: string;
  proudlyServingDescription: string;
  steadyPartnerTitle: string;
  steadyPartnerDescription: string;
}

interface LocationTemplateProps {
  data: LocationData;
}

export default function LocationTemplate({ data }: LocationTemplateProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white py-26 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-5xl md:text-5xl font-bold text-[#2C3E50] mb-6 leading-tight">
              {data.heroTitle}
            </h1>
          </div>
          <div>
            <p className="text-gray-700 leading-relaxed text-justify text-xl">
              {data.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="/locationHero.png"
          alt={`Home care services in ${data.city}`}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#F5F5DC] py-26 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-center text-[#2C3E50] mb-8">
            {data.whyChooseTitle}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-justify text-xl">
              {data.whyChooseDescription}
            </p>
            {data.whyChooseHighlights.map((highlight, index) => (
              <p key={index} className="text-gray-700 leading-relaxed text-justify text-xl">
                {highlight}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-[#2C3E50] mb-4">
            Our Senior Home Care
          </h2>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-[#2C3E50] mb-8">
            Services In {data.city}
          </h3>
          <p className="text-center text-gray-700 text-xl mb-12 max-w-5xl mx-auto">
            {data.servicesIntro}
          </p>

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
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Designed & Community Section */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left side - Image */}
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/location/location5.png"
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
    </div>
  );
}
