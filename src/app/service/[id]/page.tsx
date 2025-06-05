import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import Header from "@/components/common/Header";

import Footer from "@/components/common/Footer";
import PersonalCare from "./PersonalCare";

export default function Page() {
  return (
    <>
      <Header />
      <HeroSectionCareProvider title={"Services / Personal Care"} />
      <PersonalCare />
      <Footer />
    </>
  );
}
