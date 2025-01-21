import { FaBoxOpen, FaTruck, FaUsers } from 'react-icons/fa';
import stats from '../../../../assets/home/stats.jpeg'
import useCount from '../../../../hooks/useCount';

const StatsSection = () => {
    const { totalUsers, totalClasses, totalEnrollment } = useCount();

    return (
        <div className='mb-20'>
            <div className="text-center mb-8 px-3 lg:px-0">
                <h2 className="text-3xl font-extrabold text-gray-800">Website Overview</h2>
                <p className="mt-2">
                    Here’s a quick glance at the current statistics of our platform, showing the number of users, classes, and enrollments.
                </p>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-evenly gap-10 p-6">
                {/* stats */}
                <div className="grid grid-cols-1 gap-10">
                    {/* Revenue Card */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-300 text-white p-4 rounded-lg shadow-md hover:shadow-xl flex justify-center items-center gap-5">
                        <FaUsers className="text-2xl lg:text-4xl" />
                        <div>
                            <h2 className="text-2xl lg:text-4xl font-bold">Total User: {totalUsers}</h2>
                            {/* <p className="text-lg">Revenue</p> */}
                        </div>
                    </div>

                    {/* Customers Card */}
                    <div className="bg-gradient-to-r from-[#D1A054] to-orange-200 text-white p-4 rounded-lg shadow-md hover:shadow-xl flex justify-center items-center gap-5">
                        <FaUsers className="text-2xl lg:text-4xl" />
                        <div>
                            <h2 className="text-2xl lg:text-4xl font-bold">Total Classes: {totalClasses}</h2>
                            {/* <p className="text-lg">Customers</p> */}
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="bg-gradient-to-r from-pink-500 to-red-300 text-white p-4 rounded-lg shadow-md hover:shadow-xl flex justify-center items-center gap-5">
                        <FaBoxOpen className="text-2xl lg:text-4xl" />
                        <div>
                            <h2 className="text-2xl lg:text-4xl font-bold">Total Enrollment: {totalEnrollment}</h2>
                            {/* <p className="text-lg">Products</p> */}
                        </div>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="md:w-1/2">
                    <img
                        src={stats}
                        alt="Educational Image"
                        className="rounded-lg shadow-md w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
