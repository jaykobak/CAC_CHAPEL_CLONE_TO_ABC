import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import { Button } from '../ui/button'
import img from "../../assets/Home/Welcome/img1.jfif"
import { MapPin } from 'lucide-react'

const events = [
    {
        name: "BIBLE STUDY",
        location: "Ogbomoso",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img
    },
    {
        name: "BIBLE STUDY",
        location: "Ogbomoso",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img
    },
    {
        name: "BIBLE STUDY",
        location: "Ogbomoso",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img
    },
]

const UpcomingEvents = () => {
  return (
    <MainPadding className="">
        <div className='flex flex-col gap-10 text-foreground/80'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-primary font-bold'>Upcoimg Events</h1>
                <h1 className='md:text-5xl text-3xl  font-cinzel w-[80%]'>GROW IN FAITH THROUGH OUR EVENTS AND ACTIVITIES</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-5'>
                {events.map(({name, description, img, location, date}, index)=>(
                    <div className='flex flex-col gap-3 items-center '>
                        <img src={img} alt="" className='w-full' />
                        <div className='w-[85%] flex flex-col gap-2 text-sm'>
                            <h1 className='text-primary font-semibold'>{date}</h1>
                            <h1 className='text-foreground/80 font-semibold flex items-center gap-2'> <MapPin className='w-[16px] h-[16px]' /> {location}</h1>
                            <h1 className='font-cinzel text-3xl font-medium'>{name}</h1>
                            <p className='text-foreground/80 font-semibold'>{description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button className="px-6 w-fit self-center">See All Events</Button>
        </div>
    </MainPadding>
  )
}

export default UpcomingEvents
