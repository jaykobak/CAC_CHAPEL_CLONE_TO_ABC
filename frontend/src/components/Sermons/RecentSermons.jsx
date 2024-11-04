import React from 'react'
import SermonsCarousel from './SermonsCarousel'
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

const RecentSermons = () => {
  return (
    <div>
      <SermonsCarousel name={"Recent Sermons"} sermons={sermons} heading={"FRESH INSIGHTS AND INSPIRATION"} />
    </div>
  )
}

export default RecentSermons
