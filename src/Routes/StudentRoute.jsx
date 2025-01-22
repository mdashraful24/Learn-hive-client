import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Shared/Loading/Loading";
import Swal from "sweetalert2";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isStudent, isStudentLoading] = useStudent();
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
            text: "Sorry! You do not have privileges to access this page.",
            showConfirmButton: false,
            timer: 2000
        });
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default StudentRoute;
