import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import ServiceTemplate from "@/components/staticPages/ServiceTemplate";
import { allServicesData } from "@/components/staticPages/data";

export const dynamic = "force-dynamic";

type ApiServiceItem = {
  id: string;
  serviceName?: string;
  serviceDescription?: string;
  careType?: string;
  title1?: string;
  description1?: string;
  title2?: string;
  description2?: string;
  title3?: string;
  description3?: string;
  description3Image?: string;
  description3List?: string[];
};

type ApiFaqItem = {
  id: string;
  faqType?: string;
  sectionTitle?: string;
  faqItems?: { id: string; question: string; answer: string }[];
};

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

function slugToTitle(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// convert "Personal Care" -> "personalCare", "Home Maker Service" -> "homeMakerService"
function titleToFaqType(title: string) {
  const parts = title
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return title.toLowerCase();
  return parts
    .map((p, i) => (i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()))
    .join("");
}

// Avoid strict route prop typing so Next's internal PageProps check passes during build.
// Use a loose `props: any` and read params from props.params.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const slug = props?.params?.id ?? "personal-care";
  const type = slugToTitle(slug); // "Personal Care", "Home Maker Service", etc.

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
  const serviceEndpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/service-cms/care-type/${encodeURIComponent(type)}`;

  let apiItem: ApiServiceItem | null = null;
  let apiFaq: ApiFaqItem | null = null;

  try {
    console.log("[service page] fetching service:", serviceEndpoint);
    const serviceRes = await fetch(serviceEndpoint, { next: { revalidate: 60 } });
    console.log("[service page] service status:", serviceRes.status);
    const serviceJson = await serviceRes.json().catch(() => null);
    console.log("[service page] service body:", serviceJson);
    if (serviceRes.ok) {
      apiItem =
        Array.isArray(serviceJson?.data?.services) && serviceJson.data.services.length > 0
          ? serviceJson.data.services[0]
          : null;
    }

    // derive faqType from returned careType (prefer apiItem.careType) or from title
    const faqSourceTitle = (apiItem?.careType || type).toString();
    const faqType = titleToFaqType(faqSourceTitle); // e.g. personalCare

    const faqEndpoint = `${API_BASE.replace(/\/$/, "")}/api/v1/faq/type/${encodeURIComponent(faqType)}`;
    console.log("[service page] fetching faq:", faqEndpoint);
    const faqRes = await fetch(faqEndpoint, { next: { revalidate: 60 } });
    console.log("[service page] faq status:", faqRes.status);
    const faqJson = await faqRes.json().catch(() => null);
    console.log("[service page] faq body:", faqJson);
    if (faqRes.ok) {
      apiFaq =
        Array.isArray(faqJson?.data?.faqs) && faqJson.data.faqs.length > 0 ? faqJson.data.faqs[0] : null;
    }
  } catch (err) {
    console.error("[service page] fetch error:", err);
  }

  // fallback key mapping for existing local data
  const keyMap: Record<string, string> = {
    "personal care": "personalCare",
    "companion care": "companionCare",
    "home maker service": "homeMaker",
    "home maker": "homeMaker",
    "sitter service": "sitterService",
    "transportation": "transportation",
    "transportation service": "transportation",
  };

  const fallbackKey = keyMap[type.toLowerCase()] ?? "personalCare";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fallback = (allServicesData as any)[fallbackKey] ?? allServicesData.personalCare;

  // map API faq -> template FAQ shape
  const faqSection =
    apiFaq?.faqItems && apiFaq.faqItems.length > 0
      ? {
          subtitle: apiFaq.sectionTitle ?? "FAQ",
          title: "Frequently asked questions",
          questions: apiFaq.faqItems.map((it) => ({ question: it.question, answer: it.answer })),
        }
      : fallback.faq;

  const serviceData = apiItem
    ? {
        mainSection: {
          title: apiItem.title1 ?? apiItem.serviceName ?? type,
          description: apiItem.description1 ? [stripHtml(apiItem.description1)] : fallback.mainSection.description,
        },
        locationSection: {
          title: apiItem.title2 ?? fallback.locationSection.title,
          content: apiItem.description2 ? [stripHtml(apiItem.description2)] : fallback.locationSection.content,
        },
        servicesWeProvide: {
          title: apiItem.title3 ?? fallback.servicesWeProvide.title,
          services: apiItem.description3List ?? fallback.servicesWeProvide.services,
          descriptions: apiItem.description3 ? [stripHtml(apiItem.description3)] : fallback.servicesWeProvide.descriptions,
          imagePath: apiItem.description3Image ?? fallback.servicesWeProvide.imagePath ?? "/service-default.jpg",
        },
        faq: faqSection,
        contactBanner: {
          title: apiItem.serviceName ?? fallback.contactBanner.title,
          description: apiItem.serviceDescription ?? fallback.contactBanner.description,
          buttonText: fallback.contactBanner.buttonText ?? "Contact Us",
        },
      }
    : {
        ...fallback,
        faq: faqSection,
      };

  return (
    <>
      <HeroSectionCareProvider title={`Services / ${type}`} textClasses="lg:left-40 lg:max-w-[15rem] text-wrap" />
      <ServiceTemplate serviceData={serviceData} />
    </>
  );
}
