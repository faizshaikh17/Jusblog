import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'

function Profile() {
    const { userData } = useSelector((state) => state.auth)
    return (
        <Button className={` text-base font-bold text-white border-0 bg-[#1f1f1f] rounded-[50%] hover:bg-[#171717] transition-all duration-200`}>{userData && userData.name.charAt(0) || "F"}
        </Button>
    )
}

export default Profile