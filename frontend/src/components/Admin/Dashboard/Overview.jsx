import React from 'react'

const Overview = ({ icon, data, name, color,  }) => {
  return (
    <div className='flex items-center rounded-lg space-x-5 px-6 py-4 bg-white shadow-lg'>
      <div className={`w-20 h-20 flex justify-center items-center rounded-full ${color}`}>
        {icon}
      </div>
      <div className='flex flex-col gap items-center'>
        <h1 className='text-sm text-foreground/70 font-medium'>{name}</h1>
        <h1 className='font-semibold text-2xl'>{data}</h1>
      </div>
    </div>
  )
}

export default Overview
