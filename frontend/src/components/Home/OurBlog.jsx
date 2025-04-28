import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import { Button } from '../ui/button'
import img from "../../assets/Blog/blogimg.png"
import img2 from "../../assets/Blog/blogimg2.png"
import img3 from "../../assets/Blog/blogimg3.png"
import { ArrowRight, MapPin } from 'lucide-react'
import BlogCard from '../Blog/BlogCard'
import HeadingText from '../HeadingText'

const blogs = [
    {
        title: "THE TRANSFORMING POWER OF CHRISTIAN LOVE",
        date: "04/11/2024",
        description: (
            <p>
                In a world filled with division, Christ calls us to radical love. 
                "By this everyone will know that you are my disciples, if you love one another" (John 13:35). 
                True Christian love isn't sentimental - it's sacrificial action that reflects God's heart to a hurting world.
            </p>
        ),
        img: img,
        link: "/blog/christian-love"
    },
    {
        title: "FINDING PEACE IN LIFE'S STORMS",
        date: "04/18/2024",
        description: (
            <p>
                When Jesus calmed the storm, He first asked His disciples, "Why are you afraid?" (Matthew 8:26). 
                The same Savior who commands winds and waves walks with you through your struggles. 
                Discover how to anchor your soul in God's unchanging character during turbulent times.
            </p>
        ),
        img: img2,
        link: "/blog/finding-peace"
    },
    {
        title: "THE JOY OF SCRIPTURE MEMORIZATION",
        date: "04/25/2024",
        description: (
            <p>
                "I have hidden your word in my heart that I might not sin against you" (Psalm 119:11). 
                God's living Word transforms us when we carry it throughout our day. 
                Learn practical ways to memorize Scripture and experience its power in your daily walk with Christ.
            </p>
        ),
        img: img3,
        link: "/blog/scripture-memorization"
    }
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
