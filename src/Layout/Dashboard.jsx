import { FaHome, FaListAlt, FaListUl, FaUserCircle } from 'react-icons/fa';
import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
import { GiTeacher } from 'react-icons/gi';
import { NavLink, Outlet } from "react-router-dom";
import { IoIosAddCircle } from 'react-icons/io';
import useAdmin from '../hooks/useAdmin';
import useTeacher from '../hooks/useTeacher';
import useStudent from '../hooks/useStudent';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();
    const [isStudent] = useStudent();

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[#bd8228] p-4">
                {/* Title */}
                <div className="p-5">
                    <h2 className="md:text-3xl font-extrabold">LearnHive</h2>
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
                            <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li>
                        </>
                    ) : isStudent ? (
                        <>
                            <li><NavLink to="/dashboard/myEnroll-class"><FaListAlt /> My Enrolled Classes</NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUserCircle /> Profile</NavLink></li>
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
            <div className="flex-1 p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
