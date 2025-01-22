import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";
import Loading from "../pages/Shared/Loading/Loading";
import Swal from "sweetalert2";

const TeacherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTeacher, isTeacherLoading] = useTeacher();
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <Loading></Loading>;
    }

    if (user && isTeacher) {
        return children;
    }

    if (user && !isTeacher) {
        Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "Sorry! You do not have teacher privileges to access this page.",
            showConfirmButton: false,
            timer: 2000
        });
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default TeacherRoute;
