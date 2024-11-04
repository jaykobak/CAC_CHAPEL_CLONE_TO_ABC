import AttendanceChart from '@/components/Admin/Dashboard/AttendanceChart'
import TotalMembers from '@/components/Admin/Dashboard/TotalMembers'
import TotalMembersChart from '@/components/Admin/Dashboard/TotalMembersChart'
import AdminLayout from '@/layouts/AdminLayout'
import React from 'react'

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className='flex flex-col space-y-5'>
                <div>
                    <h1 className='text-lg font-medium flex flex-col'>
                        Dashboard
                        <span className='text-xs text-foreground/50'>Overview</span>
                    </h1>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    <TotalMembers />
                    <TotalMembers />
                    <TotalMembers />
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <TotalMembersChart />
                    <AttendanceChart />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard
