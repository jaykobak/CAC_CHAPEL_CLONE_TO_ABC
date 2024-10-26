import React from 'react'
import MainPadding from '../../layouts/MainPadding'
import img1 from "../../assets/Home/WhyJoinUs/img1.jpg"
import BackgroundImage from '../BackgroundImage'


const whys = [
    {
        title: "A PLACE TO PRAY",
        description: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur fuga enim consectetur doloremque, inventore possimus magnam optio ducimus expedita maxime veniam laboriosam officiis totam eaque porro neque at alias! Deserunt!</p>,
        img: img1,
        bg: "#1D0000"
    },
    {
        title: "A PLACE TO WORSHIP",
        description: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur fuga enim consectetur doloremque, inventore possimus magnam optio ducimus expedita maxime veniam laboriosam officiis totam eaque porro neque at alias! Deserunt!</p>,
        img: img1,
        bg: "#4F3004"
    },
    {
        title: "A PLACE TO TO CALL HOME",
        description: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur fuga enim consectetur doloremque, inventore possimus magnam optio ducimus expedita maxime veniam laboriosam</p>,
        img: img1,
        bg: "#115849"
    }
]

const WhyJoinUs = () => {
    return (
        <MainPadding>
            <div>
                <div className='flex flex-col gap-5 items-center'>
                    <h1 className='text-sm text-primary font-bold'>Why you should join us</h1>
                    <h1 className='sm:text-5xl text-[32px] leading-tight font-cinzel text-center text-foreground'>EMBARK ON A JOURNEY OF FAITH AND SERVICE WITH US</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
                    {whys.map(({ title, description, img, bg }, index) => (
                        <div key={index} className='relative min-h-[250px] flex flex-col'>
                            <BackgroundImage img={img} className={`${
                                    index === 0 ? "bg-[#1D0000]/85"
                                    : index === 1? "bg-[#4F3004]/85"
                                    : "bg-[#115849]/85"
                                }`} />
                            <div className='relative z-10 flex flex-col items-center justify-center text-primary-foreground/80 p-6 px-3 text-center gap-4'>
                                <h1 className='font-cinzel text-2xl'>{title}</h1>
                                <p>{description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </MainPadding>
    )
}

export default WhyJoinUs
