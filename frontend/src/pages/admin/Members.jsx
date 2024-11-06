import List from '@/components/Admin/Members/List/List'
import Navbar from '@/components/Admin/Members/Navbar/Navbar'
import AdminLayout from '@/layouts/AdminLayout'
import AdminPadding from '@/layouts/AdminPadding'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Members = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") 
  return (
    <AdminLayout>
      <Navbar />
      <AdminPadding className={"bg-white h-full"}>
        {
          tab === "list" ? <List /> : "members"
        }
      </AdminPadding>
    </AdminLayout>
  )
}

export default Members
