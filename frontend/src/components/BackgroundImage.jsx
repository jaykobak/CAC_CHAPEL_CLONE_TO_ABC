import React from 'react'

const BackgroundImage = ({children, img, className, imgClass, bgClass}) => {
    return (
        <div className='relative h-full w-full '>
            <div className='absolute top-0 left-0 h-full w-full'>
                <img src={img} alt="" n className={`absolute top-0 left-0 w-full h-full object-cover  ${imgClass}`} />
                <div className={`absolute h-full w-full top-0 left-0 z-10 ${bgClass}`}></div>
            </div>
            <div className={`relative z-10 ${className}`}>{children}</div>
        </div>
    )
}

export default BackgroundImage
