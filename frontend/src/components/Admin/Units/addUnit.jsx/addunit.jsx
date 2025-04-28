import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddUnitForm from './addUnitform'

const AddMember = ({ refetch }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='items-center px-4 py-2 text-xs'>
          <Plus />
          Add Unit
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby='add-member-form'>
        <DialogHeader>
          <DialogTitle>Add a new Unit</DialogTitle>
        </DialogHeader>
        <AddUnitForm refetch={refetch} />
      </DialogContent>
    </Dialog>
  )
}

export default AddMember
