import React from 'react'

function Profile({ children, className }) {
    return (
        <button className={`text-base ${className} h-[2.5rem] w-[2.5rem] cursor-pointer outline-none text-base font-bold m-1 text-white border-0 bg-[#1f1f1f] rounded-[50%] transition-colors`}>{children}</button>
    )
}

export default Profile