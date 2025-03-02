import { FaFirstOrder, FaHome, FaListAlt, FaListUl, FaUserCircle } from 'react-icons/fa';
import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
import { GiTeacher } from 'react-icons/gi';
import { MdSettingsApplications } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoIosAddCircle } from 'react-icons/io';
import { GoSidebarExpand } from "react-icons/go";
import useAdmin from '../hooks/useAdmin';
import useTeacher from '../hooks/useTeacher';
import useStudent from '../hooks/useStudent';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardStats from '../pages/Dashboard/DashboardStats/DashboardStats';
import DashboardDark from '../pages/Dashboard/DashboardDark/DashboardDark';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();
    const [isStudent] = useStudent();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/dashboard") {
            setShowWelcome(false);
        }
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleCollapseSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Helmet>
                <title>Dashboard | LearnHive</title>
            </Helmet>

            {/* Sidebar */}
            <div className={`bg-blue-900 min-h-screen transition-all duration-300 
                ${isSidebarOpen ? "lg:w-64" : "hidden"} 
                ${isSidebarCollapsed ? "md:w-16" : "w-40 md:w-52 lg:w-64"} 
                md:block`}>

                {/* Title */}
                <div className="px-5 p-5">
                    <h2 className={`text-xl md:text-3xl text-white font-extrabold transition-all duration-300 
        ${isSidebarCollapsed ? "hidden md:block md:text-xl" : "block"}`}>
                        {isSidebarCollapsed ? "LH" : "LearnHive"}
                    </h2>
                </div>

                {/* Dashboard menus */}
                <ul className="menu text-white">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/request" onClick={() => setIsSidebarOpen(false)}>
                                    <FaCodePullRequest />
                                    {!isSidebarCollapsed && "Teacher Request"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" onClick={() => setIsSidebarOpen(false)}>
                                    <FaUsers />
                                    {!isSidebarCollapsed && "Users"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/admin-class" onClick={() => setIsSidebarOpen(false)}>
                                    <GiTeacher />
                                    {!isSidebarCollapsed && "All Classes"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users-profile" onClick={() => setIsSidebarOpen(false)}>
                                    <FaUsers />
                                    {!isSidebarCollapsed && "Users Profile"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-profile" onClick={() => setIsSidebarOpen(false)}>
                                    <FaUserCircle />
                                    {!isSidebarCollapsed && "My Profile"}
                                </NavLink>
                            </li>
                        </>
                    ) : isTeacher ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/add-class" onClick={() => setIsSidebarOpen(false)}>
                                    <IoIosAddCircle />
                                    {!isSidebarCollapsed && "Add Class"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-class" onClick={() => setIsSidebarOpen(false)}>
                                    <FaListUl />
                                    {!isSidebarCollapsed && "My Classes"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/teacher-profile" onClick={() => setIsSidebarOpen(false)}>
                                    <FaUserCircle />
                                    {!isSidebarCollapsed && "Profile"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approve" onClick={() => setIsSidebarOpen(false)}>
                                    <MdSettingsApplications />
                                    {!isSidebarCollapsed && "My Request"}
                                </NavLink>
                            </li>
                        </>
                    ) : isStudent ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/myEnroll-class" onClick={() => setIsSidebarOpen(false)}>
                                    <FaListAlt />
                                    {!isSidebarCollapsed && "My Enroll Classes"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/student-profile" onClick={() => setIsSidebarOpen(false)}>
                                    <FaUserCircle />
                                    {!isSidebarCollapsed && "Profile"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-request" onClick={() => setIsSidebarOpen(false)}>
                                    <MdSettingsApplications />
                                    {!isSidebarCollapsed && "My Request"}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/order-page" onClick={() => setIsSidebarOpen(false)}>
                                    <FaFirstOrder />
                                    {!isSidebarCollapsed && "My Order"}
                                </NavLink>
                            </li>
                        </>
                    ) : null}

                    {/* Divider */}
                    <div className="bg-white h-[1.5px] my-4"></div>
                    <li>
                        <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
                            <FaHome />
                            {!isSidebarCollapsed && "Home"}
                        </NavLink>
                    </li>
                </ul>

            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar with Dark Mode Toggle */}
                <div className="bg-blue-600 p-3 md:p-4 flex justify-between items-center">
                    <div className="font-bold text-xl flex gap-2">
                        {/* Sidebar Toggle for Mobile */}
                        <button onClick={toggleSidebar} className="py-3 text-white md:hidden">
                            <GoSidebarExpand />
                        </button>

                        {/* Sidebar Collapse Toggle for Large Screens */}
                        <button onClick={toggleCollapseSidebar} className="text-white py-3 hidden md:block">
                            <GoSidebarExpand />
                        </button>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div>
                            <img
                                className="rounded-full w-8 h-8 object-cover"
                                src={user?.photoURL || alt}
                                alt="User profile"
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            />
                        </div>

                        <div className="flex items-center">
                            {/* Dark Mode Toggle */}
                            <DashboardDark />
                        </div>
                    </div>
                </div>

                {/* Welcome message and dashboard stats */}
                {showWelcome && (
                    <div className="mt-7 text-center px-5 overflow-auto">
                        <div className='mb-10'>
                            <h1 className="text-xl md:text-4xl font-extrabold mb-4">Welcome to the Dashboard!</h1>
                            <p>We're glad to have you here. Explore the features using the sidebar.</p>
                        </div>
                        {/* Stat */}
                        <div>
                            <DashboardStats />
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto flex-1 px-3 md:px-5">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
