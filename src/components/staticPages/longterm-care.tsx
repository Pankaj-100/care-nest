import React from 'react';
import Image from 'next/image';

export default function LongTermCare() {
  return (
    <div className="flex flex-col min-h-screen items-center py-20 px-4 bg-gray-50 relative">
      {/* Header Section */}
      <div className="w-full max-w-5xl text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#233D4D] leading-tight mb-8">
          Why Choose CareWorks As Your Long-Term Care Provider Under The CAS Program?
        </h1>
      </div>

      {/* Main Container with Semi-circles and Points */}
      <div className="w-full max-w-6xl mx-auto relative">
        
        {/* First Semi-circle Background */}
        <div 
          className="absolute"
          style={{
            width: '1014px',
            height: '1014px',
            top: '204px',
            left: '656px'
          }}
        >
          <Image
            src="/medicaid/semi-circle.png"
            alt="Semi Circle Background"
            width={1014}
            height={1014}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Second Semi-circle Background */}
        <div 
          className="absolute"
          style={{
            width: '937px',
            height: '937px',
            top: '1417px',
            left: '-557px'
          }}
        >
          <Image
            src="/medicaid/semi-circle2.png"
            alt="Second Semi Circle Background"
            width={937}
            height={937}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Points Section - Positioned Container */}
        <div className="relative" style={{ height: '2700px' }}>
          
          {/* Point 1: Expertise In The CAS Program */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '287px',
              top: '0px',
              left: '0px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">1</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Expertise In The CAS Program</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 text-md bg-[#233D4D] rounded-full"></span>
                    Specialized Knowledge
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    At CareWorks, we have extensive experience with the Medicaid Community Attendant Services (CAS) program. We understand the specific requirements and processes involved, ensuring a smooth and hassle-free experience for our clients.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Comprehensive Support
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    We guide you through the entire process, from eligibility verification to care plan development, ensuring you get the maximum benefits from the CAS program.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 2: Personalized And Compassionate Care */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '269px',
              top: '399px',
              left: '491px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">2</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Personalized And Compassionate Care</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Individualized Care Plans
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Our care plans are tailored to meet your unique needs and preferences, ensuring you receive the right level of support and care.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Compassionate Caregivers
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Our team is dedicated to providing compassionate and empathetic care, treating each client with the utmost respect and dignity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 3: Flexible And Reliable Services */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '287px',
              top: '740px',
              left: '0px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">3</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Flexible And Reliable Services</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    24/7 Availability
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    We offer flexible scheduling options and are available around the clock, including weekends and holidays, to provide the care you need when you need it.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Reliable Support
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Our caregivers are punctual, dependable, and committed to providing consistent, high-quality care.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 4: Comprehensive Range Of Services */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '253px',
              top: '1079px',
              left: '491px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">4</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Comprehensive Range Of Services</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Diverse Offerings
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    We provide a wide range of services under the CAS program, including personal care, medication reminders, meal preparation, light housekeeping, and companionship.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Integrated Care
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Our holistic approach ensures all your care needs are met, enhancing your overall well-being and quality of life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 5: Highly Trained And Experienced Caregivers */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '321px',
              top: '1444px',
              left: '0px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">5</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Highly Trained And Experienced Caregivers</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Professional Staff
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Our caregivers are highly trained, experienced, and continuously educated on the latest care techniques and best practices.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Background Checks
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    All our staff undergo thorough background checks and screening to ensure your safety and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 6: Transparent And Affordable Pricing */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '253px',
              top: '1777px',
              left: '491px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">6</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Transparent And Affordable Pricing</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    No Hidden Fees
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    We believe in transparent pricing with no hidden fees or unexpected charges. Our services are designed to be affordable, providing excellent value for your money.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Medicaid Accepted
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    We accept Medicaid, making our services accessible and affordable for eligible individuals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 7: Strong Community Presence */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '253px',
              top: '2102px',
              left: '0px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">7</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Strong Community Presence</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Local Expertise
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    As a locally operated agency, we have a deep understanding of the community and its needs. We are committed to enhancing the quality of life for our clients within our community.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Quick Response
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Being local allows us to respond quickly to your needs and provide timely support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Point 8: Positive Client Feedback */}
          <div 
            className="absolute flex flex-col md:flex-row items-start"
            style={{
              width: '550px',
              height: '227px',
              top: '2407px',
              left: '491px',
              gap: '20px'
            }}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                <span className="text-[#233D4D] font-bold text-lg">8</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Positive Client Feedback</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Satisfied Clients
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    Our clients and their families consistently give us high ratings and positive feedback, reflecting our commitment to excellence and client satisfaction.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#233D4D] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#233D4D] rounded-full"></span>
                    Trusted Provider
                  </h4>
                  <p className="text-gray-600 text-lg pl-4">
                    CareWorks is a trusted name in the home care industry, known for our reliability, compassion, and high standards of care.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}