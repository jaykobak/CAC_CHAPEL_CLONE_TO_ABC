import React from 'react'

const BackgroundImage = ({ img, className, imgClass }) => {
    return (
        <div className='absolute h-full w-full top-0 left-0'>
            <div className='relative h-full w-full'>
                <img src={img} alt="" n className={`absolute top-0 left-0 w-full h-full object-cover  ${imgClass}`} />
                <div className={`absolute h-full w-full top-0 left-0 z-10 ${className}`}></div>
            </div>
        </div>
    )
}

export default BackgroundImage
