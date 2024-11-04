import React from 'react'

const Logo = ({footer}) => {
    return (
        <div className='flex gap-2 items-center text-nowrap'>
            <div className='w-10 h-10 border-gray-600 border-2 rounded-full bg-'></div>
            <div className='flex flex-col tracking-tighter'>
                <h2 className={`font-semibold text-[16px] ${footer && "text-primary-foreground"}`}>CAC Chapel Lautech</h2>
                <p className='text-gray-400 text-[12px] font-medium'>Fountain Of Divine Favour</p>
            </div>
        </div>
    )
}

export default Logo
