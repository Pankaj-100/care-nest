import Services from "@/components/staticPages/services";
import HeroSectionCareProvider from "../../../components/careProvider/HeroSectionCareProvider";

export default function CareServicePage() {
  return (
    <>
      <HeroSectionCareProvider
          title={"Services / Personal Care"}
          textClasses="lg:left-25 lg:max-w-[18rem] text-wrap"
        />
      <Services />
    </>
  );
}