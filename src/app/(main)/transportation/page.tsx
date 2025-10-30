import ServiceTemplate from "@/components/staticPages/ServiceTemplate";
import { allServicesData } from "@/components/staticPages/data";
import HeroSectionCareProvider from "../../../components/careProvider/HeroSectionCareProvider";

export default function CompanionCarePage() {
  return (
    <>
      <HeroSectionCareProvider
        title={"Services / Home Maker"}
        textClasses="lg:left-25 lg:max-w-[18rem] text-wrap"
      />
      <ServiceTemplate serviceData={allServicesData.transportation} />
    </>
  );
}