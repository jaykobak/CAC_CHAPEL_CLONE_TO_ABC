import React from 'react'
import { Link } from 'react-router-dom'

const links = [
    {
        name: "Home",
        link: "#"
    },
    {
        name: "About Us",
        link: "#"
    },
    {
        name: "Information Center",
        link: "#"
    },
    {
        name: "Events",
        link: "#"
    },
    {
        name: "Give",
        link: "#"
    },
]


const QuickLinks = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-bold '>Quick Links</h1>
      {links.map(({name, link}, index)=>(
        <Link to={link} key={index} className='text-sm text-primary-foreground/80'>{name}</Link>
      ))}
    </div>
  )
}

export default QuickLinks
