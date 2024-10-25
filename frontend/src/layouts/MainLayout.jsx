import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const MainLayout = ({children}) => {
  return (
    <div className='bg-[#FFF3F3] text-muted min-h-screen font-inter'>
      <Navbar />
      <div className='pb-10'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
