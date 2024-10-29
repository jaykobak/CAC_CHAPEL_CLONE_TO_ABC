import React, { useRef } from 'react'
import MainPadding from '../../layouts/MainPadding'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import HeadingText from '../HeadingText'
import SermonCard from '../Sermons/SermonCard'

const SermonsCarousel = ({ sermons, heading, name, useName, button }) => {
    const sermonsRef = useRef()

    const scrollToRight = () => {
        sermonsRef.current.scrollTo({
            left: sermonsRef.current.scrollLeft + 300,
            behavior: "smooth",
        });
    }

    const scrollToLeft = () => {
        sermonsRef.current.scrollTo({
            left: sermonsRef.current.scrollLeft - 300,
            behavior: "smooth",
        });
    }

    return (
        <MainPadding className={`pr-0`}>
            <div className='flex gap-20 flex-col md:flex-row'>
                <div className='flex flex-col gap-5 md:w-[300px] w-full text-wrap'>
                    {name && <p className='text-primary font-bold'>{name}</p>}
                    <HeadingText className='text-foreground md:text-4xl text-3xl font-cinzel'>{heading}</HeadingText>
                    {button && <Button variant="outline" className="text-foreground border-foreground gap-2 bg-background hover:bg-background w-fit px-6 hidden md:flex"> See more <ArrowRight /> </Button>}
                </div>
                <div className='flex flex-grow flex-col gap-6 overflow-hidden'>
                    <div ref={sermonsRef} className='flex overflow-hidden overflow-x-scroll gap-10 hide-scrollbar pr-3'>
                        {sermons.map((sermon, index) => (
                            <div key={index} className='min-w-[400px]' >
                                <SermonCard sermon={sermon} />
                            </div>
                        ))}
                    </div>
                    <div className='flex self-center md:self-end md:pr-24'>
                        <Button variant={`icon`} className="text-foreground" onClick={scrollToLeft}> <ArrowLeft /> </Button>
                        <Button variant={`icon`} className="text-foreground" onClick={scrollToRight}> <ArrowRight /> </Button>
                    </div>
                    {button && <Button variant="outline" className="text-foreground border-foreground bg-background hover:bg-background w-fit px-6 self-center md:hidden"> See more <ArrowRight /> </Button>}
                </div>
            </div>
        </MainPadding>
    )
}

export default SermonsCarousel
