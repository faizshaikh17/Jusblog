import React from 'react'

function Profile({ children, className }) {
    return (
        <div className={` ${className} flex justify-center text-[#171717] bg-white items-center h-[2.5rem] w-[2.5rem] cursor-pointer outline-none font-bold m-1 border-0 rounded-[50%] transition-colors`}>{children}</div>
    )
}

export default Profile