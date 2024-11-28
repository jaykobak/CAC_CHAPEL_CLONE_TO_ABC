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
import { useDeleteMemberMutation } from "@/dataOperations/members";
import apiClient from "@/services/api/apiClient";
import ActionsDropdown from "./ActionsDropdown";



export const columns = [
    {
        id: "select",
        header: ({ table }) => {
            const { selectedMemberIds, selectAllMembers, deselectAllMembers, members } = useMembersStore.getState();
            const allRowsSelected = selectedMemberIds.size === members?.length;

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
                    checked={isMemberSelected(row.original._id)}
                    onCheckedChange={() => toggleMemberSelection(row.original._id)}
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
                <Link to={`/admin/members/${member.id}`} className="hover:text-foreground/90 uppercase font-semibold flex items-center object-cover gap-2">
                    {/* <img src={member.img} alt="" className="w-10 h-10 border rounded-lg" /> */}
                    {member.firstname} {member.lastname}
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
                <div>
                    <ActionsDropdown member={member}  />
                </div>
            )
        }
    },

]