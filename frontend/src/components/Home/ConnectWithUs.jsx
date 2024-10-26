import React from 'react'
import img from "../../assets/Home/hand.jfif"
import BackgroundImage from '../BackgroundImage'
import { Button } from '../ui/button'
import MainPadding from '../../layouts/MainPadding'

const ConnectWithUs = () => {
  return (
    <div className='relative h-[450px] md:min-h-[300px]'>
      <BackgroundImage img={img} className="bg-black/60" />
      <MainPadding className="h-full">
        <div className='relative z-10 flex flex-col gap-5 items-center justify-center h-full'>
          <h1 className='text-primary-foreground/80 font-cinzel text-[43px] leading-tight md:text-5xl text-center w-full'>WE ARE ALWAYS HERE FOR YOU</h1>
          <p className='text-primary-foreground text-center'>Have a prayer need? Whatever your challenge is, we are here to pray, encourage and stand in faith with you</p>
          <Button className="bg-orange hover:bg-orange/90 px-8 mt-10 w-fit">Connect With Us</Button>
        </div>
      </MainPadding>
    </div>
  )
}

export default ConnectWithUs
