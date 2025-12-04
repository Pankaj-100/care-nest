import React from "react";
import Image from "next/image";
import LongTermCare from "./longterm-care";
import {Medicaid1, Medicaid2, Medicaid3, Medicaid4, Medicaid5, Medicaid6,Medicaid7, Medicaid8, Medicaid9, Medicaid10, Medicaid12, Medicaid13, Medicaid14, NetworkIcon, LocationIcon1, PhoneIcon2, NetworkIcon2, PhoneIcon3, MessageIcon3 } from "../icons/page";

export default function MedicaidCASProgram() {
  return (
    <div className="flex flex-col min-h-screen items-center mt-10 relative">
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-11">
        <div className="text-[#F2A307] font-semibold text-4xl mb-4">What You Need To Know</div>
        <h1 className="text-5xl md:text-5xl font-semibold text-[#233D4D] leading-tight">
          Medicaid CAS Program In Texas
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row rounded-3xl p-8 md:p-12 z-10 relative">
        {/* Left Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#233D4D] mb-6 leading-tight">
            What Is Medicaid CAS (Community Attendant Service) Program?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The Medicaid Community Attendant Services (CAS) program is a vital healthcare initiative designed to provide personal care services to Medicaid recipients. This program is specifically tailored to assist low-income individuals and families who require help with daily living activities due to age, disability, or chronic illness.
          </p>
          <button className="bg-[#F2A307] text-white text-lg font-semibold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-[#e6950a] transition">
            Learn More <span className="ml-2">&#8594;</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-end">
          <Image
            src="/medicaid/caregiver-patient.png"
            alt="Medicaid CAS Program - Caregiver with Patient"
            width={400}
            height={300}
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>

      {/* Eligibility Section */}
      <div className="w-full max-w-[1600px] h-[1080px] mt-20 relative bg-[#F7F7F3] mx-auto z-10">
        
        {/* Top Left - Medicaid Eligibility */}
        <div 
          className="absolute p-6"
          style={{
            width: '340px',
            height: '175px',
            top: '241px',
            left: '108px'
          }}
        >
          <h3 className="text-xl font-semibold text-[#233D4D] mb-3">Medicaid Eligibility</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            The individual must be eligible for Medicaid, which generally means they fall within the low-income bracket as determined by state and federal guidelines.
          </p>
        </div>

        {/* Top Right - Residency */}
        <div 
          className="absolute p-6"
          style={{
            width: '340px',
            height: '175px',
            top: '81px',
            left: '580px'
          }}
        >
          <h3 className="text-xl font-semibold text-[#233D4D] mb-3">Residency</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            The applicant must be a resident of the state where they are applying for CAS services. For instance, in Texas, the individual must be a resident of Texas.
          </p>
        </div>

        {/* Bottom Left - Age And Disability */}
        <div 
          className="absolute p-6"
          style={{
            width: '340px',
            height: '227px',
            top: '569px',
            left: '108px'
          }}
        >
          <h3 className="text-xl font-semibold text-[#233D4D] mb-3">Age And Disability</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            While the program primarily serves elderly individuals and those with disabilities, specific age requirements may vary by state. In general, adults with disabilities and seniors are the primary recipients.
          </p>
        </div>

        {/* Bottom Right - Need For Assistance */}
        <div 
          className="absolute p-6"
          style={{
            width: '340px',
            height: '175px',
            top: '241px',
            left: '1100px'
          }}
        >
          <h3 className="text-xl font-semibold text-[#233D4D] mb-3">Need For Assistance</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            The individual must require assistance with at least one activity of daily living (ADL) such as bathing, dressing, grooming, eating, or mobility.
          </p>
        </div>

        {/* Center Orange Section */}
        <div 
          className="absolute z-10"
          style={{
            width: '451px',
            height: '311px',
            top: '364px',
            left: '534px'
          }}
        >
          <Image
            src="/medicaid/middle-design.png"
            alt="Who Is Eligible For CAS"
            width={451}
            height={311}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Functional Limitations */}
        <div 
          className="absolute p-6"
          style={{
            width: '340px',
            height: '201px',
            top: '756px',
            left: '600px'
          }}
        >
          <h3 className="text-xl font-semibold text-[#233D4D] mb-3">Functional Limitations</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            The applicant must have a functional limitation that necessitates the need for personal care services. This could be due to a chronic illness, physical disability, or cognitive impairment.
          </p>
        </div>

        {/* Assessment */}
        <div 
          className="absolute p-6"
          style={{
            width: '340px',
            height: '253px',
            top: '569px',
            left: '1100px'
          }}
        >
          <h3 className="text-xl font-semibold text-[#233D4D] mb-8">Assessment</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            A professional assessment must determine that the individual requires attendant services to perform daily living activities safely and effectively. This assessment is usually conducted by a healthcare professional or caseworkor.
          </p>
        </div>
      </div>

      {/* Wave Background */}
      <div className="w-full relative">
        <Image
          src="/medicaid/wave-design.png"
          alt="Wave Background"
          width={1620}
          height={600}
          className="w-full h-auto object-cover"
          style={{ zIndex: 1 }}
        />
        
        {/* Steps to Determine Eligibility Section - Overlaid on Wave */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <h2 className="text-5xl font-bold mb-20 text-center">Steps To Determine Eligibility</h2>
          
          {/* Central Dotted Line */}
          <div 
            className="absolute border-l-2 border-dashed border-[#F2A307] opacity-100"
            style={{
              width: '0px',
              height: '730px',
              top: '500px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '2px',
            }}
          ></div>
          
          <div className="max-w-6xl w-full relative " style={{ marginTop: '-47px' }}>
            
            {/* Step 1 */}
            <div className="flex items-center justify-between mt-8 mb-16">
              <div className="w-2/5 text-right pr-8">
                <h3 className="text-[#F2A307] text-xl font-semibold mb-2">Verify Medicaid Eligibility</h3>
                <p className="text-white text-lg leading-relaxed">Confirm that you meet Medicaid income and <br/> resource limits. You can check this through your <br/> state&apos;s Medicaid office or website.</p>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#F2A307] text-[#233D4D] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              </div>
              
              <div className="w-2/5 flex justify-start pl-2">
                <Image src="/medicaid/image-1.png" alt="Medicaid Document" width={130} height={130} className="object-contain" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between mb-16">
              <div className="w-2/5 flex justify-end pr-9">
                <Image src="/medicaid/image-2.png" alt="Person Icon" width={130} height={130} className="object-contain" />
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#F2A307] text-[#233D4D] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              </div>
              
              <div className="w-2/5 text-left pl-8">
                <h3 className="text-[#F2A307] text-xl font-semibold mb-2">Contact Medicaid Office</h3>
                <p className="text-white text-lg">Reach out to your state&apos;s Medicaid <br/> office to inquire about CAS and <br/> initiate the application process.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between mb-16">
              <div className="w-2/5 text-right pr-8">
                <h3 className="text-[#F2A307] text-xl font-semibold mb-2">Schedule An Assessment</h3>
                <p className="text-white text-lg">Arrange for a professional assessment to <br/> evaluate your need for attendant services.</p>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#F2A307] text-[#233D4D] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              </div>
              
              <div className="w-2/5 flex justify-start pl-8">
                <Image src="/medicaid/image-3.png" alt="Assessment Building" width={130} height={130} className="object-contain" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center justify-between mb-16">
              <div className="w-2/5 flex justify-end pr-8">
                <Image src="/medicaid/image-4.png" alt="Documentation" width={130} height={130} className="object-contain" />
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#F2A307] text-[#233D4D] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">4</div>
              </div>
              
              <div className="w-2/5 text-left pl-8">
                <h3 className="text-[#F2A307] text-xl font-semibold mb-2">Submit Required Documentation</h3>
                <p className="text-white text-lg">Provide necessary documentation, <br/> including proof of income, residency, and <br/> medical records if required.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-center justify-between">
              <div className="w-2/5 text-right pr-8">
                <h3 className="text-[#F2A307] text-xl font-semibold mb-2">Approval And Services</h3>
                <p className="text-white text-lg">Once approved, you will receive a <br/> personalized care plan and be matched <br/> with a caregiver to start receiving services.</p>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#F2A307] text-[#233D4D] w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">5</div>
              </div>
              
              <div className="w-2/5 flex justify-start pl-8">
                <Image src="/medicaid/image-5.png" alt="Approval Checkmark" width={120} height={120} className="object-contain" />
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="w-full bg-[#F7F0D3] py-20 px-4 -mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-semibold text-[#233D4D] mt-8 text-center mb-16">
            Benefits Of The CAS Program
          </h2>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Personalized Care */}
            <div className="bg-[#0000000A] rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#233D4D1A] rounded-full flex items-center justify-center mb-6">
               <Medicaid1 />
              </div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Personalized Care</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Individualized assistance with daily living activities such as bathing, dressing, and grooming.
              </p>
            </div>

            {/* Enhanced Independence */}
            <div className="bg-[#0000000A] rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#233D4D1A] rounded-full flex items-center justify-center mb-6">
                <Medicaid2 />
              </div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Enhanced Independence</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Helps recipients maintain independence by providing necessary support at home.
              </p>
            </div>

            {/* Cost-Effective */}
            <div className="bg-[#0000000A] rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#233D4D1A] rounded-full flex items-center justify-center mb-6">
                <Medicaid3 />
              </div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Cost-Effective</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Covered by Medicaid, making it an affordable option for eligible individuals.
              </p>
            </div>
          </div>

          {/* Bottom Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pb-8">
            {/* Comprehensive Support */}
            <div className="bg-[#0000000A] rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#233D4D1A] rounded-full flex items-center justify-center mb-6">
                <Medicaid4 />
              </div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Comprehensive Support</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Includes services like meal preparation, medication reminders, and light housekeeping.
              </p>
            </div>

            {/* Professional Caregivers */}
            <div className="bg-[#0000000A] rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-[#233D4D1A] rounded-full flex items-center justify-center mb-6">
                <Medicaid5 />
              </div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-4">Professional Caregivers</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Services provided by trained and compassionate attendants.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How To Apply Section */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-5xl font-semibold text-[#233D4D] text-center mb-4">
            How To Apply For CAS (Community Attendant Service) Program
          </h2>
          <p className="text-gray-600 text-center mb-16 text-xl max-w-3xl mx-auto">
            Applying for the Community Attendant Services (CAS) program involves several steps to ensure you meet the eligibility criteria and receive the appropriate level of care. Here&apos;s a step-by-step guide to help you through the process.
          </p>
          
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
                    Contact your state&apos;s Medicaid office or visit their website for eligibility information.
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
                    Call the INTAKE number: <span className="font-semibold">713-692-1635</span>
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

      {/* Texas Medicaid Office Banner */}
      <div className="w-full bg-[#233D4D] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <p className="text-[#F2A307] font-semibold text-2xl mb-4">Texas Medicaid Office</p>
            <h2 className="text-4xl lg:text-3xl font-semibold mb-6 leading-tight">
              Dedicated Helpline For Seniors Seeking Care And Support Programs
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <NetworkIcon/>
                </div>
                <a
                  href="https://www.yourtexasbenefits.com/learn/home"
                  target="_blank"
                  className="text-lg hover:underline focus:underline"
                  aria-label="Visit Your Texas Benefits website"
                  rel="noopener noreferrer"
                >
                  Https://Www.Yourtexasbenefits.Com/Learn/Home
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <LocationIcon1/>
                </div>
                <a
                  href="https://hhs.texas.gov/services/aging/long-term-care/aging-disability-resource-center"
                  target="_blank"
                  className="text-lg hover:underline focus:underline"
                  aria-label="Find Local Aging & Disability Resource Center"
                  rel="noopener noreferrer"
                >
                  Find Local Aging & Disability Resource Center
                </a>
              </div>
            </div>
            
            <button className="bg-[#F2A307] text-white px-8 py-4 rounded-full font-light text-lg flex items-center gap-2 hover:bg-[#e6950a] transition">
              <PhoneIcon2/> Call 2-1-1
            </button>
          </div>
          
          {/* Right Image */}
          <div className="flex-shrink-0">
            <Image
              src="/medicaid/helpline-support.png"
              alt="Helpline Support Representative"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Long Term Care Section */}
      <LongTermCare />

      {/* We're Here For You Banner */}
      <div className="w-full bg-[#F5F1E8] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 lg:pr-8">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#233D4D] mb-6 leading-tight">
              We&apos;re Here For You
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Need Help Applying For Medicaid Or Understanding Your Options? Care Works Is Here To Provide Compassionate, Personalized Long-Term Care Through The CAS Program. Reach Out Today To Discover How We Can Support Your Independence And Comfort At Home.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#233D4D] rounded-full flex items-center justify-center">
                  <PhoneIcon3 />
                </div>
                <a
                  href="tel:8322372273"
                  className="text-lg text-[#233D4D] font-medium hover:underline focus:underline"
                  aria-label="Call 832-237-2273"
                  rel="noopener noreferrer"
                >
                  832-237-2273
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#233D4D] rounded-full flex items-center justify-center">
                  <MessageIcon3/>
                </div>
                <a
                  href="mailto:Careworks77479@Gmail.Com"
                  className="text-lg text-[#233D4D] font-medium hover:underline focus:underline"
                  aria-label="Email Careworks77479@Gmail.Com"
                  rel="noopener noreferrer"
                >
                  Careworks77479@Gmail.Com
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#233D4D] rounded-full flex items-center justify-center">
                  <NetworkIcon2 />
                </div>
                <a
                  href="https://www.careworks.biz"
                  target="_blank"
                  className="text-lg text-[#233D4D] font-medium hover:underline focus:underline"
                  aria-label="Visit Careworks website"
                  rel="noopener noreferrer"
                >
                  Https://Www.Careworks.Biz
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex-shrink-0 relative">
            <Image
              src="/medicaid/customer-support.png"
              alt="Customer Support Representative"
              width={500}
              height={400}
              className="object-contain"
            />
            
            
          </div>
        </div>
      </div>

    </div>
  );
}