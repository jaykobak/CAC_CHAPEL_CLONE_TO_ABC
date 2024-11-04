import { Facebook, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const socials = [
    {
        icon: <Facebook />,
        link: "#"
    },
    {
        icon: <Twitter />,
        link: "#"
    },
    {
        icon: <Linkedin />,
        link: "#"
    },
]

const ConnectWithUs = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1>Connect With Us</h1>
      <div className='flex gap-3'>
        {socials.map(({icon, link}, index)=>(
            <Link  key={index} to={link} className='text-primary-foreground/80'>
                {icon}
            </Link>
        ))}
      </div>
    </div>
  )
}

export default ConnectWithUs
