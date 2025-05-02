import LatestSermons from '@/components/Home/LatestSermons'
import Hero from '@/components/Sermons/Hero'
import PopularSermons from '@/components/Sermons/PopularSermons'
import RecentSermons from '@/components/Sermons/RecentSermons'
import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import AllSermons from '../components/Sermons/AllSermons'

const Sermons = () => {
    return (
        <MainLayout>
            <div className='flex flex-col gap-20'>
                <Hero />
                {/* <PopularSermons />
                <RecentSermons /> */}
                <AllSermons />
            </div>
        </MainLayout>
    )
}

export default Sermons
