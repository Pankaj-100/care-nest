import FAQ from '@/components/careProvider/FAQ'
import HeroSectionCareProvider from '@/components/careProvider/HeroSectionCareProvider'
import IntroductionWithCTA from '@/components/careProvider/IntroductionWithCTA'
import PerkOfCareProvider from '@/components/careProvider/PerkOfCareProvider'
import RegisterAsCareProvider from '@/components/careProvider/RegisterAsCareProvider'
import TestimonialCareProvider from '@/components/careProvider/TestimonialCareProvider'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import React from 'react'

const page = () => {
  return (
    <>
      <Header />
      <HeroSectionCareProvider />
      <IntroductionWithCTA />
      <PerkOfCareProvider />
      <TestimonialCareProvider />
      <FAQ />
      <RegisterAsCareProvider />
      <Footer/>
    </>
  )
}

export default page