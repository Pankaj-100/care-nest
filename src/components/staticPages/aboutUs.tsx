"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type KeyPerson = {
  id: string;
  personName: string;
  personImage?: string;
  personTitle?: string;
  personDescription?: string;
};

type ValueItem = {
  id: string;
  valueName: string;
  valueDescription?: string;
};

type TeamMember = {
  id: string;
  name: string;
  role?: string;
  image?: string;
};

type AboutPayload = {
  id: string;
  mainHeading?: string;
  mainDescription?: string;
  keyPeople?: KeyPerson[];
  valuesHeading?: string;
  ourValues?: ValueItem[];
  missionDescription?: string;
  meetTeamHeading?: string;
  meetTeamDescription?: string;
  teamMembers?: TeamMember[];
};

export default function AboutUs() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const [about, setAbout] = useState<AboutPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/about-us`;

    setLoading(true);
    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        const payload = json?.data?.aboutUs ?? null;
        if (!payload) {
          setError("Content not found");
        } else {
          setAbout(payload);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch about-us:", err);
        setError("Failed to load content");
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

  // Keep UI unchanged when loading / error: render minimal notices (doesn't modify inline CSS)
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span>Loading content...</span>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
        <span className="text-red-600">{error ?? "No content available"}</span>
      </div>
    );
  }

  const people = about.keyPeople ?? [];
  const values = about.ourValues ?? [];
  const team = about.teamMembers ?? [];

  return (
    <div className="bg-[#ffffff] min-h-screen w-full relative font-urbanist">
      {/* About Us Content - above everything */}
      <div className="w-full max-w-7xl mx-auto pt-20 pb-8 px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-[#F2A307] font-semibold mb-4 text-2xl">About Us</h4>
            <h1 className="text-[var(--navy)] font-bold text-5xl mb-8 leading-tight">
              {about.mainHeading ?? (
                <>
                  Holistic Home Care For
                  <br />
                  Every Individual
                </>
              )}
            </h1>
          </div>
          <div>
            <div
              className="text-[#6B7280] text-xl mb-10leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  about.mainDescription ??
                  "CareWorks delivers trusted, high-quality home care across Houston and surrounding communities, tailored to each individual's needs. We take a holistic, personalized approach to ensure compassionate support for every patient. Our team of skilled caregivers, nurses, and aides brings warmth and professionalism to every home. We empower seniors and those recovering to live independently with dignity and comfort. With CareWorks, families gain peace of mind knowing their loved ones are in caring hands.",
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Wave SVG */}
      <Image
        src="/aboutUs/design.png"
        alt="Wave Top"
        width={1920}
        height={2000}
        className="absolute top-90 left-0 w-full h-[2000px] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Main Content inside wave */}
      <div className="relative z-10 max-w-6xl mx-auto pt-32 pb-24 px-6">
        {/* Owner / Key People Section */}
        {people.length > 0 ? (
          people.map((p, idx) => (
            <div
              key={p.id}
              className={`grid md:grid-cols-2 mt-10 gap-12 items-center mb-20 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div>
                <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">{p.personTitle ?? "Key Person"}</h4>
                <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">{p.personName}</h2>
                <p
                  className="text-gray-700 text-xl mb-4"
                  dangerouslySetInnerHTML={{ __html: p.personDescription ?? "" }}
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src={p.personImage ?? "/aboutUs/ruby.png"}
                  alt={p.personName}
                  width={350}
                  height={350}
                  className="rounded-xl w-[350px] h-[350px] object-cover"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))
        ) : (
          // keep original static owner/founder/cofounder blocks when API has no keyPeople
          <>
            {/* Owner Section */}
            <div className="grid md:grid-cols-2 mt-10 gap-12 items-center mb-20">
              <div>
                <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">Owner Of CareWorks</h4>
                <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">Ruby Agrawal</h2>
                <p className="text-gray-700 text-xl mb-4">
                  The dedicated owner of CareWorks in Houston, brings over 25 years of management expertise and a deep-rooted connection to the community she&apos;s called home for three decades.
                </p>
                <p className="text-gray-700 text-xl mb-4">
                  As a mother of four and a hands-on caregiver to her own mother during years of complex health challenges, Ruby understands firsthand the emotional and physical demands of caregiving.
                </p>
                <p className="text-gray-700 text-xl">
                  Her experience fuels her passion for supporting seniors and honoring the vital role of both family and professional caregivers. With strong leadership and a heart for service, Ruby ensures CareWorks delivers compassionate, reliable care to every home it touches.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/aboutUs/ruby.png"
                  alt="Ruby Agrawal"
                  width={350}
                  height={350}
                  className="rounded-xl w-[350px] h-[350px] object-cover"
                />
              </div>
            </div>

            {/* Founder Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="md:order-1 flex justify-center">
                <Image
                  src="/aboutUs/founder.png"
                  alt="William Hardy"
                  width={350}
                  height={350}
                  className="rounded-xl w-[350px] h-[350px ] object-cover"
                />
              </div>
              <div className="md:order-2">
                <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">Founder Of CareWorks</h4>
                <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">William Hardy</h2>
                <p className="text-gray-700 text-xl mb-4">
                  He is former president of CareWorks, is a respected leader in Houston&apos;s eldercare community. He&apos;s a passionate advocate for senior dignity and well-being, with decades of service and outreach. William has actively contributed to organizations like the Alzheimer&apos;s Association, Elder Service Providers Network, and United Way.
                </p>
                <p className="text-gray-700 text-xl mb-4">
                  His commitment spans from advisory roles to leading Bible study groups and volunteering at Kinsmen Lutheran Church. Before launching CareWorks, he built a 17-year career in management at the Houston Chronicle.
                </p>
                <p className="text-gray-700 text-xl">
                  He&apos;s also served as a consultant and mentor, guiding companies and young professionals alike. William&apos;s legacy blends business acumen with heartfelt community service. His vision continues to inspire compassionate care across the Houston area.
                </p>
              </div>
            </div>

            {/* Co-Founder Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">Co-Founder Of CareWorks</h4>
                <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">Holly Hardy</h2>
                <p className="text-gray-700 text-xl mb-4">
                  He is vice president of CareWorks in Houston, Texas is a person that has a special place in her heart for those dealing with a loved one that is suffering from Dementia. Her dad was diagnosed with Dementia in 2000. She is
                </p>
                <p className="text-gray-700 text-xl mb-4">
                  Holly keeps active in the community by serving in the following areas: Volunteer Women Helping Women (2006), Active in Elder Service Providers Network (2006 to present), Active member and volunteer Kinsmen Lutheran Church (1996 to present).
                </p>
                <p className="text-gray-700 text-xl">
                  Upon graduating from the University of Houston in 1983, Holly enjoyed 14 years of successful and meaningful career working in the Accounting Department for Curtin Matheson Scientific, Inc., a distributor of scientific and medical products.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/aboutUs/founder.png"
                  alt="Holly Hardy"
                  width={350}
                  height={350}
                  className="rounded-xl w-[350px] h-[350px] object-cover"
                />
              </div>
            </div>
          </>
        )}

        {/* Our Values Section - OUTSIDE the wave */}
        <div className="w-full bg-[#ffffff] ">
          <div className="max-w-5xl mx-auto py-5 px-1">
            <h2 className="text-center text-[var(--navy)] font-bold text-5xl mb-16">{about.valuesHeading ?? "Our Values"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {values.length > 0 ? (
                values.map((v) => (
                  <div key={v.id}>
                    <Image
                      src={`/aboutUs/${v.valueName.toLowerCase().replace(/\s+/g, "")}.png`}
                      alt={v.valueName}
                      width={80}
                      height={80}
                      className="mx-auto mb-6 w-20 h-20"
                    />
                    <h3 className="text-[var(--navy)] font-bold text-3xl mb-4">{v.valueName}</h3>
                    <p
                      className="text-[#2B384C] text-xl"
                      dangerouslySetInnerHTML={{ __html: v.valueDescription ?? "" }}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <Image src="/aboutUs/compassion.png" alt="Compassion" width={80} height={80} className="mx-auto mb-6 w-20 h-20" />
                    <h3 className="text-[var(--navy)] font-bold text-3xl mb-4">Compassion</h3>
                    <p className="text-[#2B384C] text-xl">
                      We lead with empathy, treating every individual with kindness and respect.
                    </p>
                  </div>
                  <div>
                    <Image src="/aboutUs/reliability.png" alt="Reliability" width={80} height={80} className="mx-auto mb-6 w-20 h-20" />
                    <h3 className="text-[var(--navy)] font-bold text-3xl mb-4">Reliability</h3>
                    <p className="text-[#2B384C] text-xl">
                      Families trust us because we consistently deliver dependable, high-quality care.
                    </p>
                  </div>
                  <div>
                    <Image src="/aboutUs/reliability.png" alt=" Home" width={80} height={80} className="mx-auto mb-6 w-20 h-20" />
                    <h3 className="text-[var(--navy)] font-bold text-3xl mb-4">Dignity at Home</h3>
                    <p className="text-[#2B384C] text-xl">
                      We make it easier for clients to remain independent and comfortable in the place they love most, their home
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Our Mission Banner */}
        <div className="w-full bg-[#233D4D] py-10 px-4 flex items-center justify-center">
          <div className="flex flex-row items-center justify-between w-full max-w-6xl">
            <div className="flex-1 pl-2 flex flex-col justify-center">
              <h2 className="text-[#F2A307] font-bold text-[60px] leading-none mb-1">Our Mission</h2>
              <div
                className="text-white text-2xl ml-9 font-light leading-relaxed max-w-xl"
                dangerouslySetInnerHTML={{ __html: about.missionDescription ?? "" }}
              />
            </div>
            <div className="flex-1 flex justify-end pr-8">
              <Image
                src="/aboutUs/wheelchair.png"
                alt="Our Mission Banner"
                width={500}
                height={282}
                className="w-[500px] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Meet Our Team Members Section */}
        <div className="w-full bg-[#fff] py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
              <div>
                <h2 className="text-[var(--navy)] font-bold text-7xl mb-4">{about.meetTeamHeading ?? "Meet Our Team Members"}</h2>
              </div>
              <div>
                <div
                  className="text-[#6B7280] text-xl mb-6"
                  dangerouslySetInnerHTML={{ __html: about.meetTeamDescription ?? "" }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {team.length > 0 ? (
                  team.map((member) => (
                    <div key={member.id} className="relative rounded-lg overflow-hidden flex flex-col items-center justify-end pb-6 group w-full h-[320px]">
                      <Image
                        src={member.image ?? "/aboutUs/member1.png"}
                        alt={member.name}
                        width={320}
                        height={320}
                        className="w-full h-[320px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#233D4D] via-[#233D4D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4">
                        <div className="text-white text-xl font-bold">{member.name}</div>
                        <div className="text-white text-base">{member.role}</div>
                      </div>
                    </div>
                  ))
                ) : (
                    // fallback static members
                    (
                    [
                      { image: "/aboutUs/member1.png", name: "Jennifer", role: "Chief Officer" },
                      { image: "/aboutUs/member2.png", name: "Member 2", role: "Role 2" },
                      { image: "/aboutUs/member1.png", name: "Member 3", role: "Role 3" },
                      { image: "/aboutUs/member3.png", name: "Member 4", role: "Role 4" },
                    ] as Array<{ image: string; name: string; role: string }>
                    ).map((member, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-lg overflow-hidden flex flex-col items-center justify-end pb-6 group w-full h-[320px]"
                    >
                      <Image
                      src={member.image}
                      alt={member.name}
                      width={320}
                      height={320}
                      className="w-full h-[320px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#233D4D] via-[#233D4D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4">
                      <div className="text-white text-xl font-bold">{member.name}</div>
                      <div className="text-white text-base">{member.role}</div>
                      </div>
                    </div>
                    ))
                  )}
                  </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compassionate Care Banner */}
      <div className="w-full bg-[#F2A307] py-3 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1">
          <h2 className="text-white font-bold ml-20 text-4xl mb-4">
            Compassionate Care, Just A <br /> Call Away
          </h2>
          <p className="text-white text-xl ml-20 font-light mb-8 leading-relaxed">
            Looking For A Caregiver Who Treats Your Loved One With Dignity And Kindness? Our Team Is Ready To Offer Personalized Care And Peace Of Mind. Contact Us To Learn More
          </p>
          <a
            href="/contact"
            className="inline-flex items-center ml-20 gap-3 bg-[#233D4D] text-white px-5 py-3 rounded-full font-light text-xl hover:bg-[#1a2c3b] transition"
          >
            Contact Us
            <span className="ml-2">&#8594;</span>
          </a>
        </div>
        <div className="flex-1 flex mr-24 justify-end mt-8 md:mt-0">
          <Image
            src="/aboutUs/care-taker.png"
            alt="Compassionate Care Banner"
            width={350}
            height={350}
            className="w-[350px] py-3 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}