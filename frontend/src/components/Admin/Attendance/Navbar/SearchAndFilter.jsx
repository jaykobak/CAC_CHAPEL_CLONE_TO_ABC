import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, Search, Settings2Icon } from 'lucide-react'

const SearchAndFilter = () => {
  return (
    <div className='flex space-x-4 py-3'>
      <div className='flex space-x-3 items-center border border-foreground/20 px-4 w-full md:w-[300px]  rounded-lg'>
        <Search className='text-gray-400' />
        <input type="text" className='outline-none border-none py-2 bg-transparent w-full text-sm' placeholder='Search Attendance' />
      </div>
    </div>
  )
}

export default SearchAndFilter
