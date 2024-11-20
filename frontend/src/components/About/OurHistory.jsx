import HeadingText from '@/components/HeadingText'
import MainPadding from '@/layouts/MainPadding'
import React from 'react'
import img1 from "@/assets/About/img1.jpg"





const OurHistory = () => {
    return (
        <MainPadding>
            <div className='flex md:flex-row flex-col gap-10'>
                <div className='md:w-[50%] w-full flex flex-col gap-5'>
                    <HeadingText className="md:text-5xl text-4xl">OUR HISTORY</HeadingText>
                    <img src={img1} alt="" className='w-full' />
                </div>
                <div className='md:w-[50%] w-full flex flex-col gap-5'>
                    <h1 className='font-bold'>Building a Church That Reflects God's Love and Grace</h1>
                    <p>
                        Founded in 2002 by Professor Ogunsiji, his wife, and their family, our church began as a small gathering of dedicated believers within the university community. United by a vision to create a place where God’s love and grace would be evident, they planted the seeds of what has grown into a vibrant faith community.
                    </p>
                    <p>
                        From those humble beginnings, our church has blossomed, welcoming students, faculty, and community members alike. Together, we seek to embody Christ's love, nurture spiritual growth, and provide a welcoming home for those in search of faith, hope, and purpose.
                    </p>
                    <p>
                        Today, our university church stands as a testament to God’s enduring love, with a commitment to inspire, support, and walk alongside each member of our community on their spiritual journey.
                    </p>
                </div>

            </div>
        </MainPadding>
    )
}

export default OurHistory
