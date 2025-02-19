import { FaUsers, FaBoxOpen, FaTruck, FaFileAlt } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';
import useCount from '../../../hooks/useCount';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'green'];
// const COLORS = ['#0088FE', '#FFBB28', '#FF8042', 'green'];

const DashboardStats = () => {
    const { totalAssignments, totalClasses, totalUsers, totalTeachers, totalStudents, totalEnrollment, totalSubmissions, totalReviews } = useCount();

    // Stats for cards
    const stats = {
        users: totalUsers || 0,
        classes: totalClasses || 0,
        enrollment: totalEnrollment || 0,
        submissions: totalSubmissions || 0,
        reviews: totalReviews || 0,
    };

    // Data for the bar chart
    const barChartData = [
        { category: 'Classes', quantity: totalClasses },
        { category: 'Users', quantity: totalUsers },
        { category: 'Teachers', quantity: totalTeachers },
        { category: 'Students', quantity: totalStudents },
        { category: 'Assignments', quantity: totalAssignments },
        { category: 'Submissions', quantity: totalSubmissions },
        { category: 'Reviews', quantity: totalReviews },
    ];

    // Data for the pie chart
    const pieChartData = [
        { name: 'Users', value: totalUsers },
        { name: 'Teachers', value: totalTeachers },
        { name: 'Students', value: totalStudents },
        { name: 'Classes', value: totalClasses },
        { name: 'Assignments', value: totalAssignments },
        { name: 'Submissions', value: totalSubmissions },
    ];

    // Custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
          ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // Custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                {/* Users Card */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                    <FaUsers className="text-4xl mb-2" />
                    <div>
                        <h2 className="text-3xl font-bold">{stats.users}</h2>
                        <p className="text-lg">Users</p>
                    </div>
                </div>

                {/* Classes Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                    <FaBoxOpen className="text-4xl mb-2" />
                    <div>
                        <h2 className="text-3xl font-bold">{stats.classes}</h2>
                        <p className="text-lg">Classes</p>
                    </div>
                </div>

                {/* Enrollment Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                    <FaTruck className="text-4xl mb-2" />
                    <div>
                        <h2 className="text-3xl font-bold">{stats.enrollment}</h2>
                        <p className="text-lg">Enrollments</p>
                    </div>
                </div>

                {/* Reviews Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5">
                    <FaFileAlt className="text-4xl mb-2" />
                    <div>
                        <h2 className="text-3xl font-bold">{stats.reviews}</h2>
                        <p className="text-lg">Reviews</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="flex flex-col-reverse lg:flex-row justify-center items-center container mx-auto">
                {/* Bar Chart */}
                <div className="mb-10 w-full sm:w-[320px] md:w-[700px] lg:w-[700px] overflow-auto">
                    <BarChart
                        width={700}
                        height={410}
                        data={barChartData}
                        margin={{
                            top: 20,
                            right: -20,
                            left: -20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {barChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* Pie Chart */}
                <div className="mb-10 w-full sm:w-[320px] md:w-[700px] lg:w-[700px] overflow-auto">
                    <PieChart width={700} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </div>
            </div>

        </div>
    );
};

export default DashboardStats;
