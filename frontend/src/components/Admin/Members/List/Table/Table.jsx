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


const Table = () => {
    const {
        members,
        setMembers
    } = useMembersStore();
    const { data, error, isLoading } = useGetMembersQuery()

    console.log(error)

    useEffect(() => {
        setMembers(data?.data)
    }, [data, isLoading])

    return (
        <div className='w-full'>
            {!isLoading && <DataTable columns={columns} data={data?.data} />}
            {isLoading && (
                <div className='flex justify-center h-40 items-center'>
                    <Loader className={"border-primary"} />
                </div>
            ) }
        </div>
    )
}

export default Table
