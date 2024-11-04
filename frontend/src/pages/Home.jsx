import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Home/Hero'
import Welcome from '../components/Home/Welcome'
import WhyJoinUs from '../components/Home/WhyJoinUs'
import LatestSermons from '../components/Home/LatestSermons'
import OurLeadership from '../components/Home/OurLeadership'
import UpcomingEvents from '../components/Home/UpcomingEvents'
import ConnectWithUs from '../components/Home/ConnectWithUs'
import OurBlog from '../components/Home/OurBlog'

const Home = () => {
  return (
    <MainLayout>
      <div className='flex flex-col gap-20'>
        <Hero />
        <Welcome />
        <WhyJoinUs />
        <LatestSermons />
        <OurLeadership />
        <UpcomingEvents />
        <ConnectWithUs />
        <OurBlog />
      </div>
    </MainLayout>
  )
}

export default Home
