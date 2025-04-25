import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

const tabs = [
    {
        name: "Unmarked",
        slug: "unmarked",
    },

    {
        name: "Marked",
        slug: "marked",
    }
]

const Navbar = () => {
    const { pathname } = useLocation()
    const [ searchParams ] = useSearchParams()
    const currentTab = searchParams.get("tab")
  return (
    <div className='flex space-x-6 items-center px-6 border-b'>
      {tabs.map((tab, index) => (
        <Link key={index} to={`${pathname}?tab=${tab.slug}`} className={cn("h-14 flex items-center relative", currentTab===tab.slug && "text-primary"  )}>
            {tab.name}
            <span className={cn('absolute top-[100%] right-0 w-full h-[1.5px] rounded-full', currentTab===tab.slug && "bg-primary")}></span>
        </Link>
      ))}
    </div>
  )
}

export default Navbar
