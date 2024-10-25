import React from 'react'
import herobg from "../../assets/herobg.jpg"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import MainPadding from '../../layouts/MainPadding'

const Hero = () => {
    return (
        <div className='h-[600px] relative'>
            <div className='h-full w-full absolute hero-bg flex items-center'>
                <MainPadding>
                    <div className='relative flex flex-col justify-center gap-5 z-10 items-start h-full'>
                        <h1 className='font-cinzel text-6xl text-primary-foreground/90 font-thin'>
                            <span className='text-[70px]'>A</span> COMMUNITY OF <br /> <span className='text-[70px]'>F</span>AITH, HOPE, AND <br /> <span className='text-[70px]'>L</span>OVE
                        </h1>
                        <p className='text-primary-foreground/80 font-medium'>
                            We believe that everyone is invited to experience God's grace, and that
                            <br /> means you! Our Church is a place where you can connect with others who
                            <br /> share values and beliefs, and where you can grow in your relationship
                            <br /> with God.
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
