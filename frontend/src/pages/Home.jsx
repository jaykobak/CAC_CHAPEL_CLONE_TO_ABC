import React, { useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Home/Hero'
import Welcome from '../components/Home/Welcome'
import WhyJoinUs from '../components/Home/WhyJoinUs'
import LatestSermons from '../components/Home/LatestSermons'
import OurLeadership from '../components/Home/OurLeadership'
import UpcomingEvents from '../components/Home/UpcomingEvents'
import ConnectWithUs from '../components/Home/ConnectWithUs'
import AnimatedCounter from '../components/Home/AnimatedCounter'
import { motion } from 'framer-motion'

// Animation variants for sections
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const Home = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className='flex flex-col'>
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Hero />
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Welcome />
        </motion.div>

        {/* Why Join Us Section */}
        <motion.div
          className="py-20 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <WhyJoinUs />
        </motion.div>

        {/* Latest Sermons Section */}
        <motion.div
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <LatestSermons />
        </motion.div>

        {/* Our Leadership Section */}
        <motion.div
          className="py-20 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {/* <OurLeadership /> */}
        </motion.div>

        {/* Animated Counter Section */}
        <motion.div
          className="py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <AnimatedCounter />
        </motion.div>

        {/* Upcoming Events Section */}
        <motion.div
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <UpcomingEvents />
        </motion.div>

        {/* Connect With Us Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <ConnectWithUs />
        </motion.div>
      </div>
    </MainLayout>
  )
}

export default Home


// import React from 'react'
// import MainLayout from '../layouts/MainLayout'
// import Hero from '../components/Home/Hero'
// import Welcome from '../components/Home/Welcome'
// import WhyJoinUs from '../components/Home/WhyJoinUs'
// import LatestSermons from '../components/Home/LatestSermons'
// import OurLeadership from '../components/Home/OurLeadership'
// import UpcomingEvents from '../components/Home/UpcomingEvents'
// import ConnectWithUs from '../components/Home/ConnectWithUs'

// const Home = () => {
//   return (
//     <MainLayout>
//       <div className='flex flex-col gap-20'>
//         <Hero />
//         <Welcome />
//         <WhyJoinUs />
//         <LatestSermons />
//         <OurLeadership />
//         <UpcomingEvents />
//         <ConnectWithUs />
//       </div>
//     </MainLayout>
//   )
// }

// export default Home
