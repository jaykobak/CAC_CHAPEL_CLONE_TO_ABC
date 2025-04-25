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
import CreateAttendanceForm from './CreateAttendanceForm'


const CreateAttendance = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='items-center px-4 py-2 text-xs'>
                        <Plus />
                        Create Attendance
                    </Button>
                </DialogTrigger>
                <DialogContent aria-describedby="create-attendance-form">
                    <DialogHeader>
                        <DialogTitle>Create New Attendance</DialogTitle>
                    </DialogHeader>
                    <CreateAttendanceForm />
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateAttendance
