import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ banner, title, description, date, link }) => {
    return (
        <div className='flex flex-col gap-3 items-center hover:shadow-xl pb-5 transition'>
            <img src={banner} alt="" className='w-full' />
            <div className='w-[90%] flex flex-col gap-2 text-sm'>
                <h1 className='font-cinzel text-2xl font-medium'>{title}</h1>
                <p className='text-foreground/80 font-medium'>{description}</p>
                <div className='flex justify-between items-center mt-5'>
                    <Link to={link} className='has-svg text-sm border px-3 py-2 rounded-full flex gap-2'>
                    Read More
                    <ArrowRight />
                    </Link>
                    <h1 className='text-primary font-semibold'>{date}</h1>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
