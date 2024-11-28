import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect } from 'react'
import img from "@/assets/herobg.jpg"
import { columns } from './Columns'
import DataTable from './DataTable'
import { useGetMembersQuery } from '@/dataOperations/members'
import useMembersStore from '@/stores/membersStore'
import ClipLoader from "react-spinners/ClipLoader";
import { RingLoader } from 'react-spinners'
import Loader from '@/components/Loader'
import { Skeleton } from "@/components/ui/skeleton"

const attendanceData = [
    {
        id: 1, 
        name: "LAST SUNDAY",
        date: "21th November, 2024",
        fromTime: "5:00PM",
        toTime: "7:00PM",
        attendance: 90,
    },
    {
        id: 1, 
        name: "LAST SUNDAY",
        date: "21th November, 2024",
        fromTime: "5:00PM",
        toTime: "7:00PM",
        attendance: 90,
    },
    {
        id: 1, 
        name: "LAST SUNDAY",
        date: "21th November, 2024",
        fromTime: "5:00PM",
        toTime: "7:00PM",
        attendance: 90,
    },
    {
        id: 1, 
        name: "LAST SUNDAY",
        date: "21th November, 2024",
        fromTime: "5:00PM",
        toTime: "7:00PM",
        attendance: 90,
    },
    {
        id: 1, 
        name: "LAST SUNDAY",
        date: "21th November, 2024",
        fromTime: "5:00PM",
        toTime: "7:00PM",
        attendance: 90,
    },
    {
        id: 1, 
        name: "LAST SUNDAY",
        date: "21th November, 2024",
        fromTime: "5:00PM",
        toTime: "7:00PM",
        attendance: 90,
    },
]


const Table = () => {
    const {
        setMembers,
        selectedMemberIds
    } = useMembersStore();
    const { data, isLoading } = useGetMembersQuery()

    useEffect(() => {
        setMembers(data?.data)
    }, [data, isLoading])

    return (
        <div className='w-full'>
            {!isLoading && <DataTable columns={columns} data={attendanceData || []} selected={selectedMemberIds} />}
            {isLoading && (
                <div className='flex justify-center flex-col space-y-2 h-full w-full'>
                    <div className='flex justify-between items-center'>
                        <Skeleton className="w-[200px] h-[20px] rounded-md" />
                        <Skeleton className="w-[100px] h-[30px] rounded-md" />
                    </div>

                    {Array.from({ length: 15 }).map((index) => (
                        <Skeleton key={index} className="w-full h-[40px] rounded-md" />
                    ))}

                </div>
            )}
        </div>
    )
}

export default Table
