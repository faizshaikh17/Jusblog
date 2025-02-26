import React from 'react';
import { Container, Logo, LogoutBtn, Profile } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const { userData } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus,
    },
    {
      name: 'Log In',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Sign Up',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
    {
      name: 'Profile',
      slug: '/profile',
      active: authStatus,
    },
  ];

  return (
    <header className='py-8 bg-[#09090B] shadow-md z-[10]'>
      <Container>
        <div className='w-full'>
          <nav className='flex items-center text-white'>
            <div className='flex items-end'>
              <Link to='/'>
                <Logo />
              </Link>
              <button className='px-1 m-2 cursor-pointer border border-gray-200 text-xs rounded-lg'>Beta</button>
            </div>
            <ul className='flex ml-auto items-center space-x-6'>
              {navItems.filter((item) => item.slug !== "/profile").map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `inline-block px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                          ? 'text-[#F580BD] border-b-2 border-[#F580BD]'
                          : 'text-white hover:text-[#F580BD] hover:border-b-2 hover:border-[#F580BD]'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn className='px-4 py-2 text-sm font-medium text-white bg-[#F580BD] rounded-lg hover:bg-[#F580BD] transition-all duration-200' />
                </li>
              )}
              {authStatus && (
                <li>
                  <Profile className={'bg-pink-200 text-[#2a2a2a] hover:bg-[#171717]'}>
                    {userData && userData.name.charAt(0) || "F"}
                  </Profile>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};