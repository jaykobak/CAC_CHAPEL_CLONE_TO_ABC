import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img1 from "../../assets/Home/Welcome/img1.jfif"
import img2 from "../../assets/Home/Welcome/img2.jfif"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

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
                        
                        <h1 className='md:text-5xl text-3xl font-cinzel'>WELCOME TO OUR <br /> CHURCH</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, eius inventore dolorum ad obcaecati atque officia quo unde, tenetur culpa dicta tempore, sed exercitationem delectus accusantium cupiditate deleniti animi voluptatem.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus repellendus sit, nisi architecto nihil libero, ipsam pariatur facilis sint cumque illum, culpa repellat eos dolorum maxime natus iure laudantium dolor.</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis libero consequatur, velit nihil quibusdam deserunt quos nobis </p>
                        <Button className="flex gap-2 items-center px-6 mt-6 w-full sm:w-fit">Learn More About Our Values <ArrowRight /> </Button>
                    </div>
                </div>
                <div className='h-[640px] min-w-[30%] hidden md:block'>
                    <img src={img2} alt="" className='w-full h-full rounded-tr-[150px] object-cover z-0'/>
                </div>
            </div>
        </MainPadding>
    )
}

export default Welcome
