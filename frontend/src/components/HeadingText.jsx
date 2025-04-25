import React from 'react'

const HeadingText = ({children, className}) => {
  return (
    <h1 className={`font-secondary leading-relaxed ${className}`}>{children}</h1>
  )
}

export default HeadingText
