import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img from "../../assets/Home/leadership.jpeg"
import BackgroundImage from '../BackgroundImage'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import HeadingText from '../HeadingText'

const OurLeadership = () => {
  return (
    <MainPadding>
      <BackgroundImage img={img} imgClass={`object-top`} className="md:min-h-[550px] h-[300px]">
        <div className='w-[33%] text-primary-foreground/90  p-10 md:flex flex-col gap-5 relative z-10 hidden '>
          <h1 className='font-bold'>Our Leadership</h1>
          <HeadingText className='font-cinzel text-7xl'>PASTOR OGUNSIJI</HeadingText>
          <p className='font-medium'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eos tenetur ea eaque corporis cupiditate distinctio sapiente provident cum officiis, iste ratione minus deserunt eveniet harum? Doloremque adipisci deserunt velit.</p>
          <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
        </div>
      </BackgroundImage>
      <div className=' text-foreground/90 flex flex-col gap-5 relative z-10 md:hidden mt-5'>
        <h1 className='font-bold text-primary'>Our Leadership</h1>
        <h1 className='font-cinzel text-5xl'>PASTOR OGUNSIJI</h1>
        <p className='font-medium'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et eos tenetur ea eaque corporis cupiditate distinctio sapiente provident cum officiis, iste ratione minus deserunt eveniet harum? Doloremque adipisci deserunt velit.</p>
        <Button className="bg-orange hover:bg-orange/90 w-fit">Learn More <ArrowRight /> </Button>
      </div>
    </MainPadding>
  )
}

export default OurLeadership
