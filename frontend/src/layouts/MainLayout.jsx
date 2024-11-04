import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const MainLayout = ({children}) => {
  return (
    <div className='bg-background min-h-screen font-inter max-w-[1500px]'>
      <Navbar />
      <div className='pb-10'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
