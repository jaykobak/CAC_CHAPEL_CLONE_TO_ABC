import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img from "../../assets/Home/leadership.jpg"
import BackgroundImage from '../BackgroundImage'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import HeadingText from '../HeadingText'
import { motion } from 'framer-motion'

const OurLeadership = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-orange/20 z-0"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute bottom-12 -left-12 w-32 h-32 rounded-full bg-primary/10 z-0"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      />

      <MainPadding className={"transition-all duration-700 relative z-10"}>
        <BackgroundImage
          img={img}
          imgClass={`object-top`}
          className="md:h-fit h-[300px] rounded-lg overflow-hidden shadow-2xl"
        >
          <motion.div
            className='md:w-[38%] text-primary-foreground/90 p-5 md:p-10 hidden md:flex flex-col gap-5 relative z-10 bg-gradient-to-r from-black/70 to-transparent'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h1 className='font-bold text-primary' variants={itemVariants}>Our Leadership</motion.h1>
            <motion.div variants={itemVariants}>
              <HeadingText className='font-cinzel text-5xl md:text-7xl'>PASTOR OGUNSIJI</HeadingText>
            </motion.div>
            <motion.p className='font-medium text-lg' variants={itemVariants}>
              Pastor Ogunsiji leads our church with dedication, wisdom, and a heart for service. With a vision to uplift and inspire, he guides our community to grow in faith and love, encouraging us to walk closely with God every day.
            </motion.p>
            <motion.div
              variants={itemVariants}
              whileHover="hover"
            >
              <Button className="bg-orange hover:bg-orange/90 w-fit text-base py-6 px-8 shadow-lg" variants={buttonVariants}>
                Learn More <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </BackgroundImage>

        {/* Mobile version */}
        <motion.div
          className='text-foreground/90 flex flex-col gap-5 relative z-10 md:hidden mt-8'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h1 className='font-bold text-primary' variants={mobileItemVariants}>Our Leadership</motion.h1>
          <motion.div variants={mobileItemVariants}>
            <h1 className='font-cinzel text-4xl md:text-5xl'>PASTOR OGUNSIJI</h1>
          </motion.div>
          <motion.p className='font-medium' variants={mobileItemVariants}>
            Pastor Ogunsiji leads our church with dedication, wisdom, and a heart for service. With a vision to uplift and inspire, he guides our community to grow in faith and love, encouraging us to walk closely with God every day.
          </motion.p>
          <motion.div
            variants={mobileItemVariants}
            whileHover="hover"
          >
            <Button className="bg-orange hover:bg-orange/90 w-fit" variants={buttonVariants}>
              Learn More <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </MainPadding>
    </div>
  )
}

export default OurLeadership

// import React from 'react'
// import MainPadding from '../../layouts/MainPadding'
// import img from "../../assets/Home/leadership.jpg"
// import BackgroundImage from '../BackgroundImage'
// import { Button } from '../ui/button'
// import { ArrowRight } from 'lucide-react'
// import HeadingText from '../HeadingText'

// const OurLeadership = () => {
//   return (
//     <MainPadding className={"hover:px-0 transition-all duration-700"}>
//       <BackgroundImage img={img} imgClass={`object-top`} className="md:h-fit h-[300px]">
//         <div className='w-[33%] text-primary-foreground/90  p-10 md:flex flex-col gap-5 relative z-10 hidden '>
//           <h1 className='font-bold'>Our Leadership</h1>
//           <HeadingText className='font-cinzel text-7xl'>PASTOR OGUNSIJI</HeadingText>
//           <p className='font-medium'>Pastor Ogunsiji leads our church with dedication, wisdom, and a heart for service. With a vision to uplift and inspire, he guides our community to grow in faith and love, encouraging us to walk closely with God every day.</p>
//           <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
//         </div>
//       </BackgroundImage>
//       <div className=' text-foreground/90 flex flex-col gap-5 relative z-10 md:hidden mt-5'>
//         <h1 className='font-bold text-primary'>Our Leadership</h1>
//         <h1 className='font-cinzel text-5xl'>PASTOR OGUNSIJI</h1>
//         <p className='font-medium'>Pastor Ogunsiji leads our church with dedication, wisdom, and a heart for service. With a vision to uplift and inspire, he guides our community to grow in faith and love, encouraging us to walk closely with God every day.</p>
//         <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
//       </div>
//     </MainPadding>
//   )
// }

// export default OurLeadership
