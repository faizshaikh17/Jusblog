import './App.css'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/authSlice'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(logout()); // Ensure logout on error
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); // Call the async function
  }, [dispatch]);  // Only dispatch as a dependency


  return !loading ? (
    <div className='flex flex-col min-h-screen w-full text-black'>
      <Header />
      <main className='relative flex flex-grow items-center justify-center overflow-hidden'>  {/* Added relative and overflow-hidden */}
        {/* Subtle Noise Overlay */}
        {/* <div className="absolute z-[1] inset-0 bg-[url('/noise.png')] bg-repeat opacity-10 mix-blend-overlay"></div> */}
        <div className="relative z-[3] w-full">  {/* Add zIndex to this div */}
           <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null
}

export default App