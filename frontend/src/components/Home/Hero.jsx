import React, { useEffect } from 'react'
import hero from "../../assets/Home/hero.jpg"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import MainPadding from '../../layouts/MainPadding'
import HeadingText from '../HeadingText'
import { motion } from 'framer-motion'

const Hero = () => {
    // Animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
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
                delay: 0.5,
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => {
            const heroElement = document.querySelector('.hero-bg');
            if (heroElement) {
                const scrollPosition = window.scrollY;
                heroElement.style.transform = `translateY(${scrollPosition * 0.15}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='min-h-[85vh] md:min-h-[90vh] relative overflow-hidden'>
            <div className='h-full w-full absolute hero-bg flex items-center'
                style={{
                    backgroundImage: `url(${hero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                <MainPadding>
                    <motion.div
                        className='relative flex flex-col py-10 justify-center gap-8 z-10 items-start h-full w-full sm:w-[630px]'
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.3
                                }
                            }
                        }}
                    >
                        <motion.div variants={textVariants}>
                            <HeadingText className='font-cinzel text-[42px] leading-none sm:text-7xl text-primary-foreground hero-heading drop-shadow-lg'>
                                Come as You Are, Find Hope, Leave with Love
                            </HeadingText>
                        </motion.div>

                        <motion.p
                            className='text-primary-foreground font-medium text-lg drop-shadow-md max-w-[540px]'
                            variants={textVariants}
                        >
                            God's grace is for everyone, including you. Join a welcoming community to grow in faith and connect with others on the journey.
                        </motion.p>

                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            <Button className="flex gap-2 items-center px-8 py-6 mt-4 text-base font-medium shadow-md">
                                Get To Know Us <ArrowRight className="ml-1" />
                            </Button>
                        </motion.div>
                    </motion.div>
                    <div className='absolute h-full w-full bg-gradient-to-r from-black/80 to-black/50 top-0 left-0'></div>
                </MainPadding>
            </div>
        </div>
    )
}

export default Hero;

// import React from 'react'
// import herobg from "../../assets/herobg.jpg"
// import { Button } from '../ui/button'
// import { ArrowRight } from 'lucide-react'
// import MainPadding from '../../layouts/MainPadding'
// import HeadingText from '../HeadingText'

// const Hero = () => {
//     return (
//         <div className='min-h-[600px] relative'>
//             <div className='h-full w-full absolute hero-bg flex items-center'>
//                 <MainPadding>
//                     <div className='relative flex flex-col py-10 justify-center gap-5 z-10 items-start h-full w-full sm:w-[563px]'>
//                         <HeadingText className='font-cinzel text-[40px] leading-none sm:text-6xl text-primary-foreground/90 hero-heading'>
//                             Come as You Are, Find Hope, Leave with Love
//                         </HeadingText>
//                         <p className='text-primary-foreground/80 font-medium'>
//                             God’s grace is for everyone, including you. Join a welcoming community to grow in faith and connect with others on the journey.
//                         </p>
//                         <Button className="flex gap-2 items-center px-6 mt-10">Get To Know Us <ArrowRight /> </Button>
//                     </div>
//                     <div className='absolute h-full w-full bg-black/70 top-0 left-0 '></div>
//                 </MainPadding>
//             </div>
//         </div>
//     )
// }

// export default Hero
