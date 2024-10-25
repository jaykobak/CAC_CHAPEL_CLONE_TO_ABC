import React from 'react'
import Logo from './Logo'
import { Button } from '../ui/button'
import MainPadding from '../../layouts/MainPadding'
import { Link, useLocation } from 'react-router-dom'

const navs = [
    {
        name: "Home",
        link: "/",
        slug: "home",
    },
    {
        name: "About Us",
        link: "/about",
        slug: "about",
    },
    {
        name: "Events",
        link: "#events",
        slug: "events",
    },
    {
        name: "Sermons",
        link: "#sermons",
        slug: "sermons",
    },
    {
        name: "Blog",
        link: "#blog",
        slug: "blog",
    },
    {
        name: "Give",
        link: "#give",
        slug: "give",
    }
]

const Navbar = () => {
    const {pathname} = useLocation()
    return (
            <div className='flex justify-between items-center py-3 text-foreground px-16 '>
                <Logo />
                <nav className='flex items-center gap-10'>
                    {navs.map(({ name, link, slug }) => (
                        <Link to={link} key={slug} className={`font-bold hover:text-primary ${
                            pathname === link ? 'text-primary' : 'text-foreground/60'
                        }`}
                        >
                            {name}
                        </Link>
                    ))}
                </nav>
                <Button>Contact Us</Button>
            </div>
    )
}

export default Navbar
