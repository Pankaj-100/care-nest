import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";

import PersonalCare from "./PersonalCare";

export default function Page() {
  return (
    <>
      <HeroSectionCareProvider title={"Services / Personal Care"} />
      <PersonalCare />
    </>
  );
}
