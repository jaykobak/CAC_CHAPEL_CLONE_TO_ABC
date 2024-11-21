import AdminSidebar from '@/components/Admin/AdminSidebar'
import Navbar from '@/components/Admin/Navbar/Navbar'
import { useToast } from '@/hooks/use-toast';
import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';



const AdminLayout = ({ children }) => {
    const { isAuthenticated, rehydrated } = useAuthStore()
    const navigate = useNavigate();
    const { toast } = useToast()
    const { pathname } = useLocation()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/auth/login?next=${pathname}`);
            toast({
                title: "Not Authorized",
                description: "Please login to access this page",
            })
        }
    }, [rehydrated, isAuthenticated, navigate]);

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
