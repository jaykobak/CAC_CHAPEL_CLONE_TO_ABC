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

const filters = [
  {
    name: "100 Level",
    slug: "100-level",
  },
  {
    name: "200 Level",
    slug: "200-level",
  },
  {
    name: "300 Level",
    slug: "300-level",
  },
  {
    name: "400 Level",
    slug: "400-level",
  },
  {
    name: "500 Level",
    slug: "500-level",
  },
  {
    name: "Children",
    slug: "children",
  },
  {
    name: "Parents",
    slug: "parents",
  },
  {
    name: "Workers",
    slug: "workers",
  },
  {
    name: "Leaders",
    slug: "leaders",
  }
]

const SearchAndFilter = () => {
  return (
    <div className='flex space-x-4'>
      <div className='flex space-x-3 items-center border border-foreground/20 px-4 w-[300px]  rounded-lg'>
        <Search className='text-gray-400' />
        <input type="text" className='outline-none border-none py-2 bg-transparent w-full text-sm' placeholder='Search Member' />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <button className='px-3 py-2 bg-orange/80 flex space-x-2 items-center text-primary-foreground text-sm rounded-lg'>
            <Settings2Icon className='w-4 h-4' />
            <span>Filters</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="grid grid-cols-3 mr-4">
          {filters.map((filter, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <DropdownMenuItem className="w-full text-foreground/70">
                  {/* <Filter /> */}
                  <DropdownMenuLabel className="text-xs">{filter.name}</DropdownMenuLabel>
                </DropdownMenuItem>
                {(index + 1) % 3 != 0 && <span className='text-foreground/20'>|</span>}
              </div>
              {(index+1) != filters.length && <DropdownMenuSeparator />}
            </div>
          ))}

        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default SearchAndFilter
