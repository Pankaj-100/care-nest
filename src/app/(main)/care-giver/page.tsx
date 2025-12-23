import { CareGiverHero } from "@/components/careGiver/CareGiverHero";
import CaregiversPage from "../../../components/careGiver/caregivers";
import { Suspense } from "react";

export const metadata = {
  title: "Care Giver",
};

export default function Page() {
  return (
    <>
      <CareGiverHero />
      <Suspense fallback={<div>Loading...</div>}>
        <CaregiversPage />
      </Suspense>
    </>
  );
}
