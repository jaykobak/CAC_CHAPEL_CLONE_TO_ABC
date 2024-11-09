import { Search, SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react'
import React from 'react'
import RealTimeClock from './RealTimeClock'
import UserDropDown from './UserDropDown'
import { useSidebarStore } from '@/stores/otherStores'
import { Button } from '@/components/ui/button'


const Navbar = () => {
    const isOpen = useSidebarStore(state => state.isOpen)
    const toggleSidebar = useSidebarStore(state => state.toggleSidebar)
    return (
        <nav className='py-4 border-b border-foreground/20 px-5 bg-white z-10 sticky top-0 '>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div onClick={toggleSidebar} className='text-primary cursor-pointer block lg:hidden'>
                        {isOpen ? <SidebarCloseIcon />
                            : <SidebarOpenIcon />
                        }
                    </div>
                    <div className=' hidden md:flex space-x-3 items-center bg-foreground/10 px-4 w-[300px]  rounded-lg'>
                        <Search className='text-gray-400' />
                        <input type="text" className='outline-none border-none py-2 bg-transparent w-full text-sm' placeholder='Search' />
                    </div>
                    <Button variant="ghost" className="rounded-full border sm:hidden">
                        <Search />
                    </Button>
                </div>
                <RealTimeClock />
                <UserDropDown />
            </div>
        </nav>
    )
}

export default Navbar
