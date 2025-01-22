// import { Navigate, useLocation } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";
// import useAuth from "../hooks/useAuth";
// import Loading from "../pages/Shared/Loading/Loading";

// const AdminRoute = ({ children }) => {
//     const { user, loading, logOut } = useAuth();
//     const [isAdmin, isAdminLoading] = useAdmin();
//     const location = useLocation();

//     if (loading || isAdminLoading) {
//         return <Loading></Loading>;
//     }

//     if (user && isAdmin) {
//         return children;
//     }

//     return <Navigate to="/" state={{ from: location }} replace></Navigate>
// };

// export default AdminRoute;


import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading></Loading>;
    }

    if (user && isAdmin) {
        return children;
    }

    if (user && !isAdmin) {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "error",
                    title: "Access Denied",
                    text: "You do not have admin privileges. You have been logged out.",
                    confirmButtonText: "OK",
                });
            })
            .catch((error) => {
                console.error("Error during logout:", error);
                Swal.fire({
                    icon: "error",
                    title: "Logout Error",
                    text: "An error occurred while logging you out. Please try again later.",
                    confirmButtonText: "OK",
                });
            });
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
