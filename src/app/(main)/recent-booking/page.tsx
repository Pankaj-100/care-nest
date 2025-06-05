import { RecentPage } from "./RecentPage";
import Footer from "@/components/common/Footer";
import HeroSectionCareProvider from "@/components/careProvider/HeroSectionCareProvider";
import Header from "@/components/common/Header";

export default function page() {
  return (
    <>
      <HeroSectionCareProvider />
      <RecentPage />
    </>
  );
}
