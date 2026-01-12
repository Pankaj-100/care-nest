import Image from "next/image";
import ContactButton from "./ContactButton";

type WhoPayload = {
  id: string;
  mainHeading: string;
  mainDescription: string;
  images?: string[];
  caregiverNetworkHeading?: string;
  caregiverNetworkDescription?: string;
  caregiverNetworkImage?: string;
  promiseHeading?: string;
  promiseDescription?: string;
};

async function fetchWhoWeAre(): Promise<WhoPayload | null> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/who-we-are`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.whoWeAre ?? null;
  } catch {
    return null;
  }
}

export default async function WhoWeAre() {
  const who = await fetchWhoWeAre();
  if (!who) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span className="text-red-600">No content available</span>
      </div>
    );
  }

  const images = who.images ?? [];
  const heroImage =
    who.caregiverNetworkImage ?? images[0] ?? "/whoWeAre/image5.png";

  return (
    <div className="w-full flex flex-col items-center bg-white">
      {/* Top Section */}
      <div className="w-full max-w-7xl mt-10 flex flex-col lg:flex-row items-start md:items-center justify-between mb-16 px-4 sm:px-6">
        <h1 className="text-3xl mt-5 sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#233D4D] mb-6 lg:mb-0 lg:mr-12 whitespace-pre-line w-full text-center lg:text-left lg:w-1/2">
          {who.mainHeading || "Who We Are"}
        </h1>
        <div
          className="text-[#233D4D] text-lg sm:text-lg md:text-lg max-w-2xl leading-relaxed lg:w-1/2"
          dangerouslySetInnerHTML={{ __html: who.mainDescription ?? "" }}
        />
      </div>

      {/* Images Section with specific sizes for each slot */}
      <div className="w-full mt-6 max-w-6xl grid grid-cols-2 gap-4 sm:gap-6 md:gap-6 px-6 md:mb-0 lg:flex lg:flex-row lg:justify-center lg:items-stretch lg:gap-8">
        {(images.length > 0 ? images.slice(0, 4) : [
          "/whoWeAre/image1.png",
          "/whoWeAre/image2.png",
          "/whoWeAre/image3.png",
          "/whoWeAre/image4.png"
        ]).map((src, idx) => {
          // Staggered sizes for visual interest
          let width = 260, height = 300, extraClass = "";
          if (idx === 0) { width = 250; height = 300; extraClass = "lg:h-[300px] h-[220px] md:h-[450px] lg:w-[250px]"; }
          if (idx === 1) { width = 260; height = 400; extraClass = "lg:h-[400px] lg:w-[260px]"; }
          if (idx === 2) { width = 260; height = 400; extraClass = "lg:h-[400px] lg:w-[260px] -translate-y-20 md:-translate-y-42 lg:translate-y-0"; }
          if (idx === 3) { width = 260; height = 400; extraClass = "lg:h-[300px] lg:w-[250px]"; }
          return (
            <Image
              key={idx}
              src={src}
              alt={`who-we-are-${idx}`}
              width={width}
              height={height}
              className={`w-full object-cover shadow-md ${extraClass}`}
            />
          );
        })}
      </div>

      {/* Our Caregiver Network Section */}
      <section className="w-full bg-[#F7F7F3] lg:py-18 md:py-5 flex flex-col items-center mt-0 md:mt-0 lg:mt-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#233D4D] mb-6 text-center">
          {who.caregiverNetworkHeading ?? "Our Caregiver Network"}
        </h2>
        <div
          className="text-[#233D4D] text-lg sm:text-lg md:text-xl md:w-3/3 max-w-6xl text-center lg:mb-5 md:mb-2 mb-5 leading-snug px-4"
          dangerouslySetInnerHTML={{ __html: who.caregiverNetworkDescription ?? "" }}
        />
        
      </section>

      <div className="w-full flex justify-center px-0 sm:px-0">
        <Image
          src={heroImage}
          alt="Caregiver with senior outdoors"
          width={1600}
          height={700}
          className="w-full max-w-9xl h-[370px] sm:h-[360px] md:h-[450px] lg:h-[580px] object-cover shadow object-[65%_50%] lg:object-center"
          priority
        />
      </div>

      {/* Our Promise Section */}
      <section className="w-full max-w-7xl flex flex-col md:flex-row items-start justify-between mt-8 lg:mt-15 mb-19 px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-8 md:mb-0 md:mr-12 whitespace-pre-line w-full text-center md:text-left md:w-1/3">
          {who.promiseHeading ?? "Our Promise"}
        </h2>
        <div
          className="text-[#233D4D] text-lg max-w-3xl leading-relaxed md:w-2/3"
          dangerouslySetInnerHTML={{ __html: who.promiseDescription ?? "" }}
        />
      </section>

      {/* Contact Banner Section */}
      <section className="w-full relative flex flex-col md:flex-row justify-center md:justify-start items-center py-10 sm:py-16 md:py-20 mt-4">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/whoWeAre/image6.png"
            alt="Contact Banner"
            fill
            className="object-cover object-[65%_50%]  md:object-center"
            priority
          />
          <div
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #000000B2 0%, #00000099 100%, #00000000 100%)",
            }}
          />
        </div>

        <div className="absolute z-20 pointer-events-none left-4 right-4 top-4 bottom-4 sm:left-10 sm:right-10 sm:top-10 sm:bottom-10">
          <Image
            src="/whoWeAre/rectangle-design.png"
            alt="Rectangle Design"
            fill
            className="object-fill"
          />
        </div>

        <div className="relative z-30 w-full max-w-2xl px-4 sm:px-8 md:px-10 lg:items-start py-8 sm:py-12 flex flex-col items-center md:items-start md:ml-10 lg:ml-27">
          <h2 className="text-[#F2A307] text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-8 text-center md:text-start lg:text-start">
            Contact Us Today For More Information
          </h2>
          <p className="text-white text-md sm:text-md md:text-md  lg:text-lg mb-4 sm:mb-8 text-center md:text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
            Make The Call That Can Improve Your Life Or That Of A Loved One.
            Contact Us Today To Inquire About Our Houston Based Home Care Services
            And To Find A Solution That Fits Your Budgetary Needs And Your
            Lifestyle.
          </p>
            <ContactButton />
        </div>
      </section>
    </div>
  );
}