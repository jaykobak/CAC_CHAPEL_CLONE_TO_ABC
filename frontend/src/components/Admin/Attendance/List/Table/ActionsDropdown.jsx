import { Mail, MessageCircleIcon, MoreHorizontal, PenSquare, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteMemberMutation } from "@/dataOperations/members";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AddMemberForm from "../CreateAttendance/CreateAttendanceForm";


const actions = [
    {
        name: "Email Member",
        icon: <Mail />
    },
    {
        name: "Text Member",
        icon: <MessageCircleIcon />
    },
]

const ActionsDropdown = ({ member }) => {
    const { mutate } = useDeleteMemberMutation()

    const deleteMember = (id) => {
        console.log(id)
        mutate(id)
    }
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                    <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        actions.map((action, index) => (
                            <DropdownMenuItem key={index} className="text-sm">
                                {action.icon}
                                {action.name}
                            </DropdownMenuItem>
                        ))
                    }


                    <DialogTrigger asChild>
                        <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm flex items-center" >
                            <PenSquare />
                            Edit Member
                        </DropdownMenuItem>
                    </DialogTrigger>


                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm flex items-center" onClick={() => deleteMember(member._id)}>
                        <Trash2 />
                        Delete Member
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit member details</DialogTitle>
                </DialogHeader>
                <AddMemberForm memberData={member} />
            </DialogContent>
        </Dialog>
    )
}

export default ActionsDropdown
