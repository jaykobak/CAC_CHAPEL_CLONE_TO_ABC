import AdminSidebar from '@/components/Admin/AdminSidebar'
import Navbar from '@/components/Admin/Navbar/Navbar'



const AdminLayout = ({ children }) => {
    return (

        <div className='flex bg-neutral-100 min-h-[100vh] text-foreground/70'>
            <div className='sticky top-[0px] h-[100vh]'>
                <AdminSidebar />
            </div>

            <div className='flex-grow'>
                <div className='sticky top-0 z-50'>
                    <Navbar />
                </div>
                <div className=''>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default AdminLayout
