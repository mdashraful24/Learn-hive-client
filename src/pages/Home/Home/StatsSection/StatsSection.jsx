import { FaUsers, FaBookOpen, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import useCount from '../../../../hooks/useCount';

const StatsSection = () => {
    const { totalUsers, totalClasses, totalEnrollment, totalTeachers, isLoading } = useCount();

    const stats = [
        {
            label: 'Total Users',
            value: totalUsers,
            icon: <FaUsers />,
            accent: 'from-blue-500 to-blue-700',
        },
        {
            label: 'Total Classes',
            value: totalClasses,
            icon: <FaBookOpen />,
            accent: 'from-indigo-500 to-indigo-700',
        },
        {
            label: 'Total Enrollments',
            value: totalEnrollment,
            icon: <FaGraduationCap />,
            accent: 'from-emerald-500 to-emerald-700',
        },
        {
            label: 'Total Instructors',
            value: totalTeachers,
            icon: <FaChalkboardTeacher />,
            accent: 'from-amber-500 to-amber-600',
        },
    ];

    return (
        <div className='mb-20 md:mb-24 px-2 md:px-3 lg:px-2.5'>
            {/* Heading */}
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 mb-4 text-xs md:text-sm font-semibold tracking-wide uppercase rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    Our Impact
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">Website Overview</h2>
                <p className="mt-4 md:text-lg max-w-3xl mx-auto opacity-80">
                    Here&apos;s a quick glance at the current statistics of our platform — users, classes, enrollments, and instructors.
                </p>
            </div>

            {/* Stat cards */}
            <div className="container mx-auto w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-transparent"
                    >
                        {/* Accent bar */}
                        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${stat.accent}`} />

                        {/* Soft accent glow */}
                        <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${stat.accent} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25`} />

                        {/* Watermark icon */}
                        <div className="pointer-events-none absolute -bottom-1 right-2 text-6xl opacity-[0.06]">
                            {stat.icon}
                        </div>

                        {/* Icon tile */}
                        <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                            {stat.icon}
                        </div>

                        {/* Value */}
                        <h3 className="relative mt-5 text-3xl md:text-4xl font-extrabold tabular-nums">
                            {isLoading ? (
                                <span className="inline-block h-8 w-16 animate-pulse rounded bg-base-300 align-middle" />
                            ) : (
                                (stat.value ?? 0).toLocaleString()
                            )}
                        </h3>

                        {/* Label */}
                        <p className="relative mt-1 text-xs md:text-sm font-semibold uppercase tracking-wide opacity-60">
                            {stat.label} 
                        </p>
                    </div>
                ))}
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
//         <div className='mb-20 px-2 md:px-3 lg:px-2.5'>
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
