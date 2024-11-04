import BlogTopics from '@/components/Blog/BlogTopics'
import Hero from '@/components/Blog/Hero'
import MostRecent from '@/components/Blog/MostRecent'
import MainLayout from '@/layouts/MainLayout'
import React from 'react'

const Blog = () => {
  return (
    <MainLayout>
        <div className='flex flex-col gap-20'>
            <Hero />
            <BlogTopics />
            <MostRecent />
        </div>
    </MainLayout>
  )
}

export default Blog
