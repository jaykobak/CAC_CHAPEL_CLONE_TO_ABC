import React from 'react';
import MainPadding from '../../layouts/MainPadding';
import { Button } from '../ui/button';
import img from "../../assets/Home/Welcome/img1.jfif";
import { MapPin } from 'lucide-react';
import HeadingText from '../HeadingText';

const events = [
    {
        name: "BIBLE STUDY",
        location: "Behind Lagos Kitchen, Under-G, Ogbomoso",
        date: "Every Tuesday | 5:30PM",
        description: "Join us for deep scripture study and group discussions that strengthen your faith.",
        img: img
    },
    {
        name: "SUNDAY SERVICE",
        location: "Behind Lagos Kitchen, Under-G, Ogbomoso",
        date: "Every Sunday | 7:30AM",
        description: "Our spirit-filled worship services with powerful messages and communion.",
        img: img
    },
    {
        name: "THURSDAY REVIVAL",
        location: "Behind Lagos Kitchen, Under-G, Ogbomoso",
        date: "Every Thursday | 4:00PM",
        description: "Midweek spiritual refreshing with passionate worship and deliverance sessions.",
        img: img
    },
];

const UpcomingEvents = () => {
  return (
    <MainPadding className="">
        <div className='flex flex-col gap-10 text-foreground/80'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-primary font-bold'>Upcoming Events</h1>
                <HeadingText className='md:text-5xl text-3xl font-cinzel w-[80%]'>
                    GROW IN FAITH THROUGH OUR EVENTS AND ACTIVITIES
                </HeadingText>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-5'>
                {events.map((event, index) => (
                    <div key={index} className='flex flex-col gap-3 items-center hover:shadow-xl pb-5 transition rounded-lg overflow-hidden bg-white'>
                        <img src={event.img} alt={event.name} className='w-full h-48 object-cover' />
                        <div className='w-[85%] flex flex-col gap-2 text-sm'>
                            <h1 className='text-primary font-semibold'>{event.date}</h1>
                            <h1 className='text-foreground/80 font-semibold flex items-center gap-2'>
                                <MapPin className='w-[16px] h-[16px]' /> 
                                {event.location}
                            </h1>
                            <h1 className='font-cinzel text-3xl font-medium'>{event.name}</h1>
                            <p className='text-foreground/80 font-semibold'>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button className="px-6 w-fit self-center bg-blue-600 hover:bg-blue-700">
                See All Events
            </Button>
        </div>
    </MainPadding>
  );
};

export default UpcomingEvents;