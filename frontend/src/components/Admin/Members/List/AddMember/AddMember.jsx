import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddMemberForm from './AddMemberForm'


const AddMember = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='items-center px-4 py-2 text-xs'>
                        <Plus />
                        Add Member
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a new member</DialogTitle>
                    </DialogHeader>
                    <AddMemberForm />
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddMember
