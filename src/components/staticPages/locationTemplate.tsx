import Image from "next/image";
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function LocationTemplate({ slug }: LocationTemplateProps) {
  const splitIntoTwoLines = (text: string) => {
    const trimmed = (text || "").trim();
    if (!trimmed) return ["", ""] as const;
    const words = trimmed.split(/\s+/);
    if (words.length <= 1) return [trimmed, ""] as const;
    const mid = Math.floor(words.length / 2);
    // Prefer splitting on the nearest word boundary to middle
    const first = words.slice(0, mid).join(" ");
    const second = words.slice(mid).join(" ");
    return [first, second] as const;
  };
  let data: LocationServiceData | null = null;
  if (API_BASE && slug) {
    try {
      const [cityPart, statePart] = slug.split("-");
      if (cityPart && statePart) {
        const city = decodeURIComponent(cityPart);
        const state = decodeURIComponent(statePart).toUpperCase();
        const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/location-services/city/${encodeURIComponent(city)}/state/${encodeURIComponent(state)}`;
        const res = await fetch(endpoint, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          const location = json?.data?.locationService as LocationServiceData | undefined;
          if (location) {
            data = location;
          }
        }
      }
    } catch {
      // ignore error
    }
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
      <section className="bg-white py-15 px-6 md:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-6 leading-tight">
              {data.heroTitle}
            </h1>
          </div>
          <div>
            <div
              className="text-gray-700 leading-relaxed text-justify text-lg prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: data.heroDescription }}
            />
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
      <section className="bg-[#F5F5DC] py-13 px-6 md:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#2C3E50] mb-8">
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
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#2C3E50] mb-4">
            {(() => {
              const [line1, line2] = splitIntoTwoLines(data.servicesIntro);
              if (!line2) return line1;
              return (
                <>
                  {line1}
                  <br />
                  {line2}
                </>
              );
            })()}
          </h2>
          {/* <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#2C3E50] mb-8"> */}
            {/* Services In {data.city} */}
          {/* </h3> */}
          {/* <p className="text-center text-gray-700 text-lg mb-4 max-w-5xl mx-auto"> */}
            {/* {data.servicesIntro} */}
          {/* </p> */}
          {data.servicesDescription && (
            <p className="text-center text-gray-700 text-lg mb-12 max-w-5xl mx-auto">
              {data.servicesDescription}
            </p>
          )}

          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            {data.services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-6 md:gap-6 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <h4 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
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
                      <h4 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
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
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-6">
                  {data.careDesignedTitle}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed text-justify">
                  {data.careDesignedDescription}
                </p>
              </div>

              {/* Proudly Serving Section */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                  {data.proudlyServingTitle}
                </h3>
                <p className="text-gray-700  text-lg leading-relaxed text-justify">
                  {data.proudlyServingDescription}
                </p>
              </div>

              {/* Steady Partner Section */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#2C3E50] mb-4">
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#233D4D] mb-4 leading-tight">
          Get In Touch With Us
        </h2>
        <p className="text-lg lg:text-2xl text-white font-light leading-relaxed mb-4 max-w-7xl mx-auto">
          Have questions about our senior home care services or want to discuss your family’s needs? Our team is here to help you every step of the way. Reach out today for personalized support and guidance.
        </p>
        <a href="/contact">
        <button className="bg-[#233D4D] hover:bg-[#1a2a35] text-white font-semibold px-10 py-5 rounded-full text-xl transition-colors duration-300 flex items-center gap-2 mx-auto">
          Contact Us
          <span className="text-xl">→</span>
        </button>
        </a>
      </div>
    </div>
  </div>
  );
}
