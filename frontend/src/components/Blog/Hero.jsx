import React from 'react'
import BackgroundImage from '../BackgroundImage'
import heroImg from "../../assets/Blog/hero.jpg"
import MainPadding from '@/layouts/MainPadding'
import HeadingText from '../HeadingText'

const Hero = () => {
  return (
    <div>
      <BackgroundImage img={heroImg} bgClass={"bg-black/70"} className={"h-[500px]"}>
        <MainPadding className={"flex items-center justify-center h-full"}>
          <HeadingText className='md:text-7xl sm:text-6xl text-5xl text-primary-foreground/80'>OUR BLOG</HeadingText>
        </MainPadding>
      </BackgroundImage>
    </div>
  )
}

export default Hero
