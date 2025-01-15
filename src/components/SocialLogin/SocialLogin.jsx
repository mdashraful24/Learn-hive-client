// import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // const handleGoogleSignIn = () => {
    //     googleSignIn()
    //         .then(result => {
    //             // console.log(result.user);
    //             const userInfo = {
    //                 email: result.user?.email,
    //                 name: result.user?.displayName
    //             }
    //             axiosPublic.post('/users', userInfo)
    //                 .then(res => {
    //                     // console.log(res.data);
    //                     toast.success("Successfully Sign-In with Google");
    //                     navigate(from, { replace: true });
    //                     // navigate("/");
    //                 })
    //                 .catch(error => {
    //                     console.error("Google Sign-In Error:", error);
    //                     toast.error(error.message || "Google Sign-In failed.");
    //                 });
    //         })
    // }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                toast.error("Google Sign-In Failed. Please try again.");
            });
    };

    return (
        <div className="text-center w-11/12 mx-auto">
            <button
                onClick={handleGoogleSignIn}
                className="btn w-full text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md transition-all duration-200 border-none rounded-md"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SocialLogin;