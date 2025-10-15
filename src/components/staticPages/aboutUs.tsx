"use client";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-[#ffffff] min-h-screen w-full relative font-urbanist">
      {/* About Us Content - above everything */}
      <div className="w-full max-w-7xl mx-auto pt-20 pb-8 px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-[#F2A307] font-semibold mb-4 text-2xl">About Us</h4>
            <h1 className="text-[var(--navy)] font-bold text-5xl mb-8 leading-tight">
              Holistic Home Care For
              <br />Every Individual
            </h1>
          </div>
          <div>
            <p className="text-[#6B7280] text-xl leading-relaxed">
              CareWorks delivers trusted, high-quality home care across Houston and surrounding communities, tailored to each individual&apos;s needs. We take a holistic, personalized approach to ensure compassionate support for every patient. Our team of skilled caregivers, nurses, and aides brings warmth and professionalism to every home. We empower seniors and those recovering to live independently with dignity and comfort. With CareWorks, families gain peace of mind knowing their loved ones are in caring hands.
            </p>
          </div>
        </div>
      </div>

      {/* Top Wave SVG */}
      <Image
        src="/aboutUs/design.png"
        alt="Wave Top"
        width={1920}
        height={1700}
        className="absolute top-100 left-0 w-full h-[1700px] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Main Content inside wave */}
      <div className="relative z-10 max-w-6xl mx-auto pt-32 pb-24 px-6">
        {/* Owner Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">Owner Of CareWorks</h4>
            <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">Ruby Agrawal</h2>
            <p className="text-gray-700 text-lg mb-4">
              The dedicated owner of CareWorks in Houston, brings over 25 years of management expertise and a deep-rooted connection to the community she&apos;s called home for three decades.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              As a mother of four and a hands-on caregiver to her own mother during years of complex health challenges, Ruby understands firsthand the emotional and physical demands of caregiving.
            </p>
            <p className="text-gray-700 text-lg">
              Her experience fuels her passion for supporting seniors and honoring the vital role of both family and professional caregivers. With strong leadership and a heart for service, Ruby ensures CareWorks delivers compassionate, reliable care to every home it touches.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/aboutUs/ruby.png"
              alt="Ruby Agrawal"
              width={260}
              height={260}
              className="rounded-xl w-[260px] h-[260px] object-cover"
            />
          </div>
        </div>

        {/* Founder Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="md:order-1 flex justify-center">
            <Image
              src="/aboutUs/founder.png"
              alt="William Hardy"
              width={260}
              height={260}
              className="rounded-xl w-[260px] h-[260px] object-cover"
            />
          </div>
          <div className="md:order-2">
            <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">Founder Of CareWorks</h4>
            <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">William Hardy</h2>
            <p className="text-gray-700 text-lg mb-4">
              He is former president of CareWorks, is a respected leader in Houston&apos;s eldercare community. He&apos;s a passionate advocate for senior dignity and well-being, with decades of service and outreach. William has actively contributed to organizations like the Alzheimer&apos;s Association, Elder Service Providers Network, and United Way.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              His commitment spans from advisory roles to leading Bible study groups and volunteering at Kinsmen Lutheran Church. Before launching CareWorks, he built a 17-year career in management at the Houston Chronicle.
            </p>
            <p className="text-gray-700 text-lg">
              He&apos;s also served as a consultant and mentor, guiding companies and young professionals alike. William&apos;s legacy blends business acumen with heartfelt community service. His vision continues to inspire compassionate care across the Houston area.
            </p>
          </div>
        </div>

        {/* Co-Founder Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h4 className="text-[#F2A307] font-semibold mb-2 text-3xl">Co-Founder Of CareWorks</h4>
            <h2 className="text-[var(--navy)] font-bold text-3xl mb-4">Holly Hardy</h2>
            <p className="text-gray-700 text-lg mb-4">
              He is vice president of CareWorks in Houston, Texas is a person that has a special place in her heart for those dealing with a loved one that is suffering from Dementia. Her dad was diagnosed with Dementia in 2000. She is
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Holly keeps active in the community by serving in the following areas: Volunteer Women Helping Women (2006), Active in Elder Service Providers Network (2006 to present), Active member and volunteer Kinsmen Lutheran Church (1996 to present).
            </p>
            <p className="text-gray-700 text-lg">
              Upon graduating from the University of Houston in 1983, Holly enjoyed 14 years of successful and meaningful career working in the Accounting Department for Curtin Matheson Scientific, Inc., a distributor of scientific and medical products.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/aboutUs/founder.png"
              alt="Holly Hardy"
              width={260}
              height={260}
              className="rounded-xl w-[260px] h-[260px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section - OUTSIDE the wave */}
      <div className="w-full bg-[#ffffff] ">
        <div className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-center text-[var(--navy)] font-bold text-5xl mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <Image src="/aboutUs/compassion.png" alt="Compassion" width={80} height={80} className="mx-auto mb-6 w-20 h-20" />
              <h3 className="text-[var(--navy)] font-bold text-2xl mb-4">Compassion</h3>
              <p className="text-[#2B384C] text-lg">
                We lead with empathy, treating every individual with kindness and respect.
              </p>
            </div>
            <div>
              <Image src="/aboutUs/reliability.png" alt="Reliability" width={80} height={80} className="mx-auto mb-6 w-20 h-20" />
              <h3 className="text-[var(--navy)] font-bold text-2xl mb-4">Reliability</h3>
              <p className="text-[#2B384C] text-lg">
                Families trust us because we consistently deliver dependable, high-quality care.
              </p>
            </div>
            <div>
              <Image src="/aboutUs/home.png" alt="Dignity at Home" width={80} height={80} className="mx-auto mb-6 w-20 h-20" />
              <h3 className="text-[var(--navy)] font-bold text-2xl mb-4">Dignity at Home</h3>
              <p className="text-[#2B384C] text-lg">
                We help clients maintain independence and comfort in the place they love most their home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Banner */}
      <div className="w-full bg-[#233D4D] py-5 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1">
          <div className="mb-6">
            <span className="text-6xl text-[#2B384C] opacity-30 font-bold">&quot;</span>
          </div>
          <h2 className="text-[#F2A307] font-bold text-4xl mb-8">Our Mission</h2>
          <div className="text-[#BFCAD6] text-3xl font-light leading-relaxed">
            <p>To Bring Compassionate Care To Every Doorstep,</p>
            <p>Empowering Families And Caregivers With Trust, Dignity,</p>
            <p>And Support.</p>
          </div>
        </div>
        <div className="flex-1 flex justify-end mt-12 md:mt-0">
          <Image
            src="/aboutUs/wheelchair.png"
            alt="Our Mission Banner"
            width={500}
            height={282}
            className="w-[500px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Meet Our Team Members Section */}
      <div className="w-full bg-[#fff] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 className="text-[var(--navy)] font-bold text-5xl mb-8">Meet Our Team Members</h2>
            </div>
            <div>
              <p className="text-[#6B7280] text-xl mb-6">
                Our entire staff is passionate about providing care for seniors and have empathy for the struggles that many aging individuals encounter. In addition to being experienced and highly trained, our caregivers(Home Health Aides) are dependable, attentive, trustworthy and compassionate.
              </p>
              <p className="text-[#6B7280] text-xl">
                Our caregivers are our employees and positions are not contracted. We perform federal background checks, and e-verification of our employees for work eligibility. We require all new hires to have previous experience with no infractions and we provide constant support and supervision to our caregivers with ongoing opportunities for continued training. All our employees have to pass company written exam and go through a detailed orientation and training to qualify for the job.
              </p>
            </div>
          </div>
          {/* Team Members Carousel */}
          <div className="flex items-center gap-4 justify-center">
            {/* Left Arrow */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#233D4D] text-[#233D4D] bg-white hover:bg-[#F2A307] transition">
              <span className="text-2xl">&#8592;</span>
            </button>
            {/* Team Member Cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { image: "/aboutUs/member1.png", name: "Jennifer", role: "Chief Officer" },
                { image: "/aboutUs/member2.png", name: "Member 2", role: "Role 2" },
                { image: "/aboutUs/member1.png", name: "Member 3", role: "Role 3" },
                { image: "/aboutUs/member3.png", name: "Member 4", role: "Role 4" },
              ].map((member, idx) => (
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
                  {/* Overlay shown only on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233D4D] via-[#233D4D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4">
                    <div className="text-white text-xl font-bold">{member.name}</div>
                    <div className="text-white text-base">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Arrow */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#233D4D] text-[#233D4D] bg-white hover:bg-[#F2A307] transition">
              <span className="text-2xl">&#8594;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compassionate Care Banner */}
      <div className="w-full bg-[#F2A307] py-3 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1">
          <h2 className="text-white font-bold text-4xl mb-8">
            Compassionate Care, Just A Call Away
          </h2>
          <p className="text-white text-xl  font-light mb-8 leading-relaxed">
            Looking For A Caregiver Who Treats Your Loved One With Dignity And Kindness? Our Team Is Ready To Offer Personalized Care And Peace Of Mind. Contact Us To Learn More
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#233D4D] text-white px-5 py-3 rounded-full font-light text-xl hover:bg-[#1a2c3b] transition"
          >
            Contact Us
            <span className="ml-2">&#8594;</span>
          </a>
        </div>
        <div className="flex-1 flex justify-end mt-8 md:mt-0">
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