import { CareGiverHero } from "@/components/careGiver/CareGiverHero";
import CaregiversPage from "@/app/care-giver/caregivers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";



export default function Page() {
    return (
        <>
      <Header />
      <CareGiverHero />
       <CaregiversPage />  
       <Footer /> 
        </>
    )
}