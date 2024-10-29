import HeadingText from '@/components/HeadingText'
import MainPadding from '@/layouts/MainPadding'
import React from 'react'
import img1 from "@/assets/About/img1.jpg"





const OurHistory = () => {
    return (
        <MainPadding>
            <div className='flex md:flex-row flex-col gap-10'>
                <div className='md:w-[50%] w-full flex flex-col gap-5'>
                    <HeadingText className="md:text-5xl text-4xl">OUR HISTORY</HeadingText>
                    <img src={img1} alt="" className='w-full' />
                </div>
                <div className='md:w-[50%] w-full flex flex-col gap-5'>
                    <h1 className='font-bold'>Building a church that reflect's God's love and grace</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, ullam maxime consequatur unde quis aperiam accusantium esse neque voluptas culpa hic nihil odit vero aspernatur, nulla molestiae assumenda cumque exercitationem? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi soluta harum nostrum totam, unde molestias sunt aliquam illum saepe minus, aut natus quidem qui facilis laudantium consectetur odit officia?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia praesentium architecto natus</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam molestias rerum a nostrum maxime aut sit dolor dicta, cupiditate magnam corrupti voluptate nisi saepe omnis corporis. Recusandae dignissimos consequuntur rerum?</p>
                </div>
            </div>
        </MainPadding>
    )
}

export default OurHistory
