import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import Actions from './Actions/Actions'
import Table from './Table/Table'
import CreateAttendance from './CreateAttendance/CreateAttendance'

const List = () => {
  return (
    <div className='flex flex-col space-y-5'>
      <div className='flex items-start justify-between'>
        <h1 className='text-lg font-semibold'>
          All Attendance
        </h1>
        <CreateAttendance />
      </div>

      <div className='flex flex-col-reverse gap-5 w-full'>
        <div className='flex-grow'>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default List
