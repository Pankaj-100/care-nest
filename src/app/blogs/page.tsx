import CardSection from '@/components/Blog/CardSection'
import Section3 from '@/components/Blog/Section3'
import HeroSectionCareProvider from '@/components/careProvider/HeroSectionCareProvider'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import React from 'react'

const page = () => {
  return (
    <>
       <Header />
       {/* add the prop no need to create again */}
      <HeroSectionCareProvider />
      <Section3 />
      <CardSection />
       <Footer />
      
       
    </>
  )
}

export default page