import { Mail } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const NewsLetter = () => {
  return (
    <div className='flex flex-col gap'>
      <h1 className='font-bold'>Subscribe to Our Newsletter</h1>
      <h1 className='text-primary-foreground/80 text-sm'>Get the latest  news from us by subscribing</h1>
      <div className='flex gap-3 mt-3'>
        <div className='bg-white rounded-md overflow-hidden text-foreground/60 flex items-center px-3'>
            <input type="text" className='border-none outline-none bg-transparent text-[16px] py-2 w-full' placeholder='Email Address' />
            <Mail />
        </div>
        <Button className="bg-orange hover:bg-orange/90 w-fit">Subscribe</Button>
      </div>
    </div>
  )
}

export default NewsLetter
