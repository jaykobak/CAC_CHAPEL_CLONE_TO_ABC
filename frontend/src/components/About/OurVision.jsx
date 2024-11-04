import MainPadding from '@/layouts/MainPadding'
import React from 'react'
import BackgroundImage from '../BackgroundImage'
import img4 from "@/assets/About/img4.jfif"
import HeadingText from '../HeadingText'


const visions = [
  {
    name: "WORSHIP",
    p1: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia minus hic qui officiis? Similique dignissimos labore accusantium corporis quas doloribus voluptate quo ex amet, assumenda nemo eveniet dolores laboriosam incidunt!</p>,
    p2: <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed natus modi tempora quia consequuntur eveniet, vel expedita itaque quaerat. Quisquam, aspernatur nihil! Atque, recusandae quidem.</p>,
    img: img4,
  },
  {
    name: "DISCIPLESHIP",
    p1: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia minus hic qui officiis? Similique dignissimos labore accusantium corporis quas doloribus voluptate quo ex amet, assumenda nemo eveniet dolores laboriosam incidunt!</p>,
    p2: <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed natus modi tempora quia consequuntur eveniet, vel expedita itaque quaerat. Quisquam, aspernatur nihil! Atque, recusandae quidem.</p>,
    img: img4,
  },
  {
    name: "OUTREACH",
    p1: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia minus hic qui officiis? Similique dignissimos labore accusantium corporis quas doloribus voluptate quo ex amet, assumenda nemo eveniet dolores laboriosam incidunt!</p>,
    p2: <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed natus modi tempora quia consequuntur eveniet, vel expedita itaque quaerat. Quisquam, aspernatur nihil! Atque, recusandae quidem.</p>,
    img: img4,
  },
]

const OurVision = () => {
  return (
    <div className="flex flex-col gap-16">
      <BackgroundImage img={img4} bgClass={"bg-black/70"} className={"h-[500px] "} imgClass={"object-contain"} >
        <MainPadding className={"flex items-center justify-center"}>
          <HeadingText className={"text-5xl md:text-7xl text-primary-foreground/90"}>
            OUR VISION
          </HeadingText>
        </MainPadding>
      </BackgroundImage>

      <MainPadding className="flex flex-col gap-16">
        <div className='flex flex-col gap-5 '>
          <HeadingText className={"text-[42px]"}>
            SHARING CHRIST'S LIGHT IN A DARK WORLD
          </HeadingText>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero consectetur culpa neque doloremque blanditiis, maiores ea impedit rerum esse. Modi a quos at? Labore ducimus expedita nesciunt eum! Accusantium, quae?</p>
          <p className='text-primary font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatem ipsam, cum odio </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quia quisquam at animi corrupti temporibus, placeat blanditiis error. Reprehenderit magni sapiente dicta ab error dolorem ipsam voluptate nihil veniam illum! mollitia, esse voluptatum nostrum magni dolores officia, </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at minus <span className='text-primary font-semibold'>perspiciatis can</span> quisquam, <span className='text-primary font-semibold'>anything</span> omnis .</p>
        </div>
        {visions.map((vision, index)=>(
          <div className='flex gap-10'>
            <div className='flex flex-col gap-5 w-1/2'>
              <HeadingText className={"text-[32px]"}>{vision.name}</HeadingText>
              <p>{vision.p1}</p>
              <p className='text-primary font-semibold'>{vision.p2}</p>
            </div>
            <div className='w-1/2'>
              <img src={vision.img} alt="" className='w-full h-[300px] object-cover' />
            </div>
          </div>
        ))}
      </MainPadding>
    </div>
  )
}

export default OurVision
