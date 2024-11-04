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


const UserDropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => setIsOpen(!isOpen)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <div  className='flex gap-2 items-center'>
                    <div className='w-10 h-10 overflow-hidden rounded-full border border-foreground/20'>

                    </div>
                    <div className='flex flex-col items-start text-sm font-semibold text-foreground/80'>
                        <h1>John Doe</h1>
                        <p className='text-[10px] text-foreground/50'>Admin</p>
                    </div>
                    <ChevronDown className={`text-foreground/50 transition-all duration-500 ${isOpen ? " rotate-180" : "rotate-0"}`} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <UserRoundCheck />
                    Other Admins
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropDown
