import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";

import PersonalCare from "../../../../components/service/PersonalCare";

export default function Page() {
  return (
    <>
      <HeroSectionCareProvider
        title={"Services / Personal Care"}
        textClasses="lg:left-40 lg:max-w-[15rem] text-wrap"
      />
      <PersonalCare />
    </>
  );
}
