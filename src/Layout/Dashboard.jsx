// import { FaHome, FaListAlt, FaListUl, FaUserCircle } from 'react-icons/fa';
// import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
// import { GiTeacher } from 'react-icons/gi';
// import { NavLink, Outlet } from "react-router-dom";
// import { IoIosAddCircle } from 'react-icons/io';
// import useAdmin from '../hooks/useAdmin';
// import useTeacher from '../hooks/useTeacher';
// import useStudent from '../hooks/useStudent';

// const Dashboard = () => {
//     const [isAdmin] = useAdmin();
//     const [isTeacher] = useTeacher();
//     const [isStudent] = useStudent();

//     return (
//         <div className="flex">
//             <div className="w-64 min-h-screen bg-[#bd8228] p-4">
//                 {/* Title */}
//                 <div className="p-5">
//                     <h2 className="md:text-3xl font-extrabold">LearnHive</h2>
//                 </div>

//                 {/* Dashboard menus */}
//                 <ul className="menu">
//                     {/* Admin */}
//                     {isAdmin ? (
//                         <>
//                             <li><NavLink to="/dashboard/request"><FaCodePullRequest /> Teacher Request</NavLink></li>
//                             <li><NavLink to="/dashboard/users"><FaUsers /> Users</NavLink></li>
//                             <li><NavLink to="/dashboard/admin-class"><GiTeacher /> All Classes</NavLink></li>
//                             <li><NavLink to="/dashboard/users-profile"><FaUserCircle /> Profile</NavLink></li>
//                         </>
//                     ) : isTeacher ? (
//                         <>
//                             <li><NavLink to="/dashboard/add-class"><IoIosAddCircle /> Add Class</NavLink></li>
//                             <li><NavLink to="/dashboard/my-class"><FaListUl /> My Classes</NavLink></li>
//                             <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li>
//                         </>
//                     ) : isStudent ? (
//                         <>
//                             <li><NavLink to="/dashboard/myEnroll-class"><FaListAlt /> My Enrolled Classes</NavLink></li>
//                             <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li>
//                         </>
//                     ) : null}

//                     {/* Divider */}
//                     <div className="bg-black h-[1.5px] my-4"></div>
//                     {/* Shared nav links */}
//                     <li>
//                         <NavLink to="/"><FaHome />Home</NavLink>
//                     </li>
//                 </ul>

//             </div>
//             <div className="flex-1 p-10">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



// Update code
// import { FaHome, FaListAlt, FaListUl, FaUserCircle } from 'react-icons/fa';
// import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
// import { GiTeacher } from 'react-icons/gi';
// import { NavLink, Outlet } from "react-router-dom";
// import { IoIosAddCircle } from 'react-icons/io';
// import { IoReorderThreeOutline } from "react-icons/io5";
// import useAdmin from '../hooks/useAdmin';
// import useTeacher from '../hooks/useTeacher';
// import useStudent from '../hooks/useStudent';
// import { useState } from 'react';

// const Dashboard = () => {
//     const [isAdmin] = useAdmin();
//     const [isTeacher] = useTeacher();
//     const [isStudent] = useStudent();
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="flex h-screen overflow-hidden">
//             {/* Sidebar */}
//             <div className={`md:w-64 min-h-screen bg-[#bd8228] p- transition-all duration-300 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
//                 {/* Title */}
//                 <div className="px-5 pt-16 lg:p-5">
//                     <h2 className="md:text-3xl font-extrabold">LearnHive</h2>
//                 </div>

//                 {/* Dashboard menus */}
//                 <ul className="menu">
//                     {/* Admin */}
//                     {isAdmin ? (
//                         <>
//                             <li><NavLink to="/dashboard/request"><FaCodePullRequest /> Teacher Request</NavLink></li>
//                             <li><NavLink to="/dashboard/users"><FaUsers /> Users</NavLink></li>
//                             <li><NavLink to="/dashboard/admin-class"><GiTeacher /> All Classes</NavLink></li>
//                             <li><NavLink to="/dashboard/users-profile"><FaUserCircle /> Profile</NavLink></li>
//                         </>
//                     ) : isTeacher ? (
//                         <>
//                             <li><NavLink to="/dashboard/add-class"><IoIosAddCircle /> Add Class</NavLink></li>
//                             <li><NavLink to="/dashboard/my-class"><FaListUl /> My Classes</NavLink></li>
//                             <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li>
//                         </>
//                     ) : isStudent ? (
//                         <>
//                             <li><NavLink to="/dashboard/myEnroll-class"><FaListAlt /> My Enrolled Classes</NavLink></li>
//                             <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li>
//                         </>
//                     ) : null}

