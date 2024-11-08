import React from 'react'

const AdminPadding = ({children, className}) => {
  return (
    <div className={`p-5 py-3 w-full ${className}`}>
      {children}
    </div>
  )
}

export default AdminPadding
