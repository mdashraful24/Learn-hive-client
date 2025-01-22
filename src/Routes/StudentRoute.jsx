import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";
import Loading from "../pages/Shared/Loading/Loading";
import Swal from "sweetalert2";

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isStudent, isStudentLoading] = useTeacher();
    const location = useLocation();

    if (loading || isStudentLoading) {
        return <Loading></Loading>;
    }

    if (user && isStudent) {
        return children;
    }

    if (user && !isStudent) {
        Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "You do not have teacher privileges to access this page.",
            confirmButtonText: "OK",
        });
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default StudentRoute;
