"use client";
import { useState } from "react";
import Image from "next/image";

const faqs = [
	{
		question: "How do I book a caregiver through the platform?",
		answer:
			"You can book a caregiver by selecting your preferred service type (e.g., elderly care, post-surgery support), choosing a time slot, and confirming the booking. Our platform allows you to view caregiver profiles, ratings, and availability before making a decision.",
	},
	{
		question: "Can I schedule recurring visits instead of one-time care?",
		answer: "",
	},
	{
		question: "What happens if I need to cancel or reschedule a booking?",
		answer: "",
	},
	{
		question: "Are caregivers background-checked and certified?",
		answer: "",
	},
	{
		question: "How is payment handled for care services?",
		answer: "",
	},
];

export default function FAQPage() {
	const [openIdx, setOpenIdx] = useState(0);

	return (
		<div className="min-h-screen bg-white flex flex-col mt-15 items-center">
			{/* Top FAQ Banner Section */}
			<div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-2 gap-8 items-center mb-16 px-4">
				<div className="order-2 md:order-1">
					<h4 className="text-[var(--yellow)] font-semibold mb-2 text-2xl sm:text-3xl">
						FAQ&apos;s
					</h4>
					<h1 className="text-[var(--navy)] font-bold text-3xl sm:text-5xl mb-4 sm:mb-6">
						Frequently Asked <br/> Questions
					</h1>
					<p className="text-gray-500 text-base sm:text-xl mb-4">
						Your privacy is very important to us. Accordingly, we have
						developed this Policy in order for you to understand how we
						collect, use, communicate and disclose and make use of personal
						information. The following outlines our privacy policy.
					</p>
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
					<h4 className="text-[var(--yellow)] font-semibold mb-2 text-xl sm:text-2xl">
						General FAQ&apos;s
					</h4>
					<h2 className="text-[var(--navy)] font-bold text-2xl sm:text-4xl mb-4 sm:mb-6">
						What You Need To Know
					</h2>
				</div>
				<div className="flex flex-col gap-4">
					{faqs.map((faq, idx) => (
						<div
							key={faq.question}
							className="bg-[#F7F7F3] rounded-xl px-4 sm:px-6 py-4 sm:py-5 shadow-sm cursor-pointer transition"
							onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
						>
							<div className="flex items-center justify-between">
								<span className="font-semibold text-[#233D4D] text-base sm:text-xl">
									{faq.question}
								</span>
								<span className="text-xl sm:text-2xl text-[#233D4D]">
									{openIdx === idx ? "−" : "+"}
								</span>
							</div>
							{openIdx === idx && faq.answer && (
								<p className="text-gray-600 text-sm sm:text-md mt-3">
									{faq.answer}
								</p>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Banner Section */}
			<div className="w-full bg-[#F7F0D3] py-8 px-0 mt-8 flex items-center justify-center">
				<div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4">
					<div className="flex-1 md:pl-8 order-2 md:order-1">
						<h2 className="text-[var(--navy)] font-bold text-2xl sm:text-4xl mb-4 sm:mb-6 leading-tight">
							Compassionate Care, Just A Call Away
						</h2>
						<p className="text-[var(--navy)] text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed">
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
							className="w-[200px] h-[120px] sm:w-[320px] sm:h-[200px] md:w-[467px] md:h-[282px] object-contain rounded-2xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}