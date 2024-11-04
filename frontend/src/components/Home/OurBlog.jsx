import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import { Button } from '../ui/button'
import img from "../../assets/Home/Welcome/img1.jfif"
import { ArrowRight, MapPin } from 'lucide-react'
import BlogCard from '../Blog/BlogCard'
import HeadingText from '../HeadingText'

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
]

const OurBlog = () => {
    return (
        <MainPadding className="">
            <div className='flex flex-col gap-10 text-foreground/80'>
                <div className='flex flex-col gap-5 items-center'>
                    <h1 className='text-primary font-bold'>Our Blog</h1>
                    <HeadingText className='text-3xl md:text-5xl text-center font-cinzel'>STAY INFORMED AND INSPIRED</HeadingText>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-5'>
                    {blogs.map(({ title, description, img, link, date }, index) => (
                        <div key={index}>
                            <BlogCard title={title} description={description} banner={img} link={link} date={date}  />
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="px-6 w-fit self-center bg-background hover:bg-background border-foreground/80">See All Blog Posts <ArrowRight /></Button>
            </div>
        </MainPadding>
    )
}

export default OurBlog
