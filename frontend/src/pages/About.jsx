import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Hero from '@/components/About/Hero'
import WhoAreWe from '../components/About/WhoAreWe'
import OurHistory from '../components/About/OurHistory'
import Cores from '@/components/About/Cores'

const About = () => {
  return (
    <MainLayout>
      <div className='flex flex-col gap-20'>
        <Hero />
        <WhoAreWe />
        <OurHistory />
        <Cores />
      </div>
    </MainLayout>
  )
}

export default About
