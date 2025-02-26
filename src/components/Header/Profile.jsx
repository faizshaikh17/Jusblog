import React from 'react'

function Profile({ children, className }) {
    return (
        <div className={` ${className} flex justify-center items-center h-[2.5rem] w-[2.5rem] cursor-pointer outline-none font-bold m-1 text-white border-0 bg-[#1f1f1f] rounded-[50%] transition-colors`}>{children}</div>
    )
}

export default Profile