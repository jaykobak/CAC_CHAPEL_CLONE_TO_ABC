import React, { useState, useEffect } from 'react'

const RealTimeClock = () => {
    const [time, setTime] = useState("")

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        })

        return () => clearInterval(timer)
    }, [])



    return (
        <div>
            <h1 className='text-4xl text-foreground/40 hidden md:flex items-start gap-1 '>
                {time.split(" ")[0]}
                <span className='text-sm text-foreground/70 font-semibold'>{time.split(" ")[1]}</span>
            </h1>
        </div>
    )
}

export default RealTimeClock
