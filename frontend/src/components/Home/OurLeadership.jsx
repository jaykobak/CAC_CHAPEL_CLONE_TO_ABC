import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img from "../../assets/Home/leadership.jpeg"
import BackgroundImage from '../BackgroundImage'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const OurLeadership = () => {
  return (
    <MainPadding>
        <div className='min-h-[550px] relative p-10 flex'>
            <BackgroundImage img={img} imgClass={`object-top`}  />
            <div className='w-[33%] text-primary-foreground/90 flex flex-col gap-5 relative z-10'>
                <h1 className='font-bold'>Our Leadership</h1>
                <h1 className='font-cinzel text-7xl'>PASTOR OGUNSIJI</h1>
                <p className='font-medium'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eos tenetur ea eaque corporis cupiditate distinctio sapiente provident cum officiis, iste ratione minus deserunt eveniet harum? Doloremque adipisci deserunt velit.</p>
                <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
            </div>
        </div>
    </MainPadding>
  )
}

export default OurLeadership
