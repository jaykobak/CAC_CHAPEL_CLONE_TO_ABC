import React from 'react';
import MainPadding from '../../layouts/MainPadding';
import { Button } from '../ui/button';
import img from "../../assets/Blog/service.jpg";
import img3 from "../../assets/Blog/thurs.jpg";
import { Calendar, MapPin, Clock } from 'lucide-react';
import HeadingText from '../HeadingText';
import { motion } from 'framer-motion';

const events = [
    // {
    //     name: "BIBLE STUDY",
    //     location: "Osupa Area, Opp. Bowen Teaching Hospital, Ogbomoso",
    //     date: "Every Wedne",
    //     time: "5:30PM",
    //     description: "Join us for deep scripture study and group discussions that strengthen your faith.",
    //     img: img
    // },
    {
        name: "SUNDAY SERVICE",
        location: "Osupa Area, Opp. Bowen Teaching Hospital, Ogbomoso",
        date: "Every Sunday",
        time: "9:00AM",
        description: "Our spirit-filled worship services with powerful messages and communion.",
        img: img
    },
    {
        name: "THURSDAY REVIVAL",
        location: "Osupa Area, Opp. Bowen Teaching Hospital, Ogbomoso",
        date: "Every Thursday",
        time: "4:00PM",
        description: "Midweek spiritual refreshing with passionate worship and deliverance sessions.",
        img: img3
    },
];

const UpcomingEvents = () => {
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
    };

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
            boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 0.5
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
    };

    return (
        <MainPadding className="">
            <div className='flex flex-col gap-10 text-foreground/80'>
                <motion.div
                    className='flex flex-col gap-5'
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={headerVariants}
                >
                    <h1 className='text-primary font-bold tracking-wider'>Upcoming Events</h1>
                    <HeadingText className='md:text-5xl text-3xl font-cinzel w-full md:w-[80%] leading-tight'>
                        GROW IN FAITH THROUGH OUR EVENTS AND ACTIVITIES
                    </HeadingText>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6'>
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            className='flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg transform transition-all duration-300'
                        >
                            <div className="overflow-hidden h-52">
                                <img
                                    src={event.img}
                                    alt={event.name}
                                    className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'
                                />
                            </div>

                            <div className='p-6 flex flex-col gap-4'>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-primary font-semibold">
                                        <Calendar className='w-[16px] h-[16px]' />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/70 font-medium">
                                        <Clock className='w-[16px] h-[16px]' />
                                        {event.time}
                                    </div>
                                </div>

                                <h1 className='font-cinzel text-3xl font-medium text-foreground/90'>{event.name}</h1>

                                <p className='text-foreground/80 font-medium'>{event.description}</p>

                                <div className='text-foreground/80 font-semibold flex items-center gap-2 mt-2'>
                                    <MapPin className='w-[18px] h-[18px] text-primary' />
                                    {event.location}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="self-center"
                    variants={buttonVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                >
                    <Button className="px-8 py-6 w-fit text-base text-foreground/80 bg-background hover:bg-background/90 border-[1px] border-foreground/40 shadow-md">
                        See All Events
                    </Button>
                </motion.div>
            </div>
        </MainPadding>
    );
};

export default UpcomingEvents;

// import React from 'react';
// import MainPadding from '../../layouts/MainPadding';
// import { Button } from '../ui/button';
// import img from "../../assets/Blog/service.jpg";
// import img3 from "../../assets/Blog/thurs.jpg";
// import { MapPin } from 'lucide-react';
// import HeadingText from '../HeadingText';

// const events = [
//     {
//         name: "BIBLE STUDY",
//         location: "Behind Lagos Kitchen, Under-G, Ogbomoso",
//         date: "Every Tuesday | 5:30PM",
//         description: "Join us for deep scripture study and group discussions that strengthen your faith.",
//         img: img
//     },
//     {
//         name: "SUNDAY SERVICE",
//         location: "Behind Lagos Kitchen, Under-G, Ogbomoso",
//         date: "Every Sunday | 7:30AM",
//         description: "Our spirit-filled worship services with powerful messages and communion.",
//         img: img
//     },
//     {
//         name: "THURSDAY REVIVAL",
//         location: "Behind Lagos Kitchen, Under-G, Ogbomoso",
//         date: "Every Thursday | 4:00PM",
//         description: "Midweek spiritual refreshing with passionate worship and deliverance sessions.",
//         img: img3
//     },
// ];

// const UpcomingEvents = () => {
//   return (
//     <MainPadding className="">
//         <div className='flex flex-col gap-10 text-foreground/80'>
//             <div className='flex flex-col gap-5'>
//                 <h1 className='text-primary font-bold'>Upcoming Events</h1>
//                 <HeadingText className='md:text-5xl text-3xl font-cinzel w-[80%]'>
//                     GROW IN FAITH THROUGH OUR EVENTS AND ACTIVITIES
//                 </HeadingText>
//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-5'>
//                 {events.map((event, index) => (
//                     <div key={index} className='flex flex-col gap-3 items-center hover:shadow-xl pb-5 transition rounded-lg overflow-hidden bg-white'>
//                         <img src={event.img} alt={event.name} className='w-full h-48 object-cover' />
//                         <div className='w-[85%] flex flex-col gap-2 text-sm'>
//                             <h1 className='text-primary font-semibold'>{event.date}</h1>
//                             <h1 className='text-foreground/80 font-semibold flex items-center gap-2'>
//                                 <MapPin className='w-[16px] h-[16px]' />
//                                 {event.location}
//                             </h1>
//                             <h1 className='font-cinzel text-3xl font-medium'>{event.name}</h1>
//                             <p className='text-foreground/80 font-semibold'>{event.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <Button className="px-6 w-fit self-center text-foreground/80 bg-background hover:bg-background border-[1px] border-foreground/80">
//                 See All Events
//             </Button>
//         </div>
//     </MainPadding>
//   );
// };

// export default UpcomingEvents;