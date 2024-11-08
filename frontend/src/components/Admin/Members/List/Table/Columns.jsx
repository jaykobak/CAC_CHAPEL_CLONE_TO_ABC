import { ArrowUpRight, Mail, MessageCircleIcon, MoreHorizontal, Phone, Trash2 } from "lucide-react"
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
import { Link } from "react-router-dom";

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
        cell: ({ row }) => {
            const member = row.original

            return (
                <Link to={`/admin/members/${member.id}`} className="hover:text-foreground/90 font-semibold flex items-center object-cover gap-2">
                    <img src={member.img} alt="" className="w-10 h-10 border rounded-lg" />
                    {member.name}
                </Link>
            )
        }
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem> <Mail /> Email member  </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem> <MessageCircleIcon /> Text member  </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem> <Trash2 /> Delete member  </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },

]