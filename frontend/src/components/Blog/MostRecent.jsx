import MainPadding from '@/layouts/MainPadding'
import React from 'react'
import HeadingText from '../HeadingText'
import { Button } from '../ui/button'
import BlogCard from './BlogCard'
import img from "../../assets/Home/Welcome/img1.jfif"

const blogs = [
    {
        title: "WHY YOU SHOULD SHOW LOVE AND COMPASSION",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img,
        link: "#"
    },
    {
        title: "WHY YOU SHOULD SHOW LOVE AND COMPASSION",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img,
        link: "#"
    },
    {
        title: "WHY YOU SHOULD SHOW LOVE AND COMPASSION",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img,
        link: "#"
    },
    {
        title: "WHY YOU SHOULD SHOW LOVE AND COMPASSION",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img,
        link: "#"
    },
    {
        title: "WHY YOU SHOULD SHOW LOVE AND COMPASSION",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img,
        link: "#"
    },
    {
        title: "WHY YOU SHOULD SHOW LOVE AND COMPASSION",
        date: "04/11/2024",
        description: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, ipsum minus reiciendis tempore asperiores mollitia est, consequuntur.</p>,
        img: img,
        link: "#"
    },
]

const MostRecent = () => {
    return (
        <MainPadding>
            <div className='flex flex-col gap-10 text-foreground/80'>
                <div className='flex flex-col gap-3 items-center'>
                    <h1 className='text-primary font-bold'>Our Blog</h1>
                    <HeadingText className='text-3xl md:text-5xl text-center font-cinzel'>MOST RECENT</HeadingText>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-12'>
                    {blogs.map(({ title, description, img, link, date }, index) => (
                        <div key={index} className={`${index > 3 && "hidden md:block" }`}>
                            <BlogCard title={title} description={description} banner={img} link={link} date={date} />
                        </div>
                    ))}
                </div>
                <Button className="px-6 w-fit self-center">See More Blog Posts</Button>
            </div>
        </MainPadding>
    )
}

export default MostRecent
