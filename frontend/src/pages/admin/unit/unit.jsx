
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import { useSearchParams } from 'react-router-dom'
import Filter from '@/components/Admin/Units/Navbar/SearchAndFilter'  
import React from 'react'
import List from '@/components/Admin/Units/list'
import { Table } from 'lucide-react'
// import Tables from '@/components/Admin/Units/Table/Table'

const Dashboard = () => {
    
    return (
        <AdminLayout>
            <AdminPadding className={`bg-neutral-100 h-full`}>
                <div className='flex flex-col space-y-5 '>
                    <div>
                        <h1 className='text-lg font-medium flex flex-row justify-between items-center'>
                            <span className= 'text-xs text-foreground/50'>Overview</span>
                            <Filter />
                        </h1>
                    </div>
                    <div className=''>
                        <List />
                        {/* <AddUnit />
                       <Tables /> */}
                    </div>
                   
                </div>
            </AdminPadding>
        </AdminLayout>
    )
}

export default Dashboard