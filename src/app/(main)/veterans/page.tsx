
import VeteransFinancialAssistance, { VeteransApiData, VeteransFaqApi, FaqItem } from "@/components/staticPages/veterans";

export const metadata = {
  title: "Transitional Care",
};

async function fetchVeteransData(): Promise<VeteransApiData | null> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/veterans-home-care`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      return json?.data?.veteransHomeCare ?? null;
    }
  } catch {
    // ignore
  }
  return null;
}

async function fetchVeteransFaq(): Promise<{ sectionTitle: string; faqItems: FaqItem[] }> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/Veterans`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const faqData: VeteransFaqApi = json?.data;
      if (faqData?.faqs?.length > 0) {
        return {
          sectionTitle: faqData.faqs[0].sectionTitle || "Some Frequently Asked Questions About The Veteran's Pension Benefit",
          faqItems: faqData.faqs[0].faqItems || [],
        };
      }
    }
  } catch {
    // ignore
  }
  return { sectionTitle: "Some Frequently Asked Questions About The Veteran's Pension Benefit", faqItems: [] };
}

export default async function Veterans() {
  const pageData = await fetchVeteransData();
  const faq = await fetchVeteransFaq();
  if (!pageData) {
    return <div className="flex justify-center items-center py-10"><p className="text-[#233D4D]">Unable to load page data.</p></div>;
  }
  return <VeteransFinancialAssistance pageData={pageData} faqSectionTitle={faq.sectionTitle} faqItems={faq.faqItems} />;
}