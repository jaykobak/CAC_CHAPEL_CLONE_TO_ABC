import { Download, Mail, Phone } from 'lucide-react'
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

const actions = [
    {
        name: "Email Member(s)",
        icon: <Mail className='w-' />,
        dialog: <h1>This is the where u email members</h1>
    },
    {
        name: "Text Member(s)",
        icon: <Phone className='w-' />,
        dialog: <h1>This is the where u schedule events</h1>
    },
    {
        name: "Export",
        icon: <Download className='w-' />,
        dialog: <h1>This is the where u export data</h1>
    }
]

const Actions = () => {
    return (
        <div className='bg-primary/20 rounded-lg p-2'>
            <div className=' flex flex-col space-y-2'>
                {actions.map((action, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="xs" className='outline-none p-2 flex justify-start hover:bg-primary/10'>
                                {action.icon}
                                {action.name}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{action.name}</DialogTitle>
                            </DialogHeader>
                            {action.dialog}
                        </DialogContent>
                    </Dialog>

                ))}
            </div>
        </div>
    )
}

export default Actions
