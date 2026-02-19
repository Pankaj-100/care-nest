import react from 'react';
import Image from 'next/image';
import { Medicaid1, Medicaid2, Medicaid3, Medicaid4, Medicaid5, Medicaid6, Medicaid7, Medicaid8, Medicaid9, Medicaid10, Medicaid12, Medicaid13, Medicaid14 } from '../icons/page';

export default function StepsCare() {
    return (
        <>
              
              {/* How To Apply Section */}
              <div className="w-full bg-white py-20 px-4">
                <div className="max-w-6xl mx-auto relative">
                  <h2 className="hidden md:block text-3xl sm:text-4xl md:text-5xl font-semibold text-[#233D4D] text-center mb-4">
                    How To Apply For CAS (Community Attendant Service) Program
                  </h2>
                  <p className="hidden md:block text-gray-600 text-center mb-8 sm:mb-12 md:mb-16 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                    Applying for the Community Attendant Services (CAS) program involves several steps to ensure you meet the eligibility criteria and receive the appropriate level of care. Here&apos;s a step-by-step guide to help you through the process.
                  </p>
                  
                  
                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                  
                  {/*first Semi-circle Background */}
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
                      top: '1617px',
                      left: '-357px'
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
                  
                  {/* Application Steps - Positioned Container */}
                  <div className="relative" style={{ height: '2300px' }}>
                    
                    {/* Step 1: Verify Medicaid Eligibility */}
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
                          <Medicaid6 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Verify Medicaid Eligibility</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start text-lg gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full text-lg mt-2 flex-shrink-0"></span>
                            Ensure you are eligible for Medicaid by checking your income and resource limits as per state and federal guidelines.
                          </li>
                          <li className="flex items-start text-lg gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full text-lg mt-2 flex-shrink-0"></span>
                            Contact your state's Medicaid office or visit their website for eligibility information.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Take the Medicaid Eligibility Test.
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 2: Gather Necessary Documentation */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '269px',
                        top: '299px',
                        left: '491px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid7 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Gather Necessary Documentation</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Proof of income (pay stubs, tax returns, benefit statements)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Proof of residency (utility bills, lease agreements)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Identification documents (driver&apos;s license, social security card)
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Medical records or documentation of disability if applicable
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 3: Initiate The Process */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '287px',
                        top: '580px',
                        left: '0px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid8 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Initiate The Process</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Reach out to the Texas Medicaid office to express your interest in the CAS program.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            You can contact them via phone, online portal, or visit a local Medicaid office.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Call the INTAKE number: <a href="tel:713-692-1635" className="font-semibold text-[#233D4D] hover:underline focus:underline">713-692-1635</a>
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 4: Schedule An Assessment */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '253px',
                        top: '879px',
                        left: '491px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid9 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Schedule An Assessment</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            A healthcare professional or caseworker will conduct an in-home assessment to evaluate your need for attendant services.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            This assessment will determine the level and type of care required.
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 5: Submit Application */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '321px',
                        top: '1144px',
                        left: '0px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid10 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Submit Application</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Fill out the CAS program application form provided by the Medicaid office.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            PROVIDE the name of our agency CAREWORKS as your provider.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Ensure all required documentation is attached.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Submit the application through the appropriate channel (mail, online, or in-person).
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 6: Processing Time */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '253px',
                        top: '1477px',
                        left: '491px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid12 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Processing Time</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            The Medicaid office will review your application and assessment results.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            This process may take several weeks, during which they might request additional information or clarification.
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 7: Personalized Plan */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '253px',
                        top: '1742px',
                        left: '0px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid13 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Personalized Plan</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            If approved, a personalized care plan will be developed by CAREWORKS based on the assessment.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            This plan outlines the specific services you will receive and the frequency of those services.
                          </li>
                        </ul>
                      </div>
                    </div>
        
                    {/* Step 8: Service Initiation */}
                    <div 
                      className="absolute flex flex-col md:flex-row items-start"
                      style={{
                        width: '550px',
                        height: '227px',
                        top: '2007px',
                        left: '491px',
                        gap: '20px'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#233D4D1A] rounded-full flex items-center justify-center">
                          <Medicaid14 />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Service Initiation</h3>
                        <ul className="space-y-2 text-lg text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Once the care plan is finalized, you will be referred to CAREWORKS.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                            Services will begin as per the schedule outlined in your care plan.
                          </li>
                        </ul>
                      </div>
                    </div>
        
                  </div>
                  </div>
                </div>
            </div>
        </>
    );
}