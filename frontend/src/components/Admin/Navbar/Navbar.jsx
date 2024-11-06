import { Search } from 'lucide-react'
import React from 'react'
import RealTimeClock from './RealTimeClock'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserDropDown from './UserDropDown'
  

const Navbar = () => {
    return (
        <nav className='py-4 border-b border-foreground/20 px-5 bg-white z-50 sticky top-0'>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-3 items-center bg-foreground/10 px-4 w-[300px]  rounded-lg'>
                    <Search className='text-gray-400' />
                    <input type="text" className='outline-none border-none py-2 bg-transparent w-full text-sm' placeholder='Search' />
                </div>
                <RealTimeClock />
                <UserDropDown />
            </div>
        </nav>
    )
}

export default Navbar
