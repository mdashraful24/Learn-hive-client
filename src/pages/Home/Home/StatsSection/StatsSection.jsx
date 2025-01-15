import { FaBoxOpen, FaTruck, FaUsers } from 'react-icons/fa';
import stats from '../../../../assets/home/stats.jpeg'

const StatsSection = () => {
    const totalUsers = 1200; // Example data
    const totalClasses = 85; // Example data
    const totalEnrollment = 1500; // Example data

    return (
        <div className='mb-20'>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Website Overview</h2>
                <p className="text-lg text-gray-600 mt-2">
                    Here’s a quick glance at the current statistics of our platform, showing the number of users, classes, and enrollments.
                </p>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-evenly gap-10 p-6">
                {/* stats */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Revenue Card */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-300 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                        <FaUsers className="text-4xl mb-2" />
                        <div>
                            <h2 className="text-3xl font-bold">Total User: {stats?.revenue ? stats.revenue.toFixed(2) : "0.00"}</h2>
                            <p className="text-lg">Revenue</p>
                        </div>
                    </div>

                    {/* Customers Card */}
                    <div className="bg-gradient-to-r from-[#D1A054] to-orange-200 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                        <FaUsers className="text-4xl mb-2" />
                        <div>
                            <h2 className="text-3xl font-bold">Total Classes: {stats.users}</h2>
                            <p className="text-lg">Customers</p>
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="bg-gradient-to-r from-pink-500 to-red-300 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                        <FaBoxOpen className="text-4xl mb-2" />
                        <div>
                            <h2 className="text-3xl font-bold">Total Enrollment: {stats.menuItems}</h2>
                            <p className="text-lg">Products</p>
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
