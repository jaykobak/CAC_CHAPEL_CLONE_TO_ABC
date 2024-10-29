import React from 'react'

const SermonCard = ({ sermon }) => {
    return (
        <div className='flex flex-col gap-2 font-bold' >
            <img src={sermon.img} alt={sermon.title} className='w-full' />
            <div>
                <p className='text-foreground/60 text-[12px] '>{sermon.date} - {sermon.speaker}</p>
                <h3 className='text-foreground text-[16px] '>{sermon.title}</h3>
                <p className='text-foreground/60 text-[12px]'>{sermon.speaker}</p>
            </div>
        </div>
    )
}

export default SermonCard
