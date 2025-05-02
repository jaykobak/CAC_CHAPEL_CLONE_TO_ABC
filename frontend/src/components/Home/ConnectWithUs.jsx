import React from 'react'
import img from "../../assets/Home/hand.jfif"
import BackgroundImage from '../BackgroundImage'
import { Button } from '../ui/button'
import MainPadding from '../../layouts/MainPadding'
import HeadingText from '../HeadingText'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Heart } from 'lucide-react'

const ConnectWithUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const iconBoxes = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Prayer Request",
      description: "Share your prayer needs with us"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Call Us",
      description: "Speak with a church member"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Counseling",
      description: "Get spiritual guidance and support"
    }
  ]

  return (
    <div>
      <BackgroundImage
        img={img}
        bgClass="bg-gradient-to-r from-black/80 to-black/60"
        className='relative min-h-[550px] md:min-h-[450px]'
      >
        <MainPadding className="h-full">
          <motion.div
            className='relative z-10 flex flex-col gap-8 items-center justify-center h-full py-16'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <HeadingText className='text-primary-foreground font-cinzel text-[43px] leading-tight md:text-5xl text-center w-full max-w-4xl drop-shadow-lg'>
                WE ARE ALWAYS HERE FOR YOU
              </HeadingText>
            </motion.div>

            <motion.p
              className='text-primary-foreground text-center text-lg max-w-2xl'
              variants={itemVariants}
            >
              Have a prayer need? Whatever your challenge is, we are here to pray, encourage and stand in faith with you. Our church family is ready to support you through every season.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 w-full max-w-4xl"
              variants={itemVariants}
            >
              {iconBoxes.map((box, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-5 flex flex-col items-center text-center gap-2 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-primary-foreground/90 bg-primary/20 p-3 rounded-full mb-2">
                    {box.icon}
                  </div>
                  <h3 className="text-primary-foreground font-bold text-lg">{box.title}</h3>
                  <p className="text-primary-foreground/80">{box.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              className="mt-4"
            >
              <Button className="bg-orange hover:bg-orange/90 px-8 py-6 text-base font-medium shadow-lg">
                Connect With Us
              </Button>
            </motion.div>
          </motion.div>
        </MainPadding>
      </BackgroundImage>
    </div>
  )
}

export default ConnectWithUs

// import React from 'react'
// import img from "../../assets/Home/hand.jfif"
// import BackgroundImage from '../BackgroundImage'
// import { Button } from '../ui/button'
// import MainPadding from '../../layouts/MainPadding'
// import HeadingText from '../HeadingText'

// const ConnectWithUs = () => {
//   return (
//     <div >
//       <BackgroundImage img={img} bgClass="bg-black/60" className='relative h-[450px] md:min-h-[300px]' >
//         <MainPadding className="h-full">
//           <div className='relative z-10 flex flex-col gap-5 items-center justify-center h-full'>
//             <HeadingText className='text-primary-foreground/80 font-cinzel text-[43px] leading-tight md:text-5xl text-center w-full'>WE ARE ALWAYS HERE FOR YOU</HeadingText>
//             <p className='text-primary-foreground text-center'>Have a prayer need? Whatever your challenge is, we are here to pray, encourage and stand in faith with you</p>
//             <Button className="bg-orange hover:bg-orange/90 px-8 mt-10 w-fit">Connect With Us</Button>
//           </div>
//         </MainPadding>
//       </BackgroundImage>
//     </div>
//   )
// }

// export default ConnectWithUs
