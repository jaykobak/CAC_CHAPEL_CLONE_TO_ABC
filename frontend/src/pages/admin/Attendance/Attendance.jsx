import List from '@/components/Admin/Attendance/List/List'
import Navbar from '@/components/Admin/Attendance/Navbar/Navbar'
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import React from 'react'

const Attendance = () => {
  return (
    <AdminLayout>
        <Navbar />
        <AdminPadding>
          <List />
        </AdminPadding>
    </AdminLayout>
  ) 
}

export default Attendance
