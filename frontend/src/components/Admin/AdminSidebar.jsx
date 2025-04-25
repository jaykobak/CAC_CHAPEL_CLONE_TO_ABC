import React, { useEffect, useState } from 'react'
import Logo from '../Navbar/Logo'
import { BookmarkCheck, LucideLayoutDashboard, SidebarCloseIcon, SidebarOpenIcon, UsersIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useSidebarStore } from '@/stores/otherStores';



const nav = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <LucideLayoutDashboard className='w-8' />,
    slug: "dashboard",
  },
  {
    name: "Members", 
    link: "/admin/members?tab=overview",
    icon: <UsersIcon className='w-8' />,
    slug: "members",
  },
  {
    name: "Attendance",
    link: "/admin/attendance",
    icon: <BookmarkCheck className='w-8' />,
    slug: "attendance",
  }
]

const AdminSidebar = () => {
  const { pathname } = useLocation()
  const isOpen = useSidebarStore(state => state.isOpen)
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar)
  const initializeSidebar = useSidebarStore(state => state.initializeSidebar)

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth > 1023;
      initializeSidebar(isLargeScreen);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeSidebar]);

  return (
    <div className={`${isOpen ? "left-0 w-[250px]" : "left-[-260px] lg:w-[68px]"} bg-white border border-foreground/20 h-[100vh] py-5 transition-all ease-in-out duration-300 fixed z-40 bottom-0 left-0 lg:sticky top-0`}>
      <div className={`flex items-center ${isOpen ? "justify-between" : "justify-end"} px-2 w-full`}>
        {isOpen && <Logo className={"scale-90"} />}
        <div onClick={toggleSidebar} className='text-primary cursor-pointer '>
          {isOpen ? <SidebarCloseIcon />
            : <SidebarOpenIcon />
          }
        </div>
      </div>
      <div className='mt-10 flex flex-col space-y-1'>
        {nav.map((nav, index) => (
          <div data-tooltip-content={nav.name} key={index} className='text-foreground/60 flex flex-nowrap space-x-2 pr-2 pl-[2px] relative'>
            <span className={` w-[4px] h-full left-0 rounded-r-lg absolute ${pathname.split("/")[2] === nav.slug ? "bg-primary" : ""
              }`}></span>
            <Link data-tooltip-id={`nav-${index}`} data-tooltip-content={nav.name} to={nav.link} className={`flex items-center space-x-3 font-medium rounded-lg w-full py-2 transition-all duration-500 text-sm ${pathname.split("/")[2] === nav.slug ? "bg-primary text-primary-foreground" : "hover:bg-foreground/10"} ${isOpen ? "px-3" : "px-2"} `}>
              {nav.icon}
              {isOpen && <span>{nav.name}</span>}
            </Link>
            {!isOpen && <ReactTooltip id={`nav-${index}`} className='z-[9999]' />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
