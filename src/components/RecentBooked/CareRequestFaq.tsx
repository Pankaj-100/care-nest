"use client";
import React, { useEffect, useState } from "react";

type FaqItem = {
	id: string;
	question: string;
	answer: string;
};

interface CareRequestFaqProps {
	open: boolean;
	onClose: () => void;
}

export default function CareRequestFaq({ open, onClose }: CareRequestFaqProps) {
	const [faqLoading, setFaqLoading] = useState(false);
	const [faqError, setFaqError] = useState<string | null>(null);
	const [faqTitle, setFaqTitle] = useState("Care Request");
	const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
	const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

	const API_BASE =
		process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

	useEffect(() => {
		if (!open || !API_BASE) return;
		const controller = new AbortController();
		const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/Care%20Request`;

		setFaqLoading(true);
		setFaqError(null);

		fetch(endpoint, { signal: controller.signal })
			.then(async (res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((json) => {
				const payload = json?.data;
				const faqBlock = Array.isArray(payload?.faqs) ? payload.faqs[0] : payload;
				const title = faqBlock?.sectionTitle || "Care Request";
				const items = Array.isArray(faqBlock?.faqItems) ? faqBlock.faqItems : [];
				setFaqTitle(title);
				setFaqItems(items);
			})
			.catch((err) => {
				if (err?.name === "AbortError") return;
				console.error("Failed to fetch Care Request FAQs:", err);
				setFaqError("Failed to load FAQs. Please try again.");
			})
			.finally(() => setFaqLoading(false));

		return () => controller.abort();
	}, [open, API_BASE]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[156px] pb-8">
			<button
				type="button"
				className="absolute inset-0 bg-black/40"
				aria-label="Close FAQs"
				onClick={onClose}
			/>
			<div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[80vh] flex flex-col">
				<div className="flex items-start justify-between gap-4 px-5 sm:px-6 pt-5 pb-4 border-b border-[#233D4D1A]">
					<div>
						<p className="text-sm font-semibold text-[#F2A307]">Care Request FAQs</p>
						<h3 className="text-xl sm:text-2xl font-bold text-[var(--navy)]">
							{faqTitle}
						</h3>
					</div>
					<button
						type="button"
						className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
						onClick={onClose}
					>
						Close
					</button>
				</div>

				<div className="px-5 sm:px-6 pt-4 pb-5 sm:pb-6 overflow-y-auto">
					{faqLoading ? (
						<div className="space-y-3">
							{[1, 2, 3].map((i) => (
								<div key={i} className="h-12 rounded-lg bg-gray-100 animate-pulse" />
							))}
						</div>
					) : faqError ? (
						<div className="rounded-lg bg-red-50 px-4 py-3 text-red-600">
							{faqError}
						</div>
					) : faqItems.length === 0 ? (
						<div className="rounded-lg bg-[#233D4D0A] px-4 py-3 text-[#233D4D]">
							No FAQs available.
						</div>
					) : (
						<div className="space-y-3">
							{faqItems.map((item, idx) => {
								const isOpen = openFaqIdx === idx;
								return (
									<div key={item.id} className="rounded-lg border border-[#233D4D1A] p-4">
										<button
											type="button"
											className="flex w-full items-center justify-between gap-3 text-left text-sm sm:text-base font-semibold text-[#233D4D]"
											onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
											aria-expanded={isOpen}
										>
											<span>{item.question}</span>
											<span className="text-xl font-bold">{isOpen ? "—" : "+"}</span>
										</button>
										{isOpen && (
											<div className="mt-2 text-sm sm:text-base text-[#233D4D]">
												{item.answer}
											</div>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
