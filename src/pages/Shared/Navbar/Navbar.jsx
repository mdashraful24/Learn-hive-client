import logo from '../../../assets/logo.png'
import alt from '../../../assets/auth/profile.png'
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDropdownOpen(false);
    }, [user]);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("User signed out successfully");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allClasses">All Classes</NavLink></li>
            <li><NavLink to="/tech">Teach on LearnHive</NavLink></li>
        </>
    );

    return (
        <div className="p-2 md:py-2 shadow-md">
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <div className="flex items-center gap-2 pl-2">
                            <img src={logo} alt="siteLogo" className="w-8 md:w-12" />
                            <h2 className="text-xl md:text-3xl font-extrabold">LearnHive</h2>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-base">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {user ? (
                            <div
                                className="relative dropdown-container"
                                ref={dropdownRef}
                            >
                                <img
                                    className="rounded-full w-12 h-12 object-cover cursor-pointer hover:bg-gray-300 p-1"
                                    // src={user?.photoURL}
                                    src={user?.photoURL || alt}
                                    alt="User profile"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <div className="absolute -right-2 mt-2 w-36 shadow-lg z-10 bg-white rounded-lg border">
                                        <div className="py-2 px-3 text-center">
                                            <p className="font-semibold text-sm text-gray-800 cursor-not-allowed">
                                                {user?.displayName || "User"}
                                            </p>
                                        </div>
                                        <ul className="dropdown-menu text-center">
                                            <li>
                                                <NavLink
                                                    className="block py-2 px-3 text-gray-800 hover:font-medium hover:bg-gray-200"
                                                    to="/dashboard"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button
                                                    className="block w-full py-2 rounded-b-lg text-gray-800  hover:text-white hover:font-medium hover:bg-red-700"
                                                    onClick={handleSignOut}
                                                >
                                                    Log out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="bg-primary text-xs md:text-base text-white font-medium px-3 md:px-4 py-2 rounded-lg mr-2 md:mr-3 transition-transform duration-500 ease-in-out hover:scale-110">Sign In</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
