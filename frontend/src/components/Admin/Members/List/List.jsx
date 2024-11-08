import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import Actions from './Actions'
import Table from './Table/Table'
import AddMember from './AddMember/AddMember'

const List = () => {
  return (
    <div className='flex flex-col space-y-5'>
      <div className='flex items-start justify-between'>
        <h1 className='text-lg font-semibold'>
          All Members
        </h1>
        <AddMember />
      </div>

      <div className='flex flex-col-reverse gap-5 w-full'>
        <div className='flex-grow'>
          <Table />
        </div>
        <Actions />
      </div>
    </div>
  )
}

export default List
