import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import ServiceTemplate, { type ApiServiceItem } from "@/components/staticPages/ServiceTemplate";
import { allServicesData } from "@/components/staticPages/data";

function slugToTitle(slug: string) {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const params = await props.params;
  const slug = params?.id ?? "personal-care";
  
  // Map URL slug to API care type name
  const apiCareTypeMap: Record<string, string> = {
    "personal-care": "Personal Care",
    "companion-care": "Companion Care",
    "home-maker": "Home Maker Service",
    "sitter-service": "Sitter Services",
    "transportation": "Transportation",
    "specialized-care": "Specialized Care",
  };

  // Map URL slug to fallback data key
  const fallbackKeyMap: Record<string, string> = {
    "personal-care": "personalCare",
    "companion-care": "companionCare",
    "home-maker": "homeMaker",
    "sitter-service": "sitterService",
    "transportation": "transportation",
    "specialized-care": "specalizedCare", // fallback to personalCare since no specialized data
  };

  const careType = apiCareTypeMap[slug] ?? "Personal Care";
  const fallbackKey = fallbackKeyMap[slug] ?? "personalCare";
  const displayType = slugToTitle(slug); // For display purposes only
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fallback = (allServicesData as any)[fallbackKey] ?? allServicesData.personalCare;

  // Create fallback data structure
  const fallbackData: ApiServiceItem = {
    id: "fallback",
    serviceName: fallback.contactBanner.title,
    serviceDescription: fallback.contactBanner.description,
    careType: careType,
    title1: fallback.mainSection.title,
    description1: fallback.mainSection.description.map((p: string) => `<p>${p}</p>`).join(""),
    title2: fallback.locationSection.title,
    description2: fallback.locationSection.content.map((p: string) => `<p>${p}</p>`).join(""),
    title3: fallback.servicesWeProvide.title,
    description3: fallback.servicesWeProvide.descriptions.map((p: string) => `<p>${p}</p>`).join(""),
    description3Image: fallback.servicesWeProvide.imagePath,
    description3List: fallback.servicesWeProvide.services,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log("[Service Page] slug:", slug, "careType:", careType, "fallbackKey:", fallbackKey);

  return (
    <>
      <HeroSectionCareProvider title={`Services / ${displayType}`} textClasses="lg:left-40 lg:max-w-[15rem] text-wrap" />
      <ServiceTemplate careType={careType} fallbackData={fallbackData} fallbackKey={fallbackKey} />
    </>
  );
}
