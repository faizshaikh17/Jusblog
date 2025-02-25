import React from 'react'

function Button({ children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`px-4 py-2 cursor-pointer outline-none border border-gray-200 text-base font-bold m-1 ${bgColor}${textColor}${className} `}{...props}>{children}</button>
    )
}

export default Button