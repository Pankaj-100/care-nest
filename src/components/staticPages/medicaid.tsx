import React from "react";
import Image from "next/image";
import Link from "next/link";
import LongTermCare from "./longterm-care";
import {Medicaid1, Medicaid2, Medicaid3, Medicaid4, Medicaid5, Medicaid6,Medicaid7, Medicaid8, Medicaid9, Medicaid10, Medicaid12, Medicaid13, Medicaid14, NetworkIcon, LocationIcon1, PhoneIcon2, NetworkIcon2, PhoneIcon3, MessageIcon3 } from "../icons/page";
import StepsCare from "./steps-care";

export default function MedicaidCASProgram() {
  return (
    <div className="flex flex-col min-h-screen items-center mt-10 relative">
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-8 px-4">
        <div className="text-[#F2A307] font-semibold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4">What You Need To Know</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#233D4D] leading-tight">
          Medicaid CAS Program In Texas
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row rounded-3xl p-4 sm:p-8 md:p-12 z-10 relative items-center md:items-start">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#233D4D] mb-4 sm:mb-6 leading-tight">
            What Is Medicaid CAS (Community Attendant Service) Program?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            The Medicaid Community Attendant Services (CAS) program is a vital healthcare initiative designed to provide personal care services to Medicaid recipients. This program is specifically tailored to assist low-income individuals and families who require help with daily living activities due to age, disability, or chronic illness.
          </p>
          <Link href="/contact" className="w-full md:w-auto">
            <button className="bg-[#F2A307] cursor-pointer text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center sm:justify-center gap-2 hover:bg-[#e6950a] transition w-auto md:w-auto">
              Contact Us <span className="ml-2">&#8594;</span>
            </button>
          </Link>
          {/* Mobile Image: show only on mobile */}
          <div className="flex md:hidden w-full justify-center mt-6">
            <Image
              src="/medicaid/caregiver-patient.png"
              alt="Medicaid CAS Program - Caregiver with Patient"
              width={400}
              height={300}
              className="w-3/4 sm:w-2/3 max-w-md object-contain"
            />
          </div>
        </div>

        {/* Right Image: show only on md+ */}
        <div className="hidden md:flex w-full md:w-1/2 justify-end mb-6 md:mb-0">
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
      <div className="w-full bg-[#F7F7F3] mt-20 relative z-10">
        {/* Mobile Layout */}
        <div className="flex flex-col items-center px-4 py-10 gap-8 md:hidden lg:hidden relative z-10">
          {/* Orange blob image and heading */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full flex justify-center mb-4">
              <Image
                src="/medicaid/middle-design.png"
                alt="Who Is Eligible For CAS"
                width={320}
                height={220}
                className="object-contain w-64"
              />
            </div>
          </div>
          {/* Cards */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-1">Residency</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                The applicant must be a resident of the state where they are applying for CAS services. For instance, in Texas, the individual must be a resident of Texas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-1">Medicaid Eligibility</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                The individual must be eligible for Medicaid, which generally means they fall within the low-income bracket as determined by state and federal guidelines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-1">Need For Assistance</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                The individual must require assistance with at least one activity of daily living (ADL) such as bathing, dressing, grooming, eating, or mobility.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-1">Age And Disability</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                While the program primarily serves elderly individuals and those with disabilities, specific age requirements may vary by state. In general, adults with disabilities and seniors are the primary recipients.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-1">Assessment</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                A professional assessment must determine that the individual requires attendant services to perform daily living activities safely and effectively. This assessment is usually conducted by a healthcare professional or caseworker.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#233D4D] mb-1">Functional Limitations</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                The applicant must have a functional limitation that necessitates the need for personal care services. This could be due to a chronic illness, physical disability, or cognitive impairment.
              </p>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden w-full px-4 py-10 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* First Row - Centered Image */}
            <div className="flex justify-center mb-10">
              <Image
                src="/medicaid/middle-design.png"
                alt="Who Is Eligible For CAS"
                width={400}
                height={280}
                className="object-contain"
              />
            </div>

            {/* 3x2 Grid - 3 Rows, 2 Columns */}
            <div className="grid grid-cols-2 gap-8">
              {/* Row 1 */}
              <div>
                <h3 className="text-xl font-semibold text-[#233D4D] mb-2">Residency</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  The applicant must be a resident of the state where they are applying for CAS services. For instance, in Texas, the individual must be a resident of Texas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#233D4D] mb-2">Medicaid Eligibility</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  The individual must be eligible for Medicaid, which generally means they fall within the low-income bracket as determined by state and federal guidelines.
                </p>
              </div>

              {/* Row 2 */}
              <div>
                <h3 className="text-xl font-semibold text-[#233D4D] mb-2">Need For Assistance</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  The individual must require assistance with at least one activity of daily living (ADL) such as bathing, dressing, grooming, eating, or mobility.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#233D4D] mb-2">Age And Disability</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  While the program primarily serves elderly individuals and those with disabilities, specific age requirements may vary by state. In general, adults with disabilities and seniors are the primary recipients.
                </p>
              </div>

              {/* Row 3 */}
              <div>
                <h3 className="text-xl font-semibold text-[#233D4D] mb-2">Assessment</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  A professional assessment must determine that the individual requires attendant services to perform daily living activities safely and effectively. This assessment is usually conducted by a healthcare professional or caseworker.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#233D4D] mb-2">Functional Limitations</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  The applicant must have a functional limitation that necessitates the need for personal care services. This could be due to a chronic illness, physical disability, or cognitive impairment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block w-full max-w-[1600px] h-[1080px] mx-auto relative">
          {/* Top Left - Medicaid Eligibility */}
          <div className="absolute p-6" style={{ width: '340px', height: '175px', top: '241px', left: '108px' }}>
            <h3 className="text-2xl font-semibold text-[#233D4D] mb-3">Medicaid Eligibility</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              The individual must be eligible for Medicaid, which generally means they fall within the low-income bracket as determined by state and federal guidelines.
            </p>
          </div>
          {/* Top Right - Residency */}
          <div className="absolute p-6" style={{ width: '340px', height: '175px', top: '81px', left: '580px' }}>
            <h3 className="text-2xl font-semibold text-[#233D4D] mb-3">Residency</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              The applicant must be a resident of the state where they are applying for CAS services. For instance, in Texas, the individual must be a resident of Texas.
            </p>
          </div>
          {/* Bottom Left - Age And Disability */}
          <div className="absolute p-6" style={{ width: '340px', height: '227px', top: '569px', left: '108px' }}>
            <h3 className="text-2xl font-semibold text-[#233D4D] mb-3">Age And Disability</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              While the program primarily serves elderly individuals and those with disabilities, specific age requirements may vary by state. In general, adults with disabilities and seniors are the primary recipients.
            </p>
          </div>
          {/* Bottom Right - Need For Assistance */}
          <div className="absolute p-6" style={{ width: '340px', height: '175px', top: '241px', left: '1100px' }}>
            <h3 className="text-2xl font-semibold text-[#233D4D] mb-3">Need For Assistance</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              The individual must require assistance with at least one activity of daily living (ADL) such as bathing, dressing, grooming, eating, or mobility.
            </p>
          </div>
          {/* Center Orange Section */}
          <div className="absolute z-10" style={{ width: '451px', height: '311px', top: '364px', left: '534px' }}>
            <Image
              src="/medicaid/middle-design.png"
              alt="Who Is Eligible For CAS"
              width={451}
              height={311}
              className="object-contain w-full h-full"
            />
          </div>
          {/* Functional Limitations */}
          <div className="absolute p-6" style={{ width: '340px', height: '201px', top: '756px', left: '600px' }}>
            <h3 className="text-2xl font-semibold text-[#233D4D] mb-3">Functional Limitations</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              The applicant must have a functional limitation that necessitates the need for personal care services. This could be due to a chronic illness, physical disability, or cognitive impairment.
            </p>
          </div>
          {/* Assessment */}
          <div className="absolute p-6" style={{ width: '340px', height: '253px', top: '569px', left: '1100px' }}>
            <h3 className="text-2xl font-semibold text-[#233D4D] mb-8">Assessment</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              A professional assessment must determine that the individual requires attendant services to perform daily living activities safely and effectively. This assessment is usually conducted by a healthcare professional or caseworker.
            </p>
          </div>
        </div>
      </div>
      {/* Wave Background */}
      <div className="w-full relative">
        <Image
          src="/medicaid/wave-design.png"
          alt="Wave Background"
          width={1620}
          height={600}
          className="hidden lg:block w-full h-auto object-cover"
          style={{ zIndex: 1 }}
        />
        
        {/* Mobile Steps Image */}
        <div className="md:hidden w-full bg-[#233D4D] py-6 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-0 text-center text-white">Steps To Determine Eligibility</h2>
          <div className="flex justify-center">
            <Image
              src="/medicaid/steps.png"
              alt="Steps to Determine Eligibility"
              width={400}
              height={600}
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>

        {/* Tablet Steps Image */}
        <div className="hidden md:block lg:hidden w-full bg-[#F7F7F3] py-1 px-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#233D4D]">Steps To Determine Eligibility</h2>
          <div className="flex justify-center">
            <Image
              src="/medicaid/steps4.png"
              alt="Steps to Determine Eligibility"
              width={800}
              height={700}
              className="w-full max-w-4xl h-auto object-contain"
            />
          </div>
        </div>
        
        {/* Steps to Determine Eligibility Section - Overlaid on Wave (Desktop Only) */}
        <div className="hidden lg:flex absolute inset-0 flex-col items-center justify-center text-white z-10 px-4">
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
          
          <div className="max-w-6xl w-full relative" style={{ marginTop: '-47px' }}>
            
            {/* Step 1 */}
            <div className="flex items-center justify-between mt-8 mb-16">
              <div className="w-2/5 text-right pr-9">
                <h3 className="text-[#F2A307] text-2xl font-semibold mb-2">Verify Medicaid Eligibility</h3>
                <p className="text-white text-lg text-right">Confirm that you meet Medicaid income and <br/> resource limits. You can check this through your <br/> state's Medicaid office or website.</p>
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
                <h3 className="text-[#F2A307] text-2xl font-semibold mb-2">Contact Medicaid Office</h3>
                <p className="text-white text-lg text-left">Reach out to your state's Medicaid <br/> office to inquire about CAS and <br/> initiate the application process.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between mb-16">
              <div className="w-2/5 text-right pr-8">
                <h3 className="text-[#F2A307] text-2xl font-semibold mb-2">Schedule An Assessment</h3>
                <p className="text-white text-lg text-right">Arrange for a professional assessment to <br/> evaluate your need for attendant services.</p>
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
                <h3 className="text-[#F2A307] text-2xl font-semibold mb-2">Submit Required Documentation</h3>
                <p className="text-white text-lg text-left">Provide necessary documentation, <br/> including proof of income, residency, and <br/> medical records if required.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-center justify-between">
              <div className="w-2/5 text-right pr-8">
                <h3 className="text-[#F2A307] text-2xl font-semibold mb-2">Approval And Services</h3>
                <p className="text-white text-lg text-right">Once approved, you will receive a <br/> personalized care plan and be matched <br/> with a caregiver to start receiving services.</p>
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
        <div className="max-w-6xl mx-auto">
          <h2 className="hidden md:block text-3xl sm:text-4xl md:text-5xl font-semibold text-[#233D4D] text-center mb-4">
            How To Apply For CAS (Community Attendant Service) Program
          </h2>
          <p className="hidden md:block text-gray-600 text-center mb-8 sm:mb-12 md:mb-16 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Applying for the Community Attendant Services (CAS) program involves several steps to ensure you meet the eligibility criteria and receive the appropriate level of care. Here&apos;s a step-by-step guide to help you through the process.
          </p>

          {/* Mobile Layout */}
          <div className="md:hidden max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-[#233D4D] text-center leading-snug">
              How To Apply For CAS (Community Attendant Service) Program
            </h2>
            <p className="text-sm text-gray-600 text-center mt-3 mb-6 leading-relaxed">
              Applying for the Community Attendant Services (CAS) program involves several steps to ensure you meet the eligibility criteria and receive the appropriate level of care. Here&apos;s a step-by-step guide to help you through the process.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid6 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Verify Medicaid Eligibility</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                      Ensure you are eligible for Medicaid by checking your income and resource limits as per state and federal guidelines.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                      Contact your state's Medicaid office or visit their website for eligibility information.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                      Take the Medicaid Eligibility Test.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid7 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Gather Necessary Documentation</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid8 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Initiate The Process</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid9 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Schedule An Assessment</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid10 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Submit Application</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid12 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Processing Time</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid13 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Personalized Plan</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid14 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Service Initiation</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid6 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Verify Medicaid Eligibility</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                      Ensure you are eligible for Medicaid by checking your income and resource limits as per state and federal guidelines.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                      Contact your state's Medicaid office or visit their website for eligibility information.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#F2A307] rounded-full mt-2 flex-shrink-0"></span>
                      Take the Medicaid Eligibility Test.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid7 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Gather Necessary Documentation</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid8 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Initiate The Process</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid9 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Schedule An Assessment</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid10 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Submit Application</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid12 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Processing Time</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid13 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Personalized Plan</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E9EEF2] flex items-center justify-center flex-shrink-0">
                  <Medicaid14 />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Service Initiation</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
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

          <div className="hidden lg:block">
            <StepsCare />
          </div>
        </div>
      </div>

      {/* Texas Medicaid Office Banner */}
      <div className="w-full bg-[#233D4D] py-8 md:py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Content */}
          <div className="flex-1 text-white text-center lg:text-left">
            <p className="text-[#F2A307] font-semibold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 text-left">Texas Medicaid Office</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 leading-tight">
              Dedicated Helpline For Seniors Seeking Care And Support Programs
            </h2>
            
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  <NetworkIcon/>
                </div>
                <a
                  href="https://www.yourtexasbenefits.com/learn/home"
                  target="_blank"
                  className="text-sm sm:text-base md:text-lg hover:underline focus:underline break-all"
                  aria-label="Visit Your Texas Benefits website"
                  rel="noopener noreferrer"
                >
                  Https://Www.Yourtexasbenefits.Com/Learn/Home
                </a>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  <LocationIcon1/>
                </div>
                <a
                  href="https://www.hhs.texas.gov/services/aging/long-term-care/aging-disability-resource-centers"
                  target="_blank"
                  className="text-sm sm:text-base md:text-lg hover:underline focus:underline text-left lg:text-left"
                  aria-label="Find Local Aging & Disability Resource Center"
                  rel="noopener noreferrer"
                >
                  Find Local Aging & Disability Resource Center
                </a>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <a href="tel:2-1-1">
                <button className="bg-[#F2A307] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light text-base sm:text-lg flex items-center gap-2 hover:bg-[#e6950a] transition">
                  <PhoneIcon2/> Call 2-1-1
                </button>
              </a>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex-shrink-0">
            <Image
              src="/medicaid/helpline-support.png"
              alt="Helpline Support Representative"
              width={400}
              height={300}
              className="object-contain "
            />
          </div>
        </div>
      </div>

      {/* Long Term Care Section */}
      {/* Mobile Layout */}
      <div className="md:hidden lg:hidden w-full bg-white py-8 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-[#233D4D] text-center leading-snug mb-6">
            Why Choose CareWorks As Your Long-Term Care Provider Under The CAS Program?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Expertise In The CAS Program</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Specialized Knowledge</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      At CareWorks, we have extensive experience with the Medicaid Community Attendant Services (CAS) program. We understand the specific requirements and processes involved, ensuring a smooth and hassle-free experience for our clients.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Comprehensive Support</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We guide you through the entire process, from eligibility verification to care plan development, ensuring you get the maximum benefits from the CAS program.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Personalized And Compassionate Care</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Individualized Care Plans</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our care plans are tailored to meet your unique needs and preferences, ensuring you receive the right level of support and care.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Compassionate Caregivers</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our team is dedicated to providing compassionate and empathetic care, treating each client with the utmost respect and dignity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Flexible And Reliable Services</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">24/7 Availability</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We offer flexible scheduling options and are available around the clock, including weekends and holidays, to provide the care you need when you need it.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Reliable Support</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our caregivers are punctual, dependable, and committed to providing consistent, high-quality care.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Comprehensive Range Of Services</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Diverse Offerings</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We provide a wide range of services under the CAS program, including personal care, medication reminders, meal preparation, light housekeeping, and companionship.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Integrated Care</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our holistic approach ensures all your care needs are met, enhancing your overall well-being and quality of life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Highly Trained And Experienced Caregivers</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Professional Staff</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our caregivers are highly trained, experienced, and continuously educated on the latest care techniques and best practices.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Background Checks</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      All our staff undergo thorough background checks and screening to ensure your safety and peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                6
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Transparent And Affordable Pricing</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">No Hidden Fees</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We believe in transparent pricing with no hidden fees or unexpected charges. Our services are designed to be affordable, providing excellent value for your money.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Medicaid Accepted</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We accept Medicaid, making our services accessible and affordable for eligible individuals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                7
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Strong Community Presence</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Local Expertise</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      As a locally operated agency, we have a deep understanding of the community and its needs. We are committed to enhancing the quality of life for our clients within our community.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Quick Response</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Being local allows us to respond quickly to your needs and provide timely support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                8
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#233D4D]">Positive Client Feedback</h3>
                <div className="mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Satisfied Clients</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Our clients and their families consistently give us high ratings and positive feedback, reflecting our commitment to excellence and client satisfaction.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#233D4D]">Trusted Provider</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      CareWorks is a trusted name in the home care industry, known for our reliability, compassion, and high standards of care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden w-full bg-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#233D4D] text-center leading-snug mb-8">
            Why Choose CareWorks As Your Long-Term Care Provider Under The CAS Program?
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Expertise In The CAS Program</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Specialized Knowledge</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        At CareWorks, we have extensive experience with the Medicaid Community Attendant Services (CAS) program. We understand the specific requirements and processes involved, ensuring a smooth and hassle-free experience for our clients.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Comprehensive Support</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We guide you through the entire process, from eligibility verification to care plan development, ensuring you get the maximum benefits from the CAS program.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Flexible And Reliable Services</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">24/7 Availability</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We offer flexible scheduling options and are available around the clock, including weekends and holidays, to provide the care you need when you need it.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Reliable Support</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Our caregivers are punctual, dependable, and committed to providing consistent, high-quality care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Highly Trained And Experienced Caregivers</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Professional Staff</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Our caregivers are highly trained, experienced, and continuously educated on the latest care techniques and best practices.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Background Checks</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        All our staff undergo thorough background checks and screening to ensure your safety and peace of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  7
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Strong Community Presence</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Local Expertise</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        As a locally operated agency, we have a deep understanding of the community and its needs. We are committed to enhancing the quality of life for our clients within our community.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Quick Response</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Being local allows us to respond quickly to your needs and provide timely support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Personalized And Compassionate Care</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Individualized Care Plans</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Our care plans are tailored to meet your unique needs and preferences, ensuring you receive the right level of support and care.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Compassionate Caregivers</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Our team is dedicated to providing compassionate and empathetic care, treating each client with the utmost respect and dignity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Comprehensive Range Of Services</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Diverse Offerings</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We provide a wide range of services under the CAS program, including personal care, medication reminders, meal preparation, light housekeeping, and companionship.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Integrated Care</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Our holistic approach ensures all your care needs are met, enhancing your overall well-being and quality of life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  6
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Transparent And Affordable Pricing</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">No Hidden Fees</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We believe in transparent pricing with no hidden fees or unexpected charges. Our services are designed to be affordable, providing excellent value for your money.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Medicaid Accepted</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We accept Medicaid, making our services accessible and affordable for eligible individuals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#233D4D] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  8
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#233D4D]">Positive Client Feedback</h3>
                  <div className="mt-2 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Satisfied Clients</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Our clients and their families consistently give us high ratings and positive feedback, reflecting our commitment to excellence and client satisfaction.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#233D4D]">Trusted Provider</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        CareWorks is a trusted name in the home care industry, known for our reliability, compassion, and high standards of care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <LongTermCare />
      </div>

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