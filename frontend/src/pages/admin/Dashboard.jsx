import AttendanceChart from '@/components/Admin/Dashboard/AttendanceChart'
import TotalMembers from '@/components/Admin/Dashboard/TotalMembers'
import TotalMembersChart from '@/components/Admin/Dashboard/TotalMembersChart'
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import React from 'react'

const Dashboard = () => {
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
                        <TotalMembers />
                        <TotalMembers />
                        <TotalMembers />
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
