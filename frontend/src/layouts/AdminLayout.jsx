import AdminSidebar from '@/components/Admin/AdminSidebar'
import Navbar from '@/components/Admin/Navbar/Navbar'



const AdminLayout = ({ children }) => {

    return (

        <div className='flex bg-neutral-100 min-h-[100vh] text-foreground/70'>
            <div className='sticky top-[0px] z-50'>
                <AdminSidebar />
            </div>

            <div className='w-full'>
                <div className='sticky top-0 z-10'>
                    <Navbar />
                </div>
                <div className='w-full'>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default AdminLayout
