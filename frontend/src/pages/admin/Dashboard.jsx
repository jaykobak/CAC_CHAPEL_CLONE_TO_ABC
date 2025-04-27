import AttendanceChart from '@/components/Admin/Dashboard/AttendanceChart'
import Overview from '@/components/Admin/Dashboard/Overview'
import TotalMembers from '@/components/Admin/Dashboard/TotalMembers'
import TotalMembersChart from '@/components/Admin/Dashboard/TotalMembersChart'
import { useGetTotalMembersAnalytics } from '@/dataOperations/analytics'
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import { UsersIcon } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
    const { data, isLoading } = useGetTotalMembersAnalytics()
    const totalData = data?.success
    console.log('...............', data)
    return (
        <AdminLayout>
            <AdminPadding className={`bg-neutral-100 h-full`}>
                <div className='flex flex-col space-y-5 '>
                    <div>
                        <h1 className='text-lg font-medium flex flex-col'>
                            Dashboard
                            <span className='text-xs text-foreground/50'>Overview</span>
                        </h1>
                    </div>
                    <div className='grid grid-cols-1  md:grid-cols-3 sm:grid-cols-2 gap-5'>
                        <div>
                            <Overview name={"Total Members"} color="bg-yellow-100 text-yellow-500" icon={<UsersIcon className='w-8 h-8' />} data={data?.data?.totalMembers} />
                        </div>
                        <div>
                            <Overview name={"Total Units"} color="bg-yellow-100 text-yellow-500" icon={<UsersIcon className='w-8 h-8' />} data={data?.data?.totalUnits} />
                        </div>
                        <div>
                            <Overview name={"Total Present"} color="bg-yellow-100 text-yellow-500" icon={<UsersIcon className='w-8 h-8' />} data={0} />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <TotalMembersChart />
                        <AttendanceChart />
                    </div>
                </div>
            </AdminPadding>
        </AdminLayout>
    )
}

export default Dashboard
