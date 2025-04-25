import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings, UserRoundCheck } from 'lucide-react'
import useAuthStore from '@/stores/authStore'


const menus = [
    {
        name: "Settings",
        icon: <Settings />,
        link: "#",
    },
    {
        name: "Another thing",
        icon: <LogOut />,
        link: "#",
    },


]

const UserDropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => setIsOpen(!isOpen)
    const logout = useAuthStore(state => state.logout)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <div className='flex gap-2 items-center'>
                    <div className='w-10 h-10 overflow-hidden rounded-full border border-foreground/20'>

                    </div>
                    <div className='flex flex-col items-start text-xs font-semibold text-foreground/80'>
                        <h1>John Doe</h1>
                        <p className='text-[10px] text-foreground/50'>Admin</p>
                    </div>
                    <ChevronDown className={`text-foreground/50 w-4 h-4 transition-all duration-500 ${isOpen ? " rotate-180" : "rotate-0"}`} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-xs">Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menus.map((menu, index) => (
                    <DropdownMenuItem key={index} className="text-xs">
                        {menu.icon}
                        <span>{menu.name}</span>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs" onClick={()=> logout()}>
                    <LogOut />
                    <span>Logout</span>
            </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropDown
