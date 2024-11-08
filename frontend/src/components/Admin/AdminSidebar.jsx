import React, { useState } from 'react'
import Logo from '../Navbar/Logo'
import { BookmarkCheck, LucideLayoutDashboard, SidebarCloseIcon, SidebarOpenIcon, UsersIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useSidebarStore } from '@/stores/otherStores';



const nav = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: <LucideLayoutDashboard className='w-8' />
  },
  {
    name: "Members",
    link: "/admin/members?tab=overview",
    icon: <UsersIcon className='w-8' />
  },
  {
    name: "Attendance",
    link: "/admin/attendance",
    icon: <BookmarkCheck className='w-8' />
  }
]

const AdminSidebar = () => {
  const { pathname } = useLocation()
  const isOpen = useSidebarStore(state=> state.isOpen)
  const toggleSidebar = useSidebarStore(state=> state.toggleSidebar)

  return (
    <div className={`${isOpen ? "w-[250px]" : "min-w-[60px] w-[68px]"} bg-white border border-foreground/20 h-[100vh] py-5 transition-[width] ease-in-out duration-300 sticky top-0`}>
      <div className={`flex items-center ${isOpen ? "justify-between" : "justify-end"} px-2 w-full`}>
        {isOpen && <Logo />}
        <div onClick={toggleSidebar} className='text-primary cursor-pointer '>
          {isOpen ? <SidebarCloseIcon />
            : <SidebarOpenIcon />
          }
        </div>
      </div>
      <div className='mt-10 flex flex-col space-y-1'>
        {nav.map((nav, index) => (
          <div data-tooltip-content={nav.name} key={index} className='text-foreground/60 flex flex-nowrap space-x-2 pr-2 pl-[2px] relative'>
            <span className={` w-[4px] h-full left-0 rounded-r-lg absolute ${pathname === nav.link.split("?")[0] ? "bg-primary" : ""
              }`}></span>
            <Link data-tooltip-id={`nav-${index}`} data-tooltip-content={nav.name} to={nav.link} className={`flex items-center space-x-3 font-medium rounded-lg w-full py-2 transition-all duration-500 text-sm ${pathname === nav.link.split("?")[0] ? "bg-primary text-primary-foreground" : "hover:bg-foreground/10"} ${isOpen ? "px-3" : "px-2"} `}>
              {nav.icon}
              {isOpen && <span>{nav.name}</span>}
            </Link>
          { !isOpen && <ReactTooltip id={`nav-${index}`} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
