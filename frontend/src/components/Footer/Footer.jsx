import React from 'react'
import Logo from '../Navbar/Logo'
import MainPadding from '../../layouts/MainPadding'
import QuickLinks from './QuickLinks'
import NewsLetter from './NewsLetter'
import ConnectWithUs from './ConnectWithUs'

const Footer = () => {
    return (
        <div className='flex flex-col gap-4 bg-[#320000] py-5'>
            <MainPadding className="flex flex-col gap-4">
                <div className='py-16 flex flex-col gap-10 lg:flex-row justify-between items-start text-primary-foreground border-b border-primary-foreground/80'>
                    <Logo footer={true} />
                    <QuickLinks />
                    <NewsLetter />
                    <ConnectWithUs />
                </div>
                <div>
                    <h2 className='text-center text-primary-foreground/80 text-sm'>Antioch Baptist Church - Teens Ministry </h2>
                    <h2 className='text-center text-primary-foreground/80 text-sm'>(c) 2025</h2>
                </div>
            </MainPadding>
        </div>
    )
}

export default Footer