//                     {/* Divider */}
//                     <div className="bg-black h-[1.5px] my-4"></div>
//                     {/* Shared nav links */}
//                     <li>
//                         <NavLink to="/"><FaHome />Home</NavLink>
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 px-5 overflow-y-auto">
//                 <Outlet />
//             </div>

//             {/* Hamburger Menu Button */}
//             <button
//                 onClick={toggleSidebar}
//                 className="lg:hidden fixed top-2 left-2 z-50 bg-[#bd8228] p-3 rounded-full text-white">
//                 <IoReorderThreeOutline />
//             </button>
//         </div>
//     );
// };

// export default Dashboard;



import { FaHome, FaListAlt, FaListUl, FaUserCircle } from 'react-icons/fa';
import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
import { GiTeacher } from 'react-icons/gi';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoIosAddCircle } from 'react-icons/io';
import { IoReorderThreeOutline } from "react-icons/io5";
import useAdmin from '../hooks/useAdmin';
import useTeacher from '../hooks/useTeacher';
import useStudent from '../hooks/useStudent';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();
    const [isStudent] = useStudent();
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

    return (
        <div className="flex h-screen overflow-hidden">
            <Helmet>
                <title>Dashboard | LearnHive</title>
            </Helmet>

            {/* Sidebar */}
            <div className={`md:w-64 min-h-screen bg-[#bd8228] p- transition-all duration-300 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                {/* Title */}
                <div className="px-5 pt-14 md:pt-16 lg:p-5">
                    <h2 className="text-xl md:text-3xl font-extrabold">LearnHive</h2>
                </div>

                {/* Dashboard menus */}
                <ul className="menu">
                    {/* Admin */}
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/request"><FaCodePullRequest /> Teacher Request</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaUsers /> Users</NavLink></li>
                            <li><NavLink to="/dashboard/admin-class"><GiTeacher /> All Classes</NavLink></li>
                            <li><NavLink to="/dashboard/users-profile"><FaUserCircle /> Profile</NavLink></li>
                        </>
                    ) : isTeacher ? (
                        <>
                            <li><NavLink to="/dashboard/add-class"><IoIosAddCircle /> Add Class</NavLink></li>
                            <li><NavLink to="/dashboard/my-class"><FaListUl /> My Classes</NavLink></li>
                            <li><NavLink to="/dashboard/teacher-profile"><FaUserCircle /> Profile</NavLink></li>
                        </>
                    ) : isStudent ? (
                        <>
                            <li><NavLink to="/dashboard/myEnroll-class"><FaListAlt /> My Enrolled Classes</NavLink></li>
                            <li><NavLink to="/dashboard/student-profile"><FaUserCircle /> Profile</NavLink></li>
                        </>
                    ) : null}

                    {/* Divider */}
                    <div className="bg-black h-[1.5px] my-4"></div>
                    {/* Shared nav links */}
                    <li>
                        <NavLink to="/"><FaHome />Home</NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-5 overflow-y-auto">
                {/* Welcome message */}
                {showWelcome && (
                    <div className="p-4 mt-7 text-center">
                        <h1 className="text-xl md:text-3xl font-bold mb-2">Welcome to the Dashboard!</h1>
                        <p>We're glad to have you here. Explore the features using the sidebar.</p>
                    </div>
                )}
                <Outlet />
            </div>

            {/* Hamburger Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-2 left-2 z-50 bg-[#bd8228] p-3 rounded-full text-white shadow-xl">
                <IoReorderThreeOutline />
            </button>
        </div>
    );
};

export default Dashboard;
