"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ServiceData {
  mainSection: {
    title: string;
    description: string[];
  };
  locationSection: {
    title: string;
    content: string[];
  };
  servicesWeProvide: {
    title: string;
    services: string[];
    descriptions: string[];
    imagePath: string;
  };
  faq: {
    subtitle: string;
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
  contactBanner: {
    title: string;
    description: string;
    buttonText: string;
  };
}

interface ServiceTemplateProps {
  serviceData: ServiceData;
}

export default function ServiceTemplate({ serviceData }: ServiceTemplateProps) {
  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Main Section */}
      <div className="w-full bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 lg:pr-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#233D4D] leading-tight mb-8">
              {serviceData.mainSection.title}
            </h1>
          </div>
          
          <div className="flex-1 space-y-6">
            {serviceData.mainSection.description.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#233D4D] mb-16">
            {serviceData.locationSection.title}
          </h2>
          
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto">
            {serviceData.locationSection.content.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Services We Provide Section */}
      <div className="w-full bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-12">
              {serviceData.servicesWeProvide.title}
            </h2>
            
            <div className="space-y-4">
              {serviceData.servicesWeProvide.services.map((service, index) => (
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
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src={serviceData.servicesWeProvide.imagePath}
                alt={`${serviceData.mainSection.title} service`}
                width={500}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-16 space-y-6">
          {serviceData.servicesWeProvide.descriptions.map((description, index) => (
            <p key={index} className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="flex-1 lg:pr-8">
            <p className="text-[#F2A307] font-semibold text-lg mb-4">
              {serviceData.faq.subtitle}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] leading-tight">
              {serviceData.faq.title}
            </h2>
          </div>
          
          <div className="flex-1 space-y-4">
            {serviceData.faq.questions.map((faq, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
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

      {/* Contact Banner Section */}
      <div className="w-full bg-[#F2A307] py-10 px-2">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#233D4D] mb-4 leading-tight">
            {serviceData.contactBanner.title}
          </h2>
          
          <p className="text-lg lg:text-2xl text-white font-light leading-relaxed mb-4 max-w-7xl mx-auto">
            Make The Call That Can Improve Your Life Or That Of A Loved One. Contact Us Today To Inquire About{' '}
            <span className="text-[#233D4D]">Our Houston Based Home Care Services</span>{' '}
            And To Find A Solution That Fits Your Budgetary Needs And Your Lifestyle.
          </p>
          
          <button className="bg-[#233D4D] hover:bg-[#1a2a35] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-300 flex items-center gap-2 mx-auto">
            {serviceData.contactBanner.buttonText}
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>

    </div>
  );
}