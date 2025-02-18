import { FaBoxOpen, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import stats from '../../../../assets/home/stats.jpeg';
import useCount from '../../../../hooks/useCount';

const StatsSection = () => {
    const { totalUsers, totalClasses, totalEnrollment, totalTeachers } = useCount();

    return (
        <div className='mb-20 md:mb-28 px-2.5'>
            <div className="text-center mb-8 md:mb-14">
                <h2 className="text-2xl md:text-4xl font-extrabold">Website Overview</h2>
                <p className="mt-4 md:text-lg">
                    Here’s a quick glance at the current statistics of our platform, showing the number of users, classes, enrollments, and instructors.
                </p>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-10">
                {/* stats */}
                <div className="w-full lg:max-w-lg grid grid-cols-1 gap-5 md:gap-10">
                    {/* Total Users Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5 transform hover:scale-105 transition duration-500 ease-in-out">
                        <FaUsers className="text-xl lg:text-4xl" />
                        <div>
                            <h2 className="text-xl lg:text-4xl font-bold">Total Users: {totalUsers ?? 'N/A'}</h2>
                        </div>
                    </div>

                    {/* Total Classes Card */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5 transform hover:scale-105 transition duration-500 ease-in-out">
                        <FaUsers className="text-xl lg:text-4xl" />
                        <div>
                            <h2 className="text-xl lg:text-4xl font-bold">Total Classes: {totalClasses ?? 'N/A'}</h2>
                        </div>
                    </div>

                    {/* Total Enrollment Card */}
                    <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5 transform hover:scale-105 transition duration-500 ease-in-out">
                        <FaBoxOpen className="text-xl lg:text-4xl" />
                        <div>
                            <h2 className="text-xl lg:text-4xl font-bold">Total Enrollment: {totalEnrollment ?? 'N/A'}</h2>
                        </div>
                    </div>

                    {/* Total Instructors Card */}
                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5 transform hover:scale-105 transition duration-500 ease-in-out">
                        <FaChalkboardTeacher className="text-xl lg:text-4xl" />
                        <div>
                            <h2 className="text-xl lg:text-4xl font-bold">Total Instructors: {totalTeachers ?? 'N/A'}</h2>
                        </div>
                    </div>
                </div>

                {/* Right side image */}
                <div className="max-w-md lg:w-1/2">
                    <img
                        src={stats}
                        alt="Educational Image"
                        className="rounded-xl shadow-md w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
















// submitted code
// import { FaBoxOpen, FaTruck, FaUsers } from 'react-icons/fa';
// import stats from '../../../../assets/home/stats.jpeg'
// import useCount from '../../../../hooks/useCount';

// const StatsSection = () => {
//     const { totalUsers, totalClasses, totalEnrollment } = useCount();

//     return (
//         <div className='mb-20 px-2.5'>
//             <div className="text-center mb-8">
//                 <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">Website Overview</h2>
//                 <p className="mt-2 md:text-lg">
//                     Here’s a quick glance at the current statistics of our platform, showing the number of users, classes, and enrollments.
//                 </p>
//             </div>

//             <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-evenly gap-10 lg:p-6">
//                 {/* stats */}
//                 <div className="grid grid-cols-1 gap-10">
//                     {/* Revenue Card */}
//                     <div className="bg-gradient-to-r from-purple-500 to-pink-300 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5">
//                         <FaUsers className="text-xl lg:text-4xl" />
//                         <div>
//                             <h2 className="text-xl lg:text-4xl font-bold">Total User: {totalUsers ?? 'N/A'}</h2>
//                         </div>
//                     </div>

//                     {/* Customers Card */}
//                     <div className="bg-gradient-to-r from-[#D1A054] to-orange-200 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5">
//                         <FaUsers className="text-xl lg:text-4xl" />
//                         <div>
//                             <h2 className="text-xl lg:text-4xl font-bold">Total Classes: {totalClasses ?? 'N/A'}</h2>
//                         </div>
//                     </div>

//                     {/* Products Card */}
//                     <div className="bg-gradient-to-r from-pink-500 to-red-300 text-white p-4 rounded-xl shadow-md hover:shadow-xl flex justify-center items-center gap-5">
//                         <FaBoxOpen className="text-xl lg:text-4xl" />
//                         <div>
//                             <h2 className="text-xl lg:text-4xl font-bold">Total Enrollment: {totalEnrollment ?? 'N/A'}</h2>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side image */}
//                 <div className="max-w-md lg:w-1/2">
//                     <img
//                         src={stats}
//                         alt="Educational Image"
//                         className="rounded-xl shadow-md w-full h-auto"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StatsSection;
