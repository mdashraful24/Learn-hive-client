import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaListUl, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { MdClass, MdSettingsApplications } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useTeacher from "../../../hooks/useTeacher";
import useStudent from "../../../hooks/useStudent";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DashboardStats, { DashboardCharts } from "../DashboardStats/DashboardStats";

const StatCard = ({ icon, value, label, gradient }) => (
    <div className={`bg-gradient-to-r ${gradient} text-white p-4 rounded-lg shadow-md flex justify-center items-center gap-5`}>
        <span className="text-3xl md:text-4xl mb-2">{icon}</span>
        <div>
            <h2 className="text-xl md:text-3xl font-bold">{value}</h2>
            <p className="md:text-lg">{label}</p>
        </div>
    </div>
);

// Teacher sees stats from their own classes
const TeacherOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: classes = [] } = useQuery({
        queryKey: ["overviewTeacherClasses", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${user.email}`);
            return res.data;
        },
    });

    // Enrollments live in /enroll and link back to a class via courseId
    const { data: allEnrollments = [] } = useQuery({
        queryKey: ["overviewAllEnrollments"],
        queryFn: async () => {
            const res = await axiosPublic.get("/enroll");
            return res.data;
        },
    });

    const classIds = new Set(classes.map((c) => c._id));
    const myEnrollments = allEnrollments.filter((e) => classIds.has(e.courseId));

    const totalClasses = classes.length;
    const activeClasses = classes.filter((c) => c.status === "accepted").length;
    const pendingClasses = classes.filter((c) => c.status === "pending").length;
    const totalEnrollments = myEnrollments.reduce((sum, e) => sum + (e.totalEnrolment || 1), 0);

    // Teacher chart data (bar): their own scope
    const barChartData = [
        { category: 'My Classes', quantity: totalClasses },
        { category: 'Active', quantity: activeClasses },
        { category: 'Pending', quantity: pendingClasses },
        { category: 'Enrollments', quantity: totalEnrollments },
    ];

    // Pie: enrollment share per class; fall back to classes-by-status when there are no enrollments yet
    const enrollmentByTitle = myEnrollments.reduce((acc, e) => {
        acc[e.title] = (acc[e.title] || 0) + (e.totalEnrolment || 1);
        return acc;
    }, {});
    let pieChartData = Object.entries(enrollmentByTitle)
        .map(([title, value]) => ({
            name: title?.length > 16 ? `${title.slice(0, 16)}…` : title,
            value,
        }))
        .filter((d) => d.value > 0)
        .sort((a, b) => b.value - a.value);

    if (pieChartData.length === 0) {
        pieChartData = [
            { name: 'Active Classes', value: activeClasses },
            { name: 'Pending Classes', value: pendingClasses },
        ].filter((d) => d.value > 0);
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                <StatCard icon={<MdClass />} value={totalClasses} label="My Classes" gradient="from-blue-400 to-blue-600" />
                <StatCard icon={<SiGoogleclassroom />} value={activeClasses} label="Active Classes" gradient="from-green-500 to-green-700" />
                <StatCard icon={<FaListUl />} value={totalEnrollments} label="Enrollments" gradient="from-blue-500 to-blue-600" />
                <StatCard icon={<MdSettingsApplications />} value={pendingClasses} label="Pending Classes" gradient="from-orange-400 to-orange-600" />
            </div>

            <DashboardCharts barChartData={barChartData} pieChartData={pieChartData} />
        </div>
    );
};

// Student sees their enrollment/order stats
const StudentOverview = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: payments = [] } = useQuery({
        queryKey: ["overviewPayments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    const totalEnrolled = payments.length;
    const totalSpent = payments.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
    const recentClasses = [...payments]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    // Student chart data (bar): enrollments over the last 6 months
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return {
            key: `${d.getFullYear()}-${d.getMonth()}`,
            label: d.toLocaleString('en-US', { month: 'short' }),
            quantity: 0,
        };
    });
    payments.forEach((p) => {
        const d = new Date(p.date);
        if (Number.isNaN(d.getTime())) return;
        const month = months.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
        if (month) month.quantity += 1;
    });
    const barChartData = months.map(({ label, quantity }) => ({ category: label, quantity }));

    // Student chart data (pie): how much spent per course
    const spendByTitle = payments.reduce((acc, p) => {
        const price = parseFloat(p.price) || 0;
        acc[p.title] = (acc[p.title] || 0) + price;
        return acc;
    }, {});
    const pieChartData = Object.entries(spendByTitle)
        .map(([title, value]) => ({
            name: title?.length > 16 ? `${title.slice(0, 16)}…` : title,
            value,
        }))
        .filter((d) => d.value > 0)
        .sort((a, b) => b.value - a.value);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                <StatCard icon={<SiGoogleclassroom />} value={totalEnrolled} label="Enrolled Classes" gradient="from-blue-400 to-blue-600" />
                <StatCard icon={<FaDollarSign />} value={`$${totalSpent}`} label="Total Spent" gradient="from-green-500 to-green-700" />
                <StatCard icon={<FaBoxOpen />} value={totalEnrolled} label="Orders" gradient="from-blue-500 to-blue-600" />
            </div>

            {/* Recent enrollments */}
            {recentClasses.length > 0 && (
                <div className="mb-14">
                    <h3 className="text-lg font-bold mb-4">Recently Enrolled</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recentClasses.map((course) => (
                            <div key={course._id} className="shadow-md rounded-lg p-4 border">
                                <img className="w-full h-32 object-cover rounded-md" src={course.image} alt={course.title} />
                                <h4 className="text-base font-bold mt-3">{course.title}</h4>
                                <p className="text-sm mt-1">Instructor: {course.name}</p>
                                <p className="text-sm">
                                    Enrolled: {course.date ? new Date(course.date).toLocaleDateString() : "N/A"}
                                </p>
                                <Link
                                    to={`/dashboard/myEnroll-class/${course._id}`}
                                    className="mt-3 inline-block bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-600"
                                >
                                    Continue
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <DashboardCharts barChartData={barChartData} pieChartData={pieChartData} />
        </div>
    );
};

const DashboardOverview = () => {
    const { user } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTeacher, isTeacherLoading] = useTeacher();
    const [isStudent, isStudentLoading] = useStudent();

    if (isAdminLoading || isTeacherLoading || isStudentLoading) {
        return <div className="text-center mt-10">Loading overview...</div>;
    }

    const role = isAdmin ? "Administrator" : isTeacher ? "Teacher" : "Student";

    return (
        <div className="mt-6 mb-16">
            {/* Welcome header */}
            <div className="text-center mb-10">
                <h1 className="text-xl md:text-3xl font-extrabold mb-2">
                    Welcome, {user?.displayName || "User"}!
                </h1>
                <p className="text-sm md:text-base">
                    You're signed in as{" "}
                    <span className="font-semibold uppercase text-blue-600">{role}</span>. Here's your overview.
                </p>
            </div>

            {/* Role-based content */}
            {isAdmin ? (
                <DashboardStats />
            ) : isTeacher ? (
                <TeacherOverview />
            ) : (
                <StudentOverview />
            )}
        </div>
    );
};

export default DashboardOverview;
