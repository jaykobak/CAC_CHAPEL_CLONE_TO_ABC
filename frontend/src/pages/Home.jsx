import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Home/Hero'
import Welcome from '../components/Home/Welcome'
import WhyJoinUs from '../components/Home/WhyJoinUs'

const Home = () => {
  return (
    <MainLayout>
      <div className='flex flex-col gap-10'>
        <Hero />
        <Welcome />
        <WhyJoinUs />
      </div>
    </MainLayout>
  )
}

export default Home
