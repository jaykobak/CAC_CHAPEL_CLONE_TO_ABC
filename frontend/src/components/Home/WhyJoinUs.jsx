import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img1 from "../../assets/Home/WhyJoinUs/img1.jpg"
import BackgroundImage from '../BackgroundImage'
import HeadingText from '../HeadingText'
import { motion } from 'framer-motion'

const whys = [
    {
        title: "A PLACE TO PRAY",
        description: <p>Our church is a space where you can find peace and guidance through prayer. Whether in quiet reflection or joining others, you're invited to experience the power of prayer in a community that supports you.</p>,
        img: img1,
        bg: "#1D0000"
    },
    {
        title: "A PLACE TO WORSHIP",
        description: <p>Come and lift your heart in worship with us. Together, we celebrate faith through songs, teachings, and moments that draw us closer to God and to each other, strengthening our bond as a family of believers.</p>,
        img: img1,
        bg: "#4F3004"
    },
    {
        title: "A PLACE TO CALL HOME",
        description: <p>Welcome to a church that feels like home. Here, you'll find friendships, encouragement, and a sense of belonging. Whether you're new or returning, there's a place for you in our community.</p>,
        img: img1,
        bg: "#115849"
    }
]

const WhyJoinUs = () => {
    // Animation variants
    const headerVariants = {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: index => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.7,
                ease: "easeOut"
            }
        }),
        hover: {
            y: -10,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    }

    return (
        <MainPadding>
            <div>
                <motion.div
                    className='flex flex-col gap-5 items-center mb-12'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={headerVariants}
                >
                    <motion.h1
                        className='text-sm text-primary font-bold uppercase tracking-wider'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Why you should join us
                    </motion.h1>
                    <HeadingText className='sm:text-5xl text-[32px] leading-tight font-cinzel text-center text-foreground max-w-4xl'>
                        JOIN US ON A JOURNEY OF FAITH AND SERVICE
                    </HeadingText>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                    {whys.map(({ title, description, img }, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            className="h-full"
                        >
                            <BackgroundImage
                                img={img}
                                bgClass={`${index === 0 ? "bg-[#1D0000]/85"
                                    : index === 1 ? "bg-[#4F3004]/85"
                                        : "bg-[#115849]/85"
                                    }`}
                                className="min-h-[300px] flex flex-col rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
                            >
                                <div className='relative z-10 flex flex-col items-center justify-center text-primary-foreground p-8 text-center gap-4 h-full'>
                                    <h1 className='font-cinzel text-3xl font-semibold mb-2'>{title}</h1>
                                    <div className="text-lg">{description}</div>
                                    <motion.div
                                        className="w-16 h-1 bg-primary-foreground/60 mt-2"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 64 }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                    />
                                </div>
                            </BackgroundImage>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MainPadding>
    )
}

export default WhyJoinUs

// import React from 'react'
// import MainPadding from '../../layouts/MainPadding'
// import img1 from "../../assets/Home/WhyJoinUs/img1.jpg"
// import BackgroundImage from '../BackgroundImage'
// import HeadingText from '../HeadingText'


// const whys = [
//     {
//         title: "A PLACE TO PRAY",
//         description: <p>Our church is a space where you can find peace and guidance through prayer. Whether in quiet reflection or joining others, you’re invited to experience the power of prayer in a community that supports you.</p>,
//         img: img1,
//         bg: "#1D0000"
//     },
//     {
//         title: "A PLACE TO WORSHIP",
//         description: <p>Come and lift your heart in worship with us. Together, we celebrate faith through songs, teachings, and moments that draw us closer to God and to each other, strengthening our bond as a family of believers.</p>,
//         img: img1,
//         bg: "#4F3004"
//     },
//     {
//         title: "A PLACE TO CALL HOME",
//         description: <p>Welcome to a church that feels like home. Here, you’ll find friendships, encouragement, and a sense of belonging. Whether you’re new or returning, there’s a place for you in our community.</p>,
//         img: img1,
//         bg: "#115849"
//     }
// ]


// const WhyJoinUs = () => {
//     return (
//         <MainPadding>
//             <div>
//                 <div className='flex flex-col gap-5 items-center'>
//                     <h1 className='text-sm text-primary font-bold'>Why you should join us</h1>
//                     <HeadingText className='sm:text-5xl text-[32px] leading-tight font-cinzel text-center text-foreground'>
//                         JOIN US ON A JOURNEY OF FAITH AND SERVICE
//                     </HeadingText>

//                 </div>
//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
//                     {whys.map(({ title, description, img }, index) => (
//                         <div key={index} >
//                             <BackgroundImage
//                                 img={img}
//                                 bgClass={`${index === 0 ? "bg-[#1D0000]/85"
//                                     : index === 1 ? "bg-[#4F3004]/85"
//                                         : "bg-[#115849]/85"
//                                     }`}
//                                 className="min-h-[250px] flex flex-col"
//                             >
//                                 <div className='relative z-10 flex flex-col items-center justify-center text-primary-foreground/80 p-6 px-3 text-center gap-4'>
//                                     <h1 className='font-cinzel text-2xl'>{title}</h1>
//                                     <p>{description}</p>
//                                 </div>
//                             </BackgroundImage>
//                         </div>
//                     ))}

//                 </div>
//             </div>
//         </MainPadding>
//     )
// }

// export default WhyJoinUs
