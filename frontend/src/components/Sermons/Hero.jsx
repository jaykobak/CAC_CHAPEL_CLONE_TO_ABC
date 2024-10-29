import React from 'react'
import BackgroundImage from '../BackgroundImage'
import img from "@/assets/Home/Welcome/img2.jfif"
import HeadingText from '../HeadingText'
import MainPadding from '@/layouts/MainPadding'

const Hero = () => {
    return (
        <BackgroundImage img={img} bgClass="bg-black/70" >
            <MainPadding className="flex flex-col md:flex-row gap-5 w-full  md:w-[70%] items-center h-[500px] justify-center">
                <div className='flex flex-col gap-10  text-primary-foreground '>
                    <h1>Featured</h1>
                    <HeadingText className="md:text-6xl text-[42px] text-primary-foreground/80">THE POWER OF LOVE</HeadingText>
                    <div className='flex gap-14 text-sm'>
                        <p>Pastor Obasa</p>
                        <p>2022-04-05</p>
                    </div>
                </div>
                <div className='md:h-20 md:w-[1px] h-[1px] w-20 bg-primary-foreground/60'></div>
                <div className='min-w-32 h-32 rounded-full flex items-center justify-center border border-white/80 text-primary-foreground/80'>Watch</div>
            </MainPadding>
        </BackgroundImage>
    )
}

export default Hero
