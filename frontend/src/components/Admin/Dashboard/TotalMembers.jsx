import React from 'react'
import Overview from './Overview'
import { UsersIcon } from 'lucide-react'


const TotalMembers = () => {
  return (
    <div>
      <Overview name={"Total Members"} color="bg-yellow-100 text-yellow-500" icon={<UsersIcon className='w-8 h-8' />} data={1234} />
    </div>
  )
}

export default TotalMembers
