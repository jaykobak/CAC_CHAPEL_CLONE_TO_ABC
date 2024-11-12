import React, { useState } from 'react'
import Logo from './Logo'
import { Button } from '../ui/button'
import MainPadding from '../../layouts/MainPadding'
import { Link, useLocation } from 'react-router-dom'
import { Menu, SidebarClose, X } from 'lucide-react'

const navs = [
    {
        name: "Home",
        link: "/",
        slug: "home",
    },
    {
        name: "About Us",
        link: "/about-us",
        slug: "about",
    },
    {
        name: "Sermons",
        link: "/sermons",
        slug: "sermons",
    },
    {
        name: "Blog",
        link: "/blog",
        slug: "blog",
    },
    {
        name: "Give",
        link: "#give",
        slug: "give",
    }
]

const Navbar = () => {
    const { pathname } = useLocation()
    const [showNav, setShowNav] = useState(false)

    const openNav = () => setShowNav(true)
    const closeNav = () => setShowNav(false)

    return (
        <div className='flex justify-between items-center py-3 text-foreground md:px-6 lg:px-16 px-3 sticky top-0 right-0 z-50 bg-background border-b'>
            <Logo />
            <nav className='items-center gap-10 hidden lg:flex'>
                {navs.map(({ name, link, slug }) => (
                    <Link to={link} key={slug} className={`font-bold text-sm hover:text-primary ${pathname === link ? 'text-primary' : 'text-foreground/60'
                        }`}
                    >
                        {name}
                    </Link>
                ))}
            </nav>
            <Button className="hidden lg:block">Contact Us</Button>
           

            <Menu onClick={openNav} className='w-10 h-10 text-primary lg:hidden' />

            <div className={`fixed flex flex-col gap-5 right-0 top-0 h-screen w-full sm:w-[300px] bg-background shadow-xl backdrop-blur-sm z-50 px-10 py-5 transition-all duration-500 ${
                showNav? 'right-0 opacity-100' : 'right-[-450px] opacity-0'
            }`}>
                <X onClick={closeNav} className='w-10 h-10 text-primary' />
                {navs.map(({ name, link, slug }) => (
                    <Link to={link} key={slug} className={`font-bold w-fit hover:text-primary text-[20px] ${pathname.includes(link) ? 'text-primary' : 'text-foreground/60'
                        }`}
                    >
                        {name}
                    </Link>
                ))}
                <Button className="px-8">Contact Us</Button>
            </div>
        </div>
    )
}

export default Navbar
