import React from 'react'

const MainPadding = ({children, className}) => {
  return (
    <div className={`px-4 md:px-10 lg:px-28 h-full w-full ${className} `} >
      {children}
    </div>
  )
}

export default MainPadding
