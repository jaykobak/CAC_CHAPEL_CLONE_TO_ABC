import React, { useRef } from 'react'
import SermonsCarousel from '../Sermons/SermonsCarousel'
import img from "../../assets/Home/Welcome/img2.jfif"


const sermons = [
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    },
    {
        title: 'The Power of God in Your Life',
        date: 'July 15, 2022',
        speaker: 'John Doe',
        img: img,
    }
]

const LatestSermons = () => {
    return (
        <div>
            <SermonsCarousel sermons={sermons} heading="LATEST SERMONS FROM CAC CHAPEL FOUNTAIN OF DIVINE FAVOUR" button={true} />
        </div>
    )
}

export default LatestSermons
