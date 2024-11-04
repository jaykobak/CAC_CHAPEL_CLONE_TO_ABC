import React from 'react'
import img2 from "@/assets/About/img2.jpg"
import img3 from "@/assets/About/img3.jpg"
import img4 from "@/assets/About/img4.jfif"
import img5 from "@/assets/About/img5.jfif"
import HeadingText from '../HeadingText'
import { Button } from '../ui/button'
import MainPadding from '@/layouts/MainPadding'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'


const coreStatements = [
  {
    name: "OUR MISSION",
    description: "Read more about our mission to lift up the name of Jesus",
    img: img2,
    link: "/about-us?core=our-mission"
  },
  {
    name: "OUR VALUES",
    description: "Discover the core values that defines us at CAC Chapel Lautech. Explore more here",
    img: img3,
    link: "/about-us?core=our-values"
  },
  {
    name: "OUR VISION",
    description: "Discover our visions and what drives us at CAC Chapel Lautech. Learn more here",
    img: img4,
    link: "/about-us?core=our-vision"
  },
  {
    name: "OUR LEADERSHIP",
    description: "Discover our visions and what drives us at CAC Chapel Lautech. Learn more here",
    img: img5,
    link: "/about-us?core=our-leadership"
  },

]

const Cores = () => {
  return (
    <MainPadding className='flex flex-col gap-20'>
      {
        coreStatements.map(({ name, description, img, link }, index) => (
          <div key={index} className='flex md:flex-row flex-col md:even:flex-row-reverse  gap-10'>
            <div className='md:w-[50%] w-full flex flex-col gap-5  justify-center '>
              <HeadingText className="text-4xl">{name}</HeadingText>
              <p>{description}</p>
              <Link to={link}>
                <Button className={`w-fit ${index % 2 === 1 ? 'bg-orange hover:bg-orange/90' : ''}`}>{name} <ArrowRight /> </Button>
              </Link>
            </div>
            <div className='md:w-[50%] w-full '>
              <img src={img} alt="" className='w-full h-auto md:h-[400px] object-cover' />
            </div>
          </div>
        ))
      }
    </MainPadding>
  )
}

export default Cores
