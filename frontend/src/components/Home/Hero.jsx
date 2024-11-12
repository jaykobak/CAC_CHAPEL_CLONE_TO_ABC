import React from 'react'
import herobg from "../../assets/herobg.jpg"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import MainPadding from '../../layouts/MainPadding'
import HeadingText from '../HeadingText'

const Hero = () => {
    return (
        <div className='min-h-[600px] relative'>
            <div className='h-full w-full absolute hero-bg flex items-center'>
                <MainPadding>
                    <div className='relative flex flex-col py-10 justify-center gap-5 z-10 items-start h-full w-full sm:w-[563px]'>
                        <HeadingText className='font-cinzel text-[40px] leading-none sm:text-6xl text-primary-foreground/90 hero-heading'>
                            Come as You Are, Find Hope, Leave with Love
                        </HeadingText>
                        <p className='text-primary-foreground/80 font-medium'>
                            God’s grace is for everyone, including you. Join a welcoming community to grow in faith and connect with others on the journey.
                        </p>
                        <Button className="flex gap-2 items-center px-6 mt-10">Get To Know Us <ArrowRight /> </Button>
                    </div>
                    <div className='absolute h-full w-full bg-black/70 top-0 left-0 '></div>
                </MainPadding>
            </div>
        </div>
    )
}

export default Hero
