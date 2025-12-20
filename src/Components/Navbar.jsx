import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import logo from "../assets/logo.png";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';


const Navbar = () => {

    const { user } = useContext(AuthContext)


    const logout = () => {
        signOut(auth)
    }


    return (
        <div className="navbar bg-rose-100 shadow-sm z-10 lg:px-30">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>

                <div className="btn btn-ghost hover:bg-rose-100 border-0 flex items-center space-x-3">
                    {/* Logo */}
                    <Link to="/" className="w-12 flex items-center justify-center rounded-full overflow-hidden border-2 border-rose-500 m-0">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    </Link>

                    {/* Text */}
                    <span className="text-rose-500 font-bold text-lg lg:text-2xl hidden md:block">YIM Donation</span>
                </div>



            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2 bg-base-100 w-40 z-1">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end gap-5">
                <Link to={'/dashboard/main'} className="btn bg-red-600 hover:scale-105 transition-all text-white">Dashboard</Link>
                {
                    user ? <button onClick={logout} className="btn  bg-red-600 hover:scale-105 transition-all text-white"> <FaSignOutAlt className='rotate-180' />Logout</button> : <Link to={'/login'} className="btn  bg-red-600 hover:scale-105 transition-all text-white"> <FaSignInAlt /> Login</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;