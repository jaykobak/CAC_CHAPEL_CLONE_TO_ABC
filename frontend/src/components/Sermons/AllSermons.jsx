import React from 'react'
import img from "../../assets/Home/Welcome/img2.jfif"
import MainPadding from '@/layouts/MainPadding'
import SermonCard from './SermonCard'
import { Button } from '../ui/button'

const sermons = [
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
]

const AllSermons = () => {
    return (
        <MainPadding className="flex flex-col gap-10 items-center">
            <div className={`grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10`}>
                {sermons.map((sermon, index)=>(
                    <div key={index} className={`${index>1 && "md:flex hidden"}`}>
                        <SermonCard sermon={sermon} />
                    </div>
                ))}
            </div>
            <Button className="px-8">See More</Button>
        </MainPadding>
    )
}

export default AllSermons
