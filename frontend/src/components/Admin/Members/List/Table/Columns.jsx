import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import useMembersStore from "@/stores/membersStore";

export const columns = [
    {
        id: "select",
        header: ({ table }) => {
            const { selectedMemberIds, selectAllMembers, deselectAllMembers, members } = useMembersStore();
            const allRowsSelected = selectedMemberIds.size === members.length;

            const handleSelectAllToggle = () => {
                allRowsSelected ? deselectAllMembers() : selectAllMembers();
            };

            return (
                <Checkbox
                    checked={allRowsSelected}
                    onCheckedChange={handleSelectAllToggle}
                />
            );
        },
        cell: ({ row }) => {
            const { toggleMemberSelection, isMemberSelected } = useMembersStore();
            return (
                <Checkbox
                    checked={isMemberSelected(row.original.id)}
                    onCheckedChange={() => toggleMemberSelection(row.original.id)}
                />
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "level",
        header: "Level",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone Number",
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const member = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(member.email)}
                        >
                            Copy Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View member details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },

]