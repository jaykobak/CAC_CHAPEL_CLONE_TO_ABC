import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className='bg-background min-h-screen font-inter  flex justify-center'>
      <div className='w-full max-w-[1900px]'>
        <Navbar />
        <div className='pb-10 w-full'>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
