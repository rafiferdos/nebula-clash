import { Link, NavLink } from "react-router-dom"
import logo from '../assets/logo.png'
import { LuUserPlus2 } from "react-icons/lu";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const blankUser = 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg'

    const { theme, setTheme } = useContext(ThemeContext)
    const toggleThemeChange = (e) => {
        if (e.target.checked)
            setTheme('dark')
        else
            setTheme('light')
    }
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);

    const links =
        <>
            <NavLink to='/' className={({ isActive }) => isActive ? "text-cyan-500 lg:border-b-cyan-500 lg:border-b-2" : "hover:text-cyan-300"}><a>Home</a></NavLink>
            <NavLink to='/all_contests' className={({ isActive }) => isActive ? "text-cyan-500 lg:border-b-cyan-500 lg:border-b-2" : "hover:text-cyan-300"}><a>All Contests</a></NavLink>
            <NavLink to='/top_contests' className={({ isActive }) => isActive ? "text-cyan-500 lg:border-b-cyan-500 lg:border-b-2" : "hover:text-cyan-300"}><a>Top Contests</a></NavLink>
            <NavLink to='/contact_us' className={({ isActive }) => isActive ? "text-cyan-500 lg:border-b-cyan-500 lg:border-b-2" : "hover:text-cyan-300"}><a>Contact Us</a></NavLink>
        </>

    return (
        <nav className={theme === 'light' ? "shadow-sm sticky top-0 z-50 backdrop-filter bg-base-100/80 backdrop-blur-xl bg-opacity-90 border-b border-white transition-shadow duration-100 [transform:translate3d(0,0,0)]" : "shadow-sm sticky top-0 z-50 backdrop-filter bg-base-100/80 backdrop-blur-xl bg-opacity-90 border-b border-gray-600 transition-shadow duration-100 [transform:translate3d(0,0,0)]"}>
            <div className="navbar max-w-7xl mx-auto lg:py-6 py-4 w-11/12">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] shadow bg-base-100 backdrop-blur-xl backdrop-filter rounded-box w-52 gap-3 p-4 *:font-semibold glass">
                            {links}
                            <hr className="my-1" />
                            <label className="flex cursor-pointer gap-2 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                <input onClick={toggleThemeChange} type="checkbox" value={theme} className="toggle theme-controller" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            </label>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost hover:bg-transparent flex items-center justify-center cursor-pointer">
                        <img className="h-8 lg:h-12" src={logo} alt="" />
                        <a className="text-lg font-nunito lg:text-3xl bg-clip-text text-transparent bg-gradient-to-tr font-extrabold from-orange-300 bg-300% animate-gradient to-red-900">Nebula Clash</a>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 *:lg:text-lg *:opacity-70 gap-6 *:font-semibold">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown hidden md:block">
                        <label className="cursor-pointer grid place-items-center">
                            <input type="checkbox" onClick={toggleThemeChange} value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>
                    {
                        user ?
                            <>
                                <div className={theme === 'light' ? "dropdown dropdown-end md:ml-3 flex items-center gap-4 md:border md:border-cyan-200 rounded-2xl px-4 py-1 md:bg-cyan-400/20 glass" : "dropdown dropdown-end md:ml-3 flex items-center gap-4 md:border md:border-cyan-200/30 rounded-2xl px-4 py-1 md:bg-cyan-500/15 glass"}>
                                    <span className="md:inline-block hidden font-nunito">{user?.displayName}</span>
                                    <div>
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom items-center flex ring-2 ring-cyan-500/40" data-tip={user?.displayName || "No Username"}>
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL || blankUser} referrerPolicy="no-referrer" />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="mt-3 z-[1] gap-1 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                                            {/* <li><NavLink to='/recommendations_for_me'>Recommendations For Me</NavLink></li> */}
                                            <li className="cursor-default">
                                                <div className="flex items-center justify-center flex-col glass pt-4 no-animation">
                                                    <img className="w-10 h-10 rounded-full cursor-default" src={user?.photoURL || blankUser} alt="" />
                                                <button className="btn btn-ghost hover:bg-transparent no-animation cursor-default">{user.displayName}</button>

                                                </div>
                                            </li>
                                            <li><NavLink to='/my_queries'>My Queries</NavLink></li>
                                            <li><NavLink to='/my_recommendations'>My Recommendations</NavLink></li>
                                            <hr className="my-2" />
                                            <li
                                                onClick={logOut}
                                            >
                                                <a>Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                            :
                            <Link to='/login' className={theme === 'light' ? "btn btn-ghost md:ml-3 hover:bg-cyan-100/40 rounded-full" : "btn btn-ghost md:ml-3 hover:bg-cyan-950/20 rounded-full"}><LuUserPlus2 className="text-xl" /><p>Login</p></Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar