import React from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import { NavLink } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();

    const onHandleCLick = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

    return (
        <NavLink className={
            `inline-block px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-[#F580BD] text-white  hover:border-b-2 hover:border-[#F580BD]
            }`
        }
            onClick={onHandleCLick}
        >Logout</NavLink>
    )
}

export default LogoutBtn