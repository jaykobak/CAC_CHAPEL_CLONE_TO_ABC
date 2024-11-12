import AdminLayout from '@/layouts/AdminLayout'
import React from 'react'
import img from "@/assets/herobg.jpg"
import AdminPadding from '@/layouts/AdminPadding'
import { GraduationCap, LucideUniversity, Mail, MapPin, PenTool, PhoneIcon } from 'lucide-react'

const data = {
  img: img,
  name: "Oyekola Michael Abayomi",
  email: "abmichael109@gmail.com",
  level: "100 Level",
  isAWorker: true,
  unit: "CHOIR",
  phone: "09160914217",
  date: "09-10",
  homeAddress: "Hospital Road, Iwo, Osun State",
  hostelAddress: "Prince and Princess Hostel, Under G"
}

const Member = () => {
  const pStyle = "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-sm flex items-center gap-2"
  return (
    <AdminLayout>
      <AdminPadding className={"bg-white"}>
        <div>
          <div className='flex space-x-5'>
            <img src={data.img} alt={data.name} className='w-48 h-40 rounded-lg object-cover' />
            <div className='text-sm space-y-2'>
              <h2 className='text-2xl font-semibold'>{data.name}</h2>
              <p className={pStyle}> <Mail /> {data.email}</p>
              <p className={pStyle}><GraduationCap /> {data.level}</p>
              <p className={pStyle}> <LucideUniversity /> {data.unit}</p>
              <p className={pStyle}> <PhoneIcon /> {data.phone}</p>
              <p className={pStyle}> <MapPin /> {data.homeAddress}</p>
              <p className={pStyle}><MapPin />  {data.hostelAddress}</p>
            </div>
          </div>
        </div>
      </AdminPadding>
    </AdminLayout>
  )
}

export default Member
