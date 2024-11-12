import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img1 from "../../assets/Home/Welcome/img1.jfif"
import img2 from "../../assets/Home/Welcome/img2.jfif"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import HeadingText from '../HeadingText'

const Welcome = () => {
    return (
        <MainPadding>
            <div className='flex items-center gap-5 min-h-[500px]'>
                <div className='flex flex-col gap-5 items-end flex-grow'>
                    <div className=' grid grid-cols-2  gap-5 w-full md:w-[90%]'>
                        <img src={img1} alt="" className='h-[200px] sm:h-[250px] object-cover' />
                        <img src={img1} alt="" className='h-[200px] sm:h-[250px] object-cover' />
                    </div>
                    <div className='bg-[#FDDDAA] h-fit w-full text-foreground/85 p-5 py-8 sm:py-10 sm:p-10 flex flex-col gap-5 font-medium'>
                        <HeadingText className='md:text-5xl text-3xl font-cinzel'>WELCOME TO OUR <br /> CHURCH</HeadingText>
                        <p>Our church is a place for all to find hope, encouragement, and a fresh start. We gather as a community to worship, learn, and grow together, grounded in faith and guided by love.</p>
                        <p>Here, you’ll find people who are committed to lifting each other up, walking through life’s journey together, and discovering God’s purpose in a supportive and open-hearted environment.</p>
                        <p>No matter where you are in your faith journey, you’re welcome here. We invite you to come, connect, and be a part of something greater.</p>
                        <Button className="flex gap-2 items-center px-6 mt-6 w-full sm:w-fit">Learn More About Our Values <ArrowRight /> </Button>
                    </div>

                </div>
                <div className='h-[640px] min-w-[30%] hidden md:block'>
                    <img src={img2} alt="" className='w-full h-full rounded-tr-[150px] object-cover z-0' />
                </div>
            </div>
        </MainPadding>
    )
}

export default Welcome
