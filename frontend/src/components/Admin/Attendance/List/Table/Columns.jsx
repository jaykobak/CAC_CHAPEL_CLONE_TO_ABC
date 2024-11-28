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
            const attendance = row.original
            
            return (
                <Link to={`/admin/attendance/${attendance.id}`} className="hover:text-foreground/90 uppercase font-semibold flex items-center object-cover gap-2">
                    {attendance.name}
                </Link>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => {
            const attendance = row.original

            return (
                <p className='flex gap-2 items-center'>
                    {attendance.fromTime} - {attendance.toTime}
                </p>
            )
        }
    },
    {
        accessorKey: "attendance",
        header: "Attendance Count",
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const member = row.original

            return (
                <div>
                    <ActionsDropdown member={member} />
                </div>
            )
        }
    },

]