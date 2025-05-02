import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img1 from "../../assets/Home/manpraying.jpg"
import img3 from "../../assets/Home/pastoribitomi.jpg"
import img2 from "../../assets/Home/chiorsing.jpg"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import HeadingText from '../HeadingText'
import { motion } from 'framer-motion'

const Welcome = () => {
    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }

    return (
        <MainPadding>
            <div className='flex flex-col md:flex-row items-center gap-8 min-h-[500px]'>
                <motion.div
                    className='flex flex-col gap-6 items-end flex-grow order-2 md:order-1'
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div
                        className='grid grid-cols-2 gap-5 w-full md:w-[90%]'
                        variants={cardVariants}
                    >
                        <motion.div
                            variants={imageVariants}
                            whileHover="hover"
                            className="overflow-hidden rounded-lg shadow-md"
                        >
                            <img src={img1} alt="Man praying" className='h-[200px] sm:h-[250px] object-cover w-full transition-transform duration-500 hover:scale-110' />
                        </motion.div>
                        <motion.div
                            variants={imageVariants}
                            whileHover="hover"
                            className="overflow-hidden rounded-lg shadow-md"
                        >
                            <img src={img2} alt="Choir singing" className='h-[200px] sm:h-[250px] object-cover w-full transition-transform duration-500 hover:scale-110' />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className='bg-[#FDDDAA] h-fit w-full text-foreground/85 p-5 py-8 sm:py-10 sm:p-10 flex flex-col gap-5 font-medium rounded-lg shadow-lg'
                        variants={cardVariants}
                    >
                        <HeadingText className='md:text-5xl text-3xl font-cinzel leading-tight'>
                            WELCOME TO OUR <br /> CHURCH
                        </HeadingText>
                        <p className="text-lg">Our church is a place for all to find hope, encouragement, and a fresh start. We gather as a community to worship, learn, and grow together, grounded in faith and guided by love.</p>
                        <p className="text-lg">Here, you'll find people who are committed to lifting each other up, walking through life's journey together, and discovering God's purpose in a supportive and open-hearted environment.</p>
                        {/* <p className="text-lg">No matter where you are in your faith journey, you're welcome here. We invite you to come, connect, and be a part of something greater.</p> */}

                        <motion.div
                            whileHover="hover"
                            variants={buttonVariants}
                        >
                            <Button className="flex gap-2 items-center px-6 py-6 mt-6 w-full sm:w-fit text-base">
                                Learn More About Our Values <ArrowRight />
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className='h-[500px] md:h-[640px] w-full md:w-[40%] order-1 md:order-2 md:block'
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="h-full w-full overflow-hidden rounded-tr-[150px] rounded-bl-[80px] shadow-xl">
                        <img src={img3} alt="Pastor" className='w-full h-full object-cover hover:scale-105 transition-all duration-1000' />
                    </div>
                </motion.div>
            </div>
        </MainPadding>
    )
}

export default Welcome

// import React from 'react'
// import MainPadding from '../../layouts/MainPadding'
// import img1 from "../../assets/Home/manpraying.jpg"
// import img3 from "../../assets/Home/pastoribitomi.jpg"
// import img2 from "../../assets/Home/chiorsing.jpg"
// import { Button } from '../ui/button'
// import { ArrowRight } from 'lucide-react'
// import HeadingText from '../HeadingText'

// const Welcome = () => {
//     return (
//         <MainPadding>
//             <div className='flex items-center gap-5 min-h-[500px]'>
//                 <div className='flex flex-col gap-5 items-end flex-grow'>
//                     <div className=' grid grid-cols-2  gap-5 w-full md:w-[90%]'>
//                         <img src={img1} alt="" className='h-[200px] sm:h-[250px] object-cover' />
//                         <img src={img2} alt="" className='h-[200px] sm:h-[250px] object-cover' />
//                     </div>
//                     <div className='bg-[#FDDDAA] h-fit w-full text-foreground/85 p-5 py-8 sm:py-10 sm:p-10 flex flex-col gap-5 font-medium'>
//                         <HeadingText className='md:text-5xl text-3xl font-cinzel'>WELCOME TO OUR <br /> CHURCH</HeadingText>
//                         <p>Our church is a place for all to find hope, encouragement, and a fresh start. We gather as a community to worship, learn, and grow together, grounded in faith and guided by love.</p>
//                         <p>Here, you’ll find people who are committed to lifting each other up, walking through life’s journey together, and discovering God’s purpose in a supportive and open-hearted environment.</p>
//                         <p>No matter where you are in your faith journey, you’re welcome here. We invite you to come, connect, and be a part of something greater.</p>
//                         <Button className="flex gap-2 items-center px-6 mt-6 w-full sm:w-fit">Learn More About Our Values <ArrowRight /> </Button>
//                     </div>

//                 </div>
//                 <div className='h-[640px] min-w-[30%] hidden md:block'>
//                     <img src={img3} alt="" className='w-full h-full rounded-tr-[150px] object-cover z-0' />
//                 </div>
//             </div>
//         </MainPadding>
//     )
// }

// export default Welcome
