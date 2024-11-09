import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import img from "@/assets/herobg.jpg"
import { columns } from './Columns'
import DataTable from './DataTable'


var members = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
]

members = members.map((member, index) => ({
    ...member,
    id: index + 1
}));

const Table = () => {
    return (
        <div className='w-full'>
            <DataTable columns={columns} data={members} />
        </div>
    )
}

export default Table
