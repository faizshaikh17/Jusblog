import React from 'react'
import { useSelector } from 'react-redux'

function Profile({ children, className }) {
    const { userData } = useSelector((state) => state.auth)
    return (
        <button className={`text-base ${className} px-4 py-2 cursor-pointer outline-none text-base font-bold m-1 text-white border-0 bg-[#1f1f1f] rounded-[50%] hover:bg-[#171717] transition-all`}>{userData && userData.name.charAt(0) || "F"}
        </button>
    )
}

export default Profile