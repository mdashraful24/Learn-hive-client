import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// After login/signup users land on /dashboard, which renders a role-based
// overview page (DashboardOverview) that differs for admin/teacher/student.
export const ROLE_HOME = {
    admin: "/dashboard",
    teacher: "/dashboard",
    student: "/dashboard",
};

// Fetch the user's role from the backend and return the matching dashboard home.
// Uses a fresh Firebase ID token instead of the localStorage JWT, avoiding the race
// with the token being stored inside AuthProvider's onAuthStateChanged listener.
export const getRoleHome = async (user) => {
    if (!user?.email) return "/";
    try {
        const token = await user.getIdToken();
        const headers = { authorization: `Bearer ${token}` };
        const [adminRes, teacherRes, studentRes] = await Promise.all([
            axios.get(`${BASE_URL}/users/admin/${user.email}`, { headers }),
            axios.get(`${BASE_URL}/users/teacher/${user.email}`, { headers }),
            axios.get(`${BASE_URL}/users/student/${user.email}`, { headers }),
        ]);
        if (adminRes.data?.admin) return ROLE_HOME.admin;
        if (teacherRes.data?.teacher) return ROLE_HOME.teacher;
        if (studentRes.data?.student) return ROLE_HOME.student;
    } catch {
        return "/";
    }
    return "/";
};
