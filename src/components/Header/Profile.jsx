import React from 'react'

function Profile({ children, className }) {
    return (
        <button className={`text-base ${className} px-4 py-2 cursor-pointer outline-none text-base font-bold m-1 text-white border-0 bg-[#1f1f1f] rounded-[50%] transition-colors`}>{children}</button>
    )
}

export default Profile