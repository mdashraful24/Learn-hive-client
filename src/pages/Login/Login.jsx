import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
    window.scrollTo(0, 0);
    const { signIn, setUser, handleGoogleSignIn } = useAuth();
    const [showPassWord, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Submit Form
    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);
            const user = result.user;
            setUser(user);

            Swal.fire({
                title: `Welcome "${user?.displayName}"`,
                text: `Hello, ${user?.displayName || user?.email}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError({ login: "Please check your email or password." });
            toast.error("Login Failed. Please try again.");
        }
    };

    return (
        <div className="pt-8 pb-16 px-3">
            {/* Helmet */}
            <Helmet>
                <title>Sign In | LearnHive</title>
            </Helmet>

            {/* title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-5">Sign In</h1>

            {/* Login Form */}
            <div className="card w-full max-w-lg mx-auto border shadow-md pb-5">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body px-5 py-1.5">

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label font-semibold">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Type here"
                            {...register("email", { required: "Email is required" })}
                            className={`input input-bordered border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email}`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input
                            type={showPassWord ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className={`input input-bordered border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.password}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassWord)}
                            className="absolute right-4 top-[52px]"
                        >
                            {showPassWord ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                        )}
                        {error.login && (
                            <p className="label text-sm text-red-600 mt-1">{error.login}</p>
                        )}
                        <label className="label">
                            <a href="#" className="text-sm label-text-alt link link-hover mt-1">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-2">
                        <button
                            type="submit"
                            className="btn bg-blue-600 hover:bg-blue-600 text-white rounded-md"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Other Options */}
                    <div className="text-center font-semibold mt-2">
                        <p className="mb-1">
                            <small>
                                New here?{" "}Create a
                                <span className="text-blue-500">
                                    <Link to="/signUp"> New Account</Link>
                                </span>
                            </small>
                        </p>
                        <small>Or sign in with</small>
                    </div>
                </form>

                {/* Social Sign-In */}
                <div className="px-2 md:px-0 mt-3">
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
