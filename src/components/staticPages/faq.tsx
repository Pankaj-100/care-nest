"use client";
import { useState, useEffect } from "react";
import Image from "next/image";


interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
interface FaqData {
  sectionTitle: string;
  faqItems: FaqItem[];
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(-1);
const [faq, setFaq] = useState<FaqData | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

// Fetch FAQ data from API
useEffect(() => {
  let mounted = true;
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/FaqPage`;
  setLoading(true);
  fetch(endpoint)
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((json) => {
      if (!mounted) return;
      const faqs = json?.data?.faqs?.[0];
      if (!faqs) {
        setError("No FAQ data found");
      } else {
        setFaq({
          sectionTitle: faqs.sectionTitle || "What You Need To Know",
          faqItems: faqs.faqItems || [],
        });
      }
    })
		.catch(() => {
			if (!mounted) return;
			setError("Failed to load FAQ");
		})
    .finally(() => {
      if (!mounted) return;
      setLoading(false);
    });
  return () => {
    mounted = false;
  };
}, [API_BASE]);

return (
	<div className="min-h-screen bg-white flex flex-col mt-15 items-center">
		{/* Top FAQ Banner Section */}
		<div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-2 gap-8 items-center mb-16 px-4">
			<div className="order-2 md:order-1">
				<h4 className="text-[var(--yellow)] font-semibold mb-2 text-2xl sm:text-3xl text-center md:text-left">
					FAQ&apos;s
				</h4>
			<h1 className="text-[var(--navy)] font-semibold text-xl sm:text-3xl mb-4 sm:mb-6 text-center md:text-left">
					Find quick answers to the most common questions about CareWorks, our services and how the platform works. If you need more help, our team is always here to support you.  
				</h1>
				{/* <p className="text-gray-500 text-base sm:text-lg mb-4 text-justify"> 
					Your privacy is very important to us. Accordingly, we have
					developed this Policy in order for you to understand how 
					we collect, use, communicate and disclose and make use 
					of personal information. The following outlines our privacy policy.
				</p>*/}
			</div>
			<div className="flex justify-center order-1 md:order-2 mb-4 md:mb-0">
				<Image
					src="/faq1.png"
					alt="FAQ Banner"
					width={240}
					height={240}
					className="max-w-[240px] w-full h-auto sm:max-w-[340px] sm:w-full"
				/>
			</div>
		</div>
		{/* General FAQ Section */}
		<div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-2 gap-8 items-start px-4">
			<div>
				<h4 className="text-[var(--yellow)] font-semibold mb-2 text-xl sm:text-3xl text-center md:text-left">
					General FAQ&apos;s
				</h4>
			<h2 className="text-[var(--navy)] font-semibold text-2xl sm:text-5xl mb-4 sm:mb-6 text-center md:text-left max-w-xl md:max-w-none mx-auto md:mx-0">
				{faq?.sectionTitle || "What You Need To Know"}
		</h2>
			</div>
			<div className="flex flex-col gap-4">
				{loading && <div className="text-[var(--navy)]">Loading FAQs...</div>}
				{error && <div className="text-red-400">{error}</div>}
				{!loading && !error && Array.isArray(faq?.faqItems) && faq.faqItems.length > 0 && faq.faqItems.map((faq, idx) => (
					<div
						key={faq.id}
						className="bg-[#F7F7F3] rounded-xl px-4 sm:px-6 py-4 sm:py-5 shadow-sm cursor-pointer transition"
						onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
					>
					<div className="flex items-center justify-between gap-4">
						<span className="font-medium text-[#233D4D] text-lg sm:text-xl text-left flex-1">
							{faq.question}
						</span>
						<span className="text-xl sm:text-lg text-[#233D4D] flex-shrink-0">
								{openIdx === idx ? "−" : "+"}
							</span>
						</div>
						{openIdx === idx && faq.answer && (
							<p className="text-gray-600 text-lg sm:text-md mt-3">
								{faq.answer}
							</p>
						)}
					</div>
				))}
				{!loading && !error && (!faq?.faqItems || !Array.isArray(faq.faqItems) || faq.faqItems.length === 0) && (
					<div className="text-[var(--navy)]">No FAQs available.</div>
				)}
			</div>
		</div>

			{/* Banner Section */}
			<div className="w-full bg-[#F7F0D3] py-8 px-0 mt-8 flex items-center justify-center">
				<div className="flex flex-col-reverse md:flex-row justify-between w-full max-w-7xl px-4">
					<div className="flex-1 md:pl-8 order-2 md:order-1 md:text-left">
						<h2 className="text-[var(--navy)] font-semibold text-2xl sm:text-5xl mb-4 sm:mb-6 leading-tight">
							Compassionate Care, Just A Call Away
						</h2>
						<p className="text-[var(--navy)] text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
							Looking For A Caregiver Who Treats Your Loved One With Dignity And Kindness? Our Team Is Ready To Offer Personalized Care And Peace Of Mind. Contact Us To Learn More
						</p>
						<a
							href="/contact"
							className="inline-flex items-center gap-3 bg-[#F2A307] text-[var(--navy)] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl hover:bg-[#e89c04] transition"
						>
							Contact Us
							<span className="ml-2">&#8594;</span>
						</a>
					</div>
					<div className="flex-1 flex justify-center md:justify-end md:pr-8 order-1 md:order-2 mb-6 md:mb-0">
						<Image
							src="/faq2.png"
							alt="Caregiver Banner"
							width={260}
							height={160}
							className="w-[200px] mt-5 h-[120px] sm:w-[320px] sm:h-[200px] md:w-[467px] md:h-[282px] object-contain rounded-2xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}