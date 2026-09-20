import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    // const navigate  

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${backendUrl}/api/auth/logout`, null, {
                withCredentials: true,
            });
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            logout();
            
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const navLinkStyles = ({ isActive }) =>
        isActive
            ? "text-indigo-600 font-semibold transition-colors"
            : "text-gray-600 hover:text-indigo-600 font-medium transition-colors";

    const mobileNavLinkStyles = ({ isActive }) =>
        isActive
            ? "block px-3 py-2 rounded-md text-base font-semibold text-indigo-600 bg-indigo-50"
            : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50";

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
                            HospiGo
                        </NavLink>
                    </div>
                 <nav className="hidden md:flex space-x-8 items-center">
                        <NavLink to="/" className={navLinkStyles}>Home</NavLink>
                        <NavLink to="/about" className={navLinkStyles}>About</NavLink>
                        <NavLink to="/contact" className={navLinkStyles}>Contact Us</NavLink>

                        <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                            {!isAuthenticated ? (
                                <>
                                    <NavLink 
                                        to="/login" 
                                        className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                                    >
                                        Log in
                                    </NavLink>
                                    <NavLink 
                                        to="/signup" 
                                        className="px-4 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={handleLogout} 
                                        className="text-red-600 hover:text-red-700 font-medium transition-colors"
                                    >
                                        Log out
                                    </button>
                                    <NavLink to="/profile" className="text-gray-500 hover:text-indigo-600 transition-colors">
                                        <CgProfile size={28} />
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="w-6 h-5 flex flex-col justify-between items-center">
                                <span className={`h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`h-0.5 w-full bg-current transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                                <span className={`h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden absolute w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to="/" onClick={toggleMenu} className={mobileNavLinkStyles}>Home</NavLink>
                    <NavLink to="/about" onClick={toggleMenu} className={mobileNavLinkStyles}>About</NavLink>
                    <NavLink to="/contact" onClick={toggleMenu} className={mobileNavLinkStyles}>Contact Us</NavLink>
                </div>
                
                <div className="pt-4 pb-4 border-t border-gray-200">
                    <div className="px-2 space-y-1 sm:px-3 flex flex-col">
                        {!isAuthenticated ? (
                            <>
                                <NavLink 
                                    to="/login" 
                                    onClick={toggleMenu}
                                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                >
                                    Log in
                                </NavLink>
                                <NavLink 
                                    to="/signup" 
                                    onClick={toggleMenu}
                                    className="block w-full text-center mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    to="/profile" 
                                    onClick={toggleMenu}
                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                >
                                    <CgProfile size={24} />
                                    Profile
                                </NavLink>
                                <button 
                                    onClick={() => { handleLogout(); toggleMenu(); }} 
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    Log out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};