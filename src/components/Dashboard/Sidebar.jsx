import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import { FaPlusCircle } from "react-icons/fa";
import { TbLayoutCardsFilled } from "react-icons/tb";
import { GrUserSettings } from "react-icons/gr";
import { RiPagesFill } from "react-icons/ri";




import logo from '../../assets/logo.png'
import useRole from '../../hooks/useRols'
import MenuItem from '../MenuItem'
import AdminMenu from '../AdminMenu'
import UserMenu from '../UserMenu'
import CreatorMenu from '../CreatorMenu'

const Sidebar = () => {
    const { logOut } = useContext(AuthContext)
    const [isActive, setActive] = useState(false)

    const [role, isLoading] = useRole()

    console.log(role)

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='sticky z-10 top-0'>

                <div className='bg-base-100/30 flex justify-between md:hidden backdrop-filter backdrop-blur-xl bg-opacity-90'>
                    <div>
                        <div className='block cursor-pointer p-4 font-bold'>
                            <Link to='/'>
                                <img
                                    src={logo}
                                    alt='logo'
                                    width='50'
                                    height='50'
                                />
                            </Link>
                        </div>
                    </div>

                    <button
                        onClick={handleToggle}
                        className='mobile-menu-button p-4 focus:outline-none focus:bg-base-200/40'
                    >
                        <AiOutlineBars className='h-5 w-5' />
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`z-50 h-screen md:fixed flex flex-col border-r border-gray-500/40 justify-between overflow-x-hidden backdrop-filter bg-base-100/40 backdrop-blur-xl bg-opacity-90 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'}  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-base-100/50 mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    src={logo}
                                    alt='logo'
                                    width='60'
                                    height='60'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        {/* Conditional toggle button here.. */}

                        {/*  Menu Items */}
                        <nav>
                            {role === 'admin' && <AdminMenu />}
                            {role === 'creator' && <CreatorMenu />}
                            {role === 'user' && <UserMenu />}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr className='border-gray-500' />

                    {/* Profile Menu */}
                    <NavLink
                        to='profile'
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform hover:bg-base-300/40  ${isActive ? 'bg-base-300' : ''
                            }`
                        }
                    >
                        <GrUserSettings className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Profile</span>
                    </NavLink>
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 hover:bg-base-300/40 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar