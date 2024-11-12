import { ChevronsUpDown, Download, Mail, MessageCircleIcon, Phone, Trash2 } from 'lucide-react'
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import EmailMembers from './EmailMembers'

const actions = [
    {
        name: "Email Member(s)",
        icon: <Mail className='w-' />,
        dialog: <EmailMembers />
    },
    {
        name: "Text Member(s)",
        icon: <MessageCircleIcon />,
        dialog: <h1>This is the where u schedule events</h1>
    },
    {
        name: "Export",
        icon: <Download  />,
        dialog: <h1>This is the where u export data</h1>
    },
    {
        name: "Delete Member(s)",
        icon: <Trash2 />,
        dialog: <h1>This is the where u delete members</h1>
    }
]

const Actions = () => {
    return (
        <div className=''>
            <Collapsible className=''>
                <CollapsibleTrigger className=' [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-sm flex justify-between items-center w-full border rounded-lg px-3 py-2'>
                    Actions
                    <ChevronsUpDown />
                </CollapsibleTrigger>
                <CollapsibleContent className='mt-2'>
                    <div className=' flex flex-col space-y-2 bg-primary/20 rounded-lg p-2'>
                        {actions.map((action, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="xs" className='outline-none px-3 py-2 flex justify-start hover:bg-primary/10 transition'>
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
                </CollapsibleContent>
            </Collapsible>

        </div>
    )
}

export default Actions
