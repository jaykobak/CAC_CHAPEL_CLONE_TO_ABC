import AdminSidebar from '@/components/Admin/AdminSidebar'
import Navbar from '@/components/Admin/Navbar/Navbar'



const AdminLayout = ({ children }) => {
    return (

        <div className='flex bg-neutral-100 min-h-[100vh]'>
            <div className='sticky top-0'>
                <AdminSidebar />
            </div>

            <div className='flex-grow'>
                <div className='sticky top-0'>
                    <Navbar />
                </div>
                <div className='p-5 '>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default AdminLayout
