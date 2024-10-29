import React from 'react'
import BackgroundImage from '../BackgroundImage'
import heroImg from "@/assets/About/hero.jfif" 
import MainPadding from '@/layouts/MainPadding'
import HeadingText from '../HeadingText'

const Hero = () => {
  return (
    <div className='h-[500px] relative'>
      <BackgroundImage img={heroImg} className="bg-black/70" />
      <MainPadding className='relative z-10 flex items-center justify-center'>
        <HeadingText className="text-primary-foreground text-5xl md:text-6xl text-center w-full lg:w-[70%]">OUR MISSION, VISION AND VALUES</HeadingText>
      </MainPadding>
    </div>
  )
}

export default Hero
